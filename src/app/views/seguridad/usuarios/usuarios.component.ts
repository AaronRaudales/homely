import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Constantes} from '../../../theme/shared/services/constantes';
import {Subject} from 'rxjs';
import { Service } from 'src/app/theme/shared/services/service';
import {urls} from '../../../theme/shared/services/urls';
import {DatePipe} from '@angular/common';
import { Validacion } from 'src/app/theme/shared/services/validacion';
import {Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import {
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
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
export class UsuariosComponent implements OnInit{
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
  
  @ViewChild(DataTableDirective, {read: "", static: true})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  tipo=1;
  paso=1;
  registro;

  public formularioPerfil={
    idUsuario: "",
    primerNombre: "",
    primerApellido: "",
    nombreUsuario: "",
    fechaNacimiento:"",
    correoElectronico: "",
    telefono: "",
    sexo: "",
    password: "",
    imagenPerfil: null,
    rolPreferido: 0,
    esAnfitrion: 0,
    esCliente: 0
    
  };

  public formatFecha={
    iso:"yyyy-MM-dd",
    juliana: "DD-MM-YYYY",
    conHoraTZ: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  };

  public infoPropiedad={
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

  public imagen1="";
  public imagen2="";
  public imagen3="";
  public InfoPropiedadForm: FormGroup;
  public TipoPropiedadForm: FormGroup;
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

  constructor(
    public dataConst: Constantes, 
    private validacion: Validacion,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe:DatePipe,
    private service: Service,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService) {
      this.dataConst.setFechasActuales();
      this.validacion.validarClase(this.dataConst.clases.numeros);
      
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

      this.propiedades=[];
    

  }

  

  ngOnInit() {
    this.imagen1="";
    this.imagen2="";
    this.imagen3="";
    this.LoadPropiedades();
    this.LoadPerfil();
   

   
  } 

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  hideModal(){
    this.ngOnInit();
  }

  openModal(item, tipo) {
    this.tipo=tipo;
    this.paso=1;
    if(tipo==this.dataConst.tipoPut){
      this.registro=item;
      this.InfoPropiedadForm.setValue(
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


    
  }

  LoadPerfil(){
    
    this.service.Get(urls.urlPerfil+"/"+this.formularioPerfil.idUsuario)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            this.formularioPerfil=data.data;
            this.imagenPerfil=this.formularioPerfil.imagenPerfil;
            this.formularioPerfil.fechaNacimiento = this.datePipe.transform(this.formularioPerfil.fechaNacimiento, "yyyy-MM-dd");
            console.log(this.formularioPerfil.fechaNacimiento)
            console.log(this.formularioPerfil.primerNombre)
          }
        },
        Error => {
          this.service.errorNotifier(Error);
        }
    );
  }

  LoadPropiedades(){
    
    this.service.Get(urls.urlPropiedadesFeedAnfitrion+"/"+this.formularioPerfil.idUsuario)
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

  toggleVolverPropiedad(){
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.Detallepropiedad = !this.Detallepropiedad;

  }
  

  

}
