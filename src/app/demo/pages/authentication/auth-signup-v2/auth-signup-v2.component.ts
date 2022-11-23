import { Component, OnInit } from '@angular/core';
import {Service} from '../../../../theme/shared/services/service';
import {Router} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import {urls} from '../../../../theme/shared/services/urls';
import {Constantes} from '../../../../theme/shared/services/constantes';
import { Validacion } from 'src/app/theme/shared/services/validacion';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

import {
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';



@Component({
  selector: 'app-auth-signup-v2',
  templateUrl: './auth-signup-v2.component.html',
  styleUrls: ['./auth-signup-v2.component.scss'],
  providers: [Service]
})
export class AuthSignupV2Component implements OnInit {
  
  
  public RegistroForm: FormGroup;
  public hoy;
  public formularioSignup={
    primerNombre:"",
    primerApellido:"",
    usuario:"",
    fecha:"",
    correo:"",
    telefono:"",
    sexo:"",
    password:"",
    rol: null
  };
  public mensaje="";
  public hoyHoraTZ;
  public fechaActual;
  public disabledAuth= false;
  public formatFecha={
    iso:"yyyy-MM-dd",
    juliana: "DD-MM-YYYY",
    conHoraTZ: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  }
  public setFechasActuales(){
    var today=new Date();
    this.hoy=today;
    this.hoyHoraTZ = this.datePipe.transform(this.hoy, this.formatFecha.conHoraTZ);
    this.fechaActual = this.datePipe.transform(this.hoy, this.formatFecha.iso);
  }

  public valorNull=null;

  isIframe = false;
  loggedIn = false;
  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private router: Router,
    private datePipe: DatePipe ,
    private notifier: NotifierService, 
    private validacion: Validacion,
    public dataConst: Constantes) { 
      this.validacion.validarClase(this.dataConst.clases.numeros);
      this.formularioSignup={
        primerNombre:"",
        primerApellido:"",
        usuario:"",
        fecha:"",
        correo:"",
        telefono:"",
        sexo:"",
        password:"",
        rol: null
      }
    }

  ngOnInit() {
        
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    
    this.RegistroForm = new FormGroup({
      'primerNombre': new FormControl(null, [
        Validators.required
      ]),
      'primerApellido': new FormControl(null, [
        Validators.required
      ]),
      'usuario': new FormControl(null, [
        Validators.required
      ]),
      'fecha': new FormControl(null, [
        Validators.required
      ]),
      'correo': new FormControl(null, [
        Validators.required
      ]),
      'telefono': new FormControl(null, [
        Validators.required
      ]),
      'sexo': new FormControl(null, [
        Validators.required
      ]),
      'password': new FormControl(null, [
        Validators.required
      ]),
      'rol': new FormControl(null, [
        Validators.required
      ])
    });

  }

  
  logout() {
    this.router.navigate(['/auth/signup-v2']);
  }
  
  SignUp(signup, valid){
   
    if(!valid){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.form);
     
    }
    let esCliente=0;
    let esAnfitrion=0;
    let anio = new Date (this.formularioSignup.fecha)
    if (signup.rol== this.dataConst.idRolAnfitrion && anio.getFullYear() >= 2005){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.edad);

    }
    
    if(signup.rol== this.dataConst.idRolCliente){
      esCliente=1;
    }else if(signup.rol== this.dataConst.idRolAnfitrion){
      esAnfitrion=1;
    }
    var body = JSON.stringify({
      primerNombre: signup.primerNombre,
      primerApellido: signup.primerApellido,
      nombreUsuario: signup.usuario,
      FechaNacimiento: signup.fecha,
      correoElectronico: signup.correo,
      telefono: signup.telefono,
      sexo: signup.sexo,
      password: signup.password,
      esCliente: esCliente,
      esAnfitrion: esAnfitrion,
      rolPreferido: signup.rol
    });

    this.service.PostAuth(urls.urlSignUp, body)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
            this.router.navigate(['/auth/signin-v2']);
          }else{
            this.notifier.notify(this.dataConst.noticacionWarning, data.message);
          }
        },
        Error => {
          this.service.errorNotifier(Error);
        }
    );
  }


  back(){
    window.history.back();
  }
    

}
