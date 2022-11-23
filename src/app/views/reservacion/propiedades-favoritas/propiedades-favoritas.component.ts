import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {Constantes} from '../../../theme/shared/services/constantes';
import { Service } from 'src/app/theme/shared/services/service';
import {urls} from '../../../theme/shared/services/urls';
import {animate, style, transition, trigger} from '@angular/animations';
import {DatePipe} from '@angular/common';
import { NotifierService } from 'angular-notifier';
import {Router} from '@angular/router';

@Component({
  selector: 'app-propiedades-favoritas',
  templateUrl: './propiedades-favoritas.component.html',
  styleUrls: ['./propiedades-favoritas.component.scss'],
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
export class PropiedadesFavoritasComponent implements OnInit {

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
  registro;

  public formularioPerfil={
    idUsuario: "",
    primerNombre: "",
    primerApellido: "",
    nombreUsuario: "",
    fechaNacimiento:"" , 
    correoElectronico: "",
    telefono: "",
    sexo: "",
    password: "",
    imagenPerfil: null,
    rolPreferido: 0,
    esAnfitrion: 0,
    esCliente: 0

  };


  public infoPropiedad={
    idPropiedad:"",
    titulo:"",
    descripcion:"",
    direccion:"",
    precioPorNoche:"",
    estado:"",
    reservacion:"",
    inicioFechaDisponible:"",
    finFechaDisponible:"",
    image_1: null,
    image_2: null,
    image_3: null
    

  };
  public infoTipoPropiedad={
    tipoPropiedad:"",
    tipoEspacio:"",
    cantidadHuespedes:"",
    numHabitaciones:"",
    estacionamiento:"",
    cantidadBanios:"",
    aireAcondicionado:"",
    internet:""

  };
  propiedades=[];
  anfitriones=[]

  public imagen1="";
  public imagen2="";
  public imagen3="";
  public imagePerfil="";

  constructor(public dataConst: Constantes, 
    private router: Router,
    private notifier: NotifierService,
    private spinnerTipoPropiedad: NgxSpinnerService,
    private service: Service,private datePipe: DatePipe ) { 
      this.dataConst.setFechasActuales();
      this.formularioPerfil={
        idUsuario: "",
        primerNombre: "",
        primerApellido: "",
        nombreUsuario: "",
        fechaNacimiento:"" , 
        correoElectronico: "",
        telefono: "",
        sexo: "",
        password: "",
        imagenPerfil: null,
        rolPreferido: 0,
        esAnfitrion: 0,
        esCliente: 0
  
      };

      if(JSON.parse(sessionStorage.getItem('infoUsuario'))!=null){
        this.formularioPerfil=JSON.parse(sessionStorage.getItem('infoUsuario'));
        this.imagenPerfil=this.formularioPerfil.imagenPerfil;
      };

      this.dataConst.setFechasActuales();
      this.propiedades=[];


    }

  ngOnInit() {

    this.imagen1="";
    this.imagen2="";
    this.imagen3="";
    this.imagePerfil="";
    this.LoadPropiedades();


  }

  LoadPropiedades(){
    
    this.service.Get(urls.urlPropiedadesFavoritasByUsuario+this.formularioPerfil.idUsuario)
      .subscribe(
        data=> {
          this.propiedades=[];
          if(data.status==this.dataConst.statusResponse.ok){
            this.propiedades=data.data;
          }
          //this.rerender();
        },
        Error => {
          this.propiedades=[];
          this.service.errorNotifier(Error);
        }
    );
  };
  openFeedAnfitrion(item){
    sessionStorage.setItem('itemPropiedad', JSON.stringify(item));
    this.router.navigate(['/feed/feed-anfitrion/1']);
  }
  
  toggleDetallePropiedad(item) {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.Detallepropiedad = !this.Detallepropiedad;

    this.registro=item;
    console.log(this.registro);
    this.paso=1;
    
}

  toggleVolverPropiedad(){
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.Detallepropiedad = !this.Detallepropiedad;

  }

  reservar(item){
    sessionStorage.setItem('infoPropiedad', JSON.stringify(item));
    this.router.navigate(['/reservacion/pago']);

  }

  openDetallePropiedad(item){
    sessionStorage.setItem('itemDetallePropiedad', JSON.stringify(item));
    this.router.navigate(['/feed/feed-detalle-propiedad']);
  }

  agregarFavorito(item){
    this.spinnerTipoPropiedad.show();

    var body = JSON.stringify({
      idPropiedad: item.idPropiedad,
      
    });
    
      this.service.Send(urls.urlAddPropiedadFavoritaByUsuario+this.formularioPerfil.idUsuario, body, this.dataConst.tipoPost)
        .subscribe(
          data=> {
            this.spinnerTipoPropiedad.hide();
            if(data.status==this.dataConst.statusResponse.ok){
            
              this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
              this.LoadPropiedades();
            }
          },
          Error => {
            this.spinnerTipoPropiedad.hide();
            this.service.errorNotifier(Error);
          }
      );
  }

  eliminarFavorito(item){
    this.spinnerTipoPropiedad.show();

    var body = JSON.stringify({
      idPropiedad: item.idPropiedad,
      
    });
    
      this.service.Delete(urls.urlDeletePropiedadFavoritaByUsuario+this.formularioPerfil.idUsuario+"/"+item.idPropiedad)
        .subscribe(
          data=> {
            this.spinnerTipoPropiedad.hide();
            if(data.status==this.dataConst.statusResponse.ok){
              
              this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
              this.LoadPropiedades();
            }
          },
          Error => {
            this.spinnerTipoPropiedad.hide();
            this.service.errorNotifier(Error);
          }
      );
  }

}
