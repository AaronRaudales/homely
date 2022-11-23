import { Component, OnInit } from '@angular/core';
import {Constantes} from '../../../theme/shared/services/constantes';
import { Service } from 'src/app/theme/shared/services/service';
import {urls} from '../../../theme/shared/services/urls';
import {animate, style, transition, trigger} from '@angular/animations';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-feed-detalle-propiedad',
  templateUrl: './feed-detalle-propiedad.component.html',
  styleUrls: ['./feed-detalle-propiedad.component.scss'],
  providers: [Service],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class FeedDetallePropiedadComponent implements OnInit {

  Detallepropiedad = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public basicContent: string;
  public imagenPerfil="";
  public fechaNacimiento:string;

  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;
  tipo=1;
  paso=1;

  public total=0;
  public subtotal=0;
  public cantidadNoches=0;

  public reservacion={
    idUsuario:"",
    idPropiedad:"",
    fechaIngreso:"",
    fechaSalida:"",
    cantidadPersonas:"",
    precioPorNoche:"",
    cantidadNoches:0,
    subTotal:0,
    total:0,
    fecha:"",
    impuesto:0

  }

  public tarjeta={
    noTarjeta:"",
    fechaVencimientoT:"",
    codigoCVV:""
  }

  public infoUsuario={
    idUsuario: "",
    primerNombre: "",
    primerApellido: "",
    nombreUsuario: "",
    FechaNacimiento: "",
    correoElectronico: "",
    telefono: "",
    sexo: "",
    password: "",
    imagenPerfil: null, 
    rol: null
  };

  
  public registro;

  propiedades=[];
  anfitriones=[]

  public imagen1="";
  public imagen2="";
  public imagen3="";
  public imagePerfil="";

  public RegistroForm: FormGroup;
  public TarjetaForm: FormGroup;

  constructor(public dataConst: Constantes, 
    private service: Service,private datePipe: DatePipe,
    private notifier: NotifierService,
    private router: Router
     ) { 
      this.dataConst.setFechasActuales();
      

      if(JSON.parse(sessionStorage.getItem('itemDetallePropiedad'))!=null){
        this.registro=JSON.parse(sessionStorage.getItem('itemDetallePropiedad'));
        console.log(this.registro);
      }
      if(JSON.parse(sessionStorage.getItem('infoUsuario'))!=null){
        this.infoUsuario=JSON.parse(sessionStorage.getItem('infoUsuario'));
        //console.log(this.registro);
      }

      this.dataConst.setFechasActuales();
      this.propiedades=[];

      this.reservacion={
        idUsuario:"",
        idPropiedad:"",
        fechaIngreso:"",
        fechaSalida:"",
        cantidadPersonas:"",
        precioPorNoche:"",
        cantidadNoches:0,
        subTotal:0,
        total:0,
        fecha:"",
        impuesto:0
    
    
      }

      this.tarjeta={
        noTarjeta:"",
        fechaVencimientoT:"",
        codigoCVV:""
      }


    }

  ngOnInit() {

    this.imagen1="";
    this.imagen2="";
    this.imagen3="";
    this.imagePerfil="";

    this.RegistroForm = new FormGroup({
      'fechaIngreso': new FormControl(null,
        [Validators.required]),
      'fechaSalida': new FormControl(null,
        [Validators.required]),
      'cantidadPersonas': new FormControl(null,
        [Validators.required]),  

    });

    this.TarjetaForm = new FormGroup({
      'noTarjeta': new FormControl(null,
        [Validators.required]),
      'fechaVencimientoT': new FormControl(null,
        [Validators.required]),
      'codigoCVV': new FormControl(null,
        [Validators.required]),
      
    })


  }

  hideModal(){
    this.ngOnInit();
  }

  openModal(item){
    this.paso=1;
    this.registro=item;
    this.cambiarReservacionPropiedad(this.dataConst.idReservacionReservado);
  }

  pasoAtras(){
    this.paso--;
  }
  pasoAdelante(valid){
    if(!valid){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.form);
    }
    this.paso++;
  }

  back(){
    window.history.back();
  }
  
  info(){
    const fecha1 = new Date(this.reservacion.fechaIngreso);
    const fecha2 = new Date (this.reservacion.fechaSalida);

    const tiempo = fecha2.getTime() - fecha1.getTime();
    this.reservacion.cantidadNoches= tiempo / (1000*3600*24);

    this.reservacion.subTotal = ((this.reservacion.cantidadNoches)*(this.registro.precioPorNoche));
    this.reservacion.impuesto= this.reservacion.subTotal*0.15;
    this.reservacion.total = (this.reservacion.subTotal + this.reservacion.impuesto);

    
  }

  validarCantidadHuespedes(cantidad){
      if(cantidad>this.registro.cantidadHuespedes){
        this.notifier.notify(this.dataConst.noticacionWarning, "La cantidad no debe ser mayor a "+this.registro.cantidadHuespedes+" huéspedes.");;
        this.RegistroForm.controls.cantidadPersonas.setValue(null);
      }
  }

  openFeedAnfitrion(item){
    sessionStorage.setItem('itemPropiedad', JSON.stringify(item));
    this.router.navigate(['/feed/feed-anfitrion/1']);
  }

  cambiarReservacionPropiedad(reservacion){
    let body={
      reservacion: reservacion,
      idPropiedad: this.registro.idPropiedad
    }

    this.actualizarReservacionPropiedad(body);
  }

  actualizarReservacionPropiedad(body){
    let bodyPut = JSON.stringify(body);
    this.service.Send(urls.urlActualizarReservacionPropiedadPut, bodyPut, 2).
    subscribe(
      data=> {
            
        if(data.status==200){
          this.notifier.notify(this.dataConst.noticacionWarning, "La propiedad se cambio al proceso: "+this.dataConst.getDescripcionReservacionPropiedadById(body.reservacion));
        }
      },
      Error => {
        
        this.service.errorNotifier(Error);
      }

    )
  }

  addReservacion(reservacion, tarjetaForm, valid){

    if (!valid){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.form);
    }

    /*let fecha1= new Date(this.reservacion.fechaIngreso);
    console.log(fecha1)
    let fecha2 = new Date(this.reservacion.fechaSalida);

    let milisegundosdia = 24*60*60*1000;
    let milisegundostrancurridos = Math.abs(fecha1.getTime()-fecha2.getTime());

    this.reservacion.cantidadNoches= Math.round(milisegundostrancurridos/milisegundosdia);

    this.reservacion.subTotal = ((reservacion.cantidadNoches)*(this.registro.precioPorNoche));

    this.reservacion.total = (reservacion.subTotal + (reservacion.subTotal*0.15));*/

    

    if(valid){

      var body= JSON.stringify({
        fechaIngreso: reservacion.fechaIngreso,
        fechaSalida: reservacion.fechaSalida,
        cantidadPersonas: reservacion.cantidadPersonas,
        idUsuario: this.infoUsuario.idUsuario,
        idPropiedad: this.registro.idPropiedad,
        noTarjeta: tarjetaForm.noTarjeta,
        codigoCVV: tarjetaForm.codigoCVV,
        fechaVencimientoT: tarjetaForm.fechaVencimientoT
  
      });
    
      this.service.PostAuth(urls.urlReservacionPost, body)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
            window.history.back();
          }else{
            this.notifier.notify(this.dataConst.noticacionWarning, data.message);
          }
        },
        Error => {
          this.service.errorNotifier(Error);
        }
  
      );

    }
    


  }

}
