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
@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.scss'],
  providers: [Service]
})
export class PropiedadComponent implements OnInit  {
  @ViewChild(DataTableDirective, {read: "", static: true})
  dtElement: DataTableDirective;
  dtOptionsTipoPropiedad: any = {};
  dtInstance: DataTables.Api;
  //dtOptionsTipoPropiedad: DataTables.Settings = {};
  dtTriggerTipoPropiedad : Subject<any> = new Subject();
  propiedades=[];
  tipo=1;
  paso=1;
  registro;



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
  public tipoPropiedades=[
    {nombre: "Apartamentos"},
    {nombre: "Casa"},
    {nombre: "Vivienda Anexa"}
  ];

  public tipoEspacios=[
    {nombre: "Alojamiento Entero"},
    {nombre: "Una habitación privada"},
    {nombre: "Una habitación compartida"}
  ];



  public TipoPropiedadForm: FormGroup;
  constructor(
    public dataConst: Constantes, 
    private service: Service,
    private notifier: NotifierService,
    private validacion: Validacion,
    private datePipe: DatePipe ,
    private spinnerTipoPropiedad: NgxSpinnerService) {
      if(JSON.parse(sessionStorage.getItem('infoUsuario'))!=null){
        this.infoUsuario=JSON.parse(sessionStorage.getItem('infoUsuario'));
      }
      this.dataConst.setFechasActuales();
      this.validacion.validarClase(this.dataConst.clases.numeros);
      this.dtOptionsTipoPropiedad = this.service.configDataTableOptions();
      this.propiedades=[];
  }

  hideModal(){
    this.ngOnInit();
  }
  openModal(item, tipo){
    this.tipo=tipo;
    this.paso=1;
    if(tipo==this.dataConst.tipoPut){
      this.registro=item;
      this.RegistroForm.setValue(
          {
            titulo: item.titulo,
            descripcion: item.descripcion,
            direccion: item.direccion,
            precioPorNoche: item.precioPorNoche,
            estado: item.estado,
            reservacion: item.reservacion,
            inicioFechaDisponible:  this.datePipe.transform(item.inicioFechaDisponible, "yyyy-MM-dd"),
            finFechaDisponible:  this.datePipe.transform(item.finFechaDisponible, "yyyy-MM-dd"),
            image_1: null,
            image_2: null,
            image_3: null
          }
        );
        this.imagen1=item.image_1;
        this.imagen2=item.image_2;
        this.imagen3=item.image_3;
        this.TipoPropiedadForm.setValue(
          {
            tipoPropiedad: item.tipoPropiedad,
            tipoEspacio: item.tipoEspacio,
            cantidadHuespedes: item.cantidadHuespedes,
            numHabitaciones: item.numHabitaciones,
            estacionamiento: item.estacionamiento,
            cantidadBanios: item.cantidadBanios,
            aireAcondicionado: item.aireAcondicionado,
            internet: item.internet
          }
        );

    }
    //this.modal.show();
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

  ngOnInit() {
    
    this.imagen1="";
    this.imagen2="";
    this.imagen3="";
    
    this.RegistroForm = new FormGroup({
      'titulo': new FormControl(null, [
        Validators.required
      ]),
      'descripcion': new FormControl(null, [
        Validators.required
      ]),
      'direccion': new FormControl(null, [
        Validators.required
      ]),
      'precioPorNoche': new FormControl(null, [
        Validators.required
      ]),
      'estado': new FormControl(null, [
        Validators.required
      ]),
      'reservacion': new FormControl(null, [
        Validators.required
      ]),
      'inicioFechaDisponible': new FormControl(null, [
        Validators.required
      ]),
      'finFechaDisponible': new FormControl(null, [
        Validators.required
      ]),
      'image_1': new FormControl(null, [
       
      ]),
      'image_2': new FormControl(null, [
       
      ]),
      'image_3': new FormControl(null, [
       
      ])
      
    });

    this.TipoPropiedadForm = new FormGroup({
      'tipoPropiedad': new FormControl(null, [
        Validators.required
      ]),
      'tipoEspacio': new FormControl(null, [
        Validators.required
      ]),
      'cantidadHuespedes': new FormControl(null, [
        Validators.required
      ]),
      'numHabitaciones': new FormControl(null, [
        Validators.required
      ]),
      'estacionamiento': new FormControl(null, [
        Validators.required
      ]),
      'cantidadBanios': new FormControl(null, [
        Validators.required
      ]),
      'aireAcondicionado': new FormControl(null, [
        Validators.required
      ]),
      'internet': new FormControl(null, [
        Validators.required
      ])
    });
    this.LoadPropiedades();
   
  } 
  /**ngAfterViewInit(): void {
    this.dtTriggerTipoPropiedad.next();
    console.log(this.dtElement)
  }

  ngOnDestroy(): void {
    this.dtTriggerTipoPropiedad.unsubscribe();
  }*/

  handleFileSelectImagen1(evt) {
    
    
    if( evt.target.files.length==0){
      return
    }
    var today=new Date();
    var  horaFecha= this.datePipe.transform(today, "yyyy-MM-dd HHmmss");
    console.log(horaFecha);
    var files = evt.target.files; // FileList object
    var file = files[0];
   


    console.log(file);
    var tipoImagen= file.type.substring(0, 6);
    if(tipoImagen!="image/"){
      this.RegistroForm.controls.image_1.setValue(null);
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.imagen);
    }
    const formDataImage1 = new FormData();
    formDataImage1.append('file', file);
    formDataImage1.append('upload_preset', this.dataConst.CLOUDINARY_UPLOAD_PRESET);
    this.imagen1="";
    this.service.PostCloudinary(this.dataConst.CLOUDINARY_URL, formDataImage1)
        .subscribe(
          data=> {
            console.log(data);
            this.imagen1=data.secure_url;
          },
          Error => {
            return this.service.errorNotifier(Error);
          }
    );

    


  }
  
