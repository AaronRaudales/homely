import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {Constantes} from '../../../theme/shared/services/constantes';
import {Subject} from 'rxjs';
import { Service } from 'src/app/theme/shared/services/service';
import {urls} from '../../../theme/shared/services/urls';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Validacion } from 'src/app/theme/shared/services/validacion';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pago',
    templateUrl: './pago.component.html',
    styleUrls: ['./pago.component.scss'],
    providers: [Service]
  })
export class PagoComponent implements OnInit  {

  registro;
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
    fecha:""


  }

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
  public imagen1="";
  public imagen2="";
  public imagen3="";
  public RegistroForm: FormGroup;
  public TarjetaForm: FormGroup;

  fecha1;
  fecha2; 
  tiempo;
  
  

  


  constructor(public dataConst: Constantes, 
    private service: Service,
    private notifier: NotifierService,
    private validacion: Validacion,
    private datePipe: DatePipe,
    private router: Router, ){

      if(JSON.parse(sessionStorage.getItem('infoPropiedad'))!=null){
        this.registro=JSON.parse(sessionStorage.getItem('infoPropiedad'));
        console.log(this.registro);
      }else if(JSON.parse(sessionStorage.getItem('infoUsuario'))!=null){
        this.infoUsuario=JSON.parse(sessionStorage.getItem('infoUsuario'));
        //console.log(this.registro);
      }

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
        fecha:""
    
    
      }

      this.tarjeta={
        noTarjeta:"",
        fechaVencimientoT:"",
        codigoCVV:""
      }




  }

  ngOnInit(){
    this.imagen1="";
    this.imagen2="";
    this.imagen3="";
    this.fecha1 = new Date(this.reservacion.fechaIngreso);
    this.fecha2 = new Date (this.reservacion.fechaSalida);
    this.tiempo = this.fecha2.getTime() - this.fecha1.getTime();
    this.reservacion.cantidadNoches= this.tiempo / (1000*3600*24)
  

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

  cancelar(){
    this.router.navigate(['/feed/feed-cliente']);
  }

  info(){
    const fecha1 = new Date(this.reservacion.fechaIngreso);
    const fecha2 = new Date (this.reservacion.fechaSalida);

    const tiempo = fecha2.getTime() - fecha1.getTime();
    this.reservacion.cantidadNoches= tiempo / (1000*3600*24);

    this.reservacion.subTotal = ((this.reservacion.cantidadNoches)*(this.registro.precioPorNoche));

    this.reservacion.total = (this.reservacion.subTotal + (this.reservacion.subTotal*0.15));

    
  }

  cambiarEstado(){
    let body={
      idUsuario:this.infoUsuario.idUsuario,
      idPropiedad: this.registro.idPropiedad
    }

    this.actualizarEstado(body);
  }

  actualizarEstado(body){
    let bodyPut = JSON.stringify(body);
    this.service.Send(urls.urlPagosByUsuario, bodyPut, 2).
    subscribe(
      data=> {
            
        if(data.status==200){
         window.location.reload();
        }
      },
      Error => {
        
        this.service.errorNotifier(Error);
      }

    )
  }

  Reservar(reservacion, tarjeta, valid){

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
        idPropiedad: this.infoPropiedad.idPropiedad,
        noTarjeta: tarjeta.noTarjeta,
        codigoCVV: tarjeta.codigoCVV,
        fechaVencimientoT: tarjeta.fechaVencimientoT
        
        
  
  
      });
  
      this.service.PostAuth(urls.urlReservacionPost, body)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
            this.router.navigate(['/feed/feed-cliente']);
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
