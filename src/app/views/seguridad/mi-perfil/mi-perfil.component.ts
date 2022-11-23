import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Constantes} from '../../../theme/shared/services/constantes';
import {Subject} from 'rxjs';
import { Service } from 'src/app/theme/shared/services/service';
import {urls} from '../../../theme/shared/services/urls';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { Validacion } from 'src/app/theme/shared/services/validacion';
import {Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
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
  ],
  providers: [Service]
})
export class MiPerfilComponent implements OnInit {

  editProfile = true;
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

  informacion=[];
  @Output() nombre = new EventEmitter <any>();
  
  
  public RegistroForm: FormGroup;

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
  public mensaje="";

  public formatFecha={
    iso:"yyyy-MM-dd",
    juliana: "DD-MM-YYYY",
    conHoraTZ: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  };

  private sub: Subscription;

  constructor(
    public dataConst: Constantes, 
    private service: Service,
    private notifier: NotifierService,
    private validacion: Validacion,
    private router: Router,
    private route: ActivatedRoute,
    private pd:DatePipe

  ) {
    this.dataConst.setFechasActuales();
    this.validacion.validarClase(this.dataConst.clases.numeros);
    this.informacion=[];
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


  }

  ngOnInit() {
    this.LoadPerfil();
    this.RegistroForm = new FormGroup({
      'primerNombre': new FormControl(this.formularioPerfil.primerNombre, [
        Validators.required
      ]),
      'primerApellido': new FormControl(this.formularioPerfil.primerApellido, [
        Validators.required
      ]),
      'nombreUsuario': new FormControl(this.formularioPerfil.nombreUsuario, [
        Validators.required
      ]),
      'correoElectronico': new FormControl(this.formularioPerfil.correoElectronico, [
        Validators.required
      ]),
      'telefono': new FormControl(this.formularioPerfil.telefono, [
        Validators.required
      ]),
      'imagenPerfil': new FormControl(null, [
       
      ])

    });

    


  }

  handleFileSelectImagen1(evt) {
    
    
    if( evt.target.files.length==0){
      return
    }
    var files = evt.target.files; // FileList object
    var file = files[0];
    var tipoImagen= file.type.substring(0, 6);
    if(tipoImagen!="image/"){
      this.RegistroForm.controls.image_1.setValue(null);
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.imagen);
    }
    const formDataImage1 = new FormData();
    formDataImage1.append('file', file);
    formDataImage1.append('upload_preset', this.dataConst.CLOUDINARY_UPLOAD_PRESET);
    this.imagenPerfil="";
    this.service.PostCloudinary(this.dataConst.CLOUDINARY_URL, formDataImage1)
        .subscribe(
          data=> {
            console.log(data);
            this.imagenPerfil=data.secure_url;
          },
          Error => {
            return this.service.errorNotifier(Error);
          }
    );

  }

  LoadPerfil(){
    
    this.service.Get(urls.urlPerfil+"/"+this.formularioPerfil.idUsuario)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            this.formularioPerfil=data.data;
            this.imagenPerfil=this.formularioPerfil.imagenPerfil;
            this.formularioPerfil.fechaNacimiento = this.pd.transform(this.formularioPerfil.fechaNacimiento, "yyyy-MM-dd");
            console.log(this.formularioPerfil.fechaNacimiento)
            console.log(this.formularioPerfil.primerNombre)
          }
        },
        Error => {
          this.service.errorNotifier(Error);
        }
    );
  }


  Update(update, valid){
  
    if(!valid){
      return this.notifier.notify(this.dataConst.noticacionDefault, this.dataConst.validacion.form);
      
    }
    if(this.imagenPerfil==""){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.imagenPerfil);
     }

    if(valid){
      this.toggleEditProfile();
      
      
      var body = JSON.stringify({
        primerNombre: update.primerNombre,
        primerApellido: update.primerApellido,
        nombreUsuario : update.nombreUsuario,
        correoElectronico: update.correoElectronico,
        telefono: update.telefono,
        imagenPerfil: this.imagenPerfil,
        idUsuario:this.formularioPerfil.idUsuario,
        nombreNav: update.primerNombre,
        apellidoNav: update.primerApellido,
        rolPreferido: this.formularioPerfil.rolPreferido,
        esAnfitrion: this.formularioPerfil.esAnfitrion,
        esCliente: this.formularioPerfil.esCliente
      
      });

      this.service.PutAuth(urls.urlPerfilEdit, body)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
            window.location.reload();
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




  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleCancelarProfile(valid) {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
    if(valid || !valid){
      return this.notifier.notify(this.dataConst.noticacionError,'Vista previa. Sus datos no están actualizados');

    }
  }



}