  handleFileSelectImagen2(evt) {
    if( evt.target.files.length==0){
      return
    }

    var files = evt.target.files; // FileList object
    var file = files[0];
    console.log(file);
    var tipoImagen= file.type.substring(0, 6);
    if(tipoImagen!="image/"){
      this.RegistroForm.controls.image_2.setValue(null);
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.imagen);
    }
    const formDataImage2 = new FormData();
    formDataImage2.append('file', file);
    formDataImage2.append('upload_preset', this.dataConst.CLOUDINARY_UPLOAD_PRESET);
    this.imagen2="";
    this.service.PostCloudinary(this.dataConst.CLOUDINARY_URL, formDataImage2)
        .subscribe(
          data=> {
            console.log(data);
            this.imagen2=data.secure_url;
          },
          Error => {
            return this.service.errorNotifier(Error);
          }
    );

  }

  handleFileSelectImagen3(evt) {
    if( evt.target.files.length==0){
      return
    }
    var files = evt.target.files; // FileList object
    var file = files[0];
    console.log(file);
    var tipoImagen= file.type.substring(0, 6);
    if(tipoImagen!="image/"){
      this.RegistroForm.controls.image_3.setValue(null);
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.imagen);
    }

    const formDataImage3 = new FormData();
    formDataImage3.append('file', file);
    formDataImage3.append('upload_preset', this.dataConst.CLOUDINARY_UPLOAD_PRESET);
    this.imagen3="";
    this.service.PostCloudinary(this.dataConst.CLOUDINARY_URL, formDataImage3)
        .subscribe(
          data=> {
            console.log(data);
            this.imagen3=data.secure_url;
          },
          Error => {
            return this.service.errorNotifier(Error);
          }
    );

  }

  LoadPropiedades(){
    
    this.service.Get(urls.urlPropiedadesByUsuario+"/"+this.infoUsuario.idUsuario)
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
  }

  obtenerNuevoNombre(file, inicio){
    var today=new Date();
    var  horaFecha= this.datePipe.transform(today, "yyyy-MM-dd HHmmss");
    console.log(horaFecha);
    var nombreArchivo= file.name.split(".");
    var nombre=nombreArchivo[0];
    var extension=nombreArchivo[1];
    var nombreArchivoFinal= inicio+"_"+nombre+"_"+horaFecha+"_"+this.infoUsuario.idUsuario+"."+extension;
    return nombreArchivoFinal;
  }

  Save(tipoPropiedad, propiedad, valid){
    
    if(!valid){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.form);
    }

    
   if(this.imagen1=="" || this.imagen2=="" || this.imagen3==""){
    return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.imagenAdjuntar3);
   }

    

    this.spinnerTipoPropiedad.show();

    var body;
    var url="";
  
    if(this.tipo==this.dataConst.tipoPost){

      /*formData.append('tipoPropiedad', tipoPropiedad.tipoPropiedad);
      formData.append('tipoEspacio', tipoPropiedad.tipoEspacio);
      formData.append('cantidadHuespedes', tipoPropiedad.cantidadHuespedes);
      formData.append('numHabitaciones', tipoPropiedad.numHabitaciones);
      formData.append('estacionamiento', tipoPropiedad.estacionamiento);
      formData.append('cantidadBanios', tipoPropiedad.cantidadBanios);
      formData.append('aireAcondicionado', tipoPropiedad.aireAcondicionado);
      formData.append('internet', tipoPropiedad.internet);
      formData.append('titulo', propiedad.titulo);
      formData.append('descripcion', propiedad.descripcion);
      formData.append('direccion', propiedad.direccion);
      formData.append('precioPorNoche', propiedad.precioPorNoche);
      formData.append('estado', propiedad.estado);
      formData.append('inicioFechaDisponible', propiedad.inicioFechaDisponible);
      formData.append('finFechaDisponible', propiedad.finFechaDisponible);
      formData.append('image_1', this.imagen1, this.obtenerNuevoNombre(this.imagen1, "IMAGEN1") );
      formData.append('image_2', this.imagen2, this.obtenerNuevoNombre(this.imagen2, "IMAGEN2" ) );
      formData.append('image_3', this.imagen3, this.obtenerNuevoNombre(this.imagen3, "IMAGEN3"));*/
      body = JSON.stringify({
        idUsuario: this.infoUsuario.idUsuario,
        tipoPropiedad: tipoPropiedad.tipoPropiedad,
        tipoEspacio: tipoPropiedad.tipoEspacio,
        cantidadHuespedes: tipoPropiedad.cantidadHuespedes,
        numHabitaciones: tipoPropiedad.numHabitaciones,
        estacionamiento: tipoPropiedad.estacionamiento,
        cantidadBanios: tipoPropiedad.cantidadBanios,
        aireAcondicionado: tipoPropiedad.aireAcondicionado,
        internet: tipoPropiedad.internet,
        titulo: propiedad.titulo,
        descripcion: propiedad.descripcion,
        direccion: propiedad.direccion,
        precioPorNoche: propiedad.precioPorNoche,
        estado: propiedad.estado,
        reservacion: propiedad.reservacion,
        inicioFechaDisponible: propiedad.inicioFechaDisponible,
        finFechaDisponible: propiedad.finFechaDisponible,
        image_1: this.imagen1,
        image_2: this.imagen2,
        image_3: this.imagen3
      });

      url=urls.urlPropiedadesPost;
    }else{
      body = JSON.stringify({

        idTipoPropiedad: this.registro.idTipoPropiedad,
        idUsuario: this.registro.idUsuario,
        idPropiedad: this.registro.idPropiedad,
        tipoPropiedad: tipoPropiedad.tipoPropiedad,
        tipoEspacio: tipoPropiedad.tipoEspacio,
        cantidadHuespedes: tipoPropiedad.cantidadHuespedes,
        numHabitaciones: tipoPropiedad.numHabitaciones,
        estacionamiento: tipoPropiedad.estacionamiento,
        cantidadBanios: tipoPropiedad.cantidadBanios,
        aireAcondicionado: tipoPropiedad.aireAcondicionado,
        internet: tipoPropiedad.internet,
        titulo: propiedad.titulo,
        descripcion: propiedad.descripcion,
        direccion: propiedad.direccion,
        precioPorNoche: propiedad.precioPorNoche,
        estado: propiedad.estado,
        reservacion: propiedad.reservacion,
        inicioFechaDisponible: propiedad.inicioFechaDisponible,
        finFechaDisponible: propiedad.finFechaDisponible,
        image_1: this.imagen1,
        image_2: this.imagen2,
        image_3: this.imagen3
      });

      url=urls.urlPropiedadesPut;
    }
      this.service.Send(url, body, this.tipo)
        .subscribe(
          data=> {
            this.spinnerTipoPropiedad.hide();
            if(data.status==this.dataConst.statusResponse.ok){
              this.hideModal();
              this.paso=1;
              this.tipo=1;
              this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
              //this.swalAlert.success(data.message);
            }
          },
          Error => {
            this.spinnerTipoPropiedad.hide();
            this.service.errorNotifier(Error);
          }
      );
    
    
  }
  

  rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTriggerTipoPropiedad.next();
      });
    
    
    /**this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTriggerTipoPropiedad.next();
    });*/
  } 
 
 
}
