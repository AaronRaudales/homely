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
  selector: 'app-auth-signin-v2',
  templateUrl: './auth-signin-v2.component.html',
  styleUrls: ['./auth-signin-v2.component.scss'],
  providers: [Service]
})
export class AuthSigninV2Component implements OnInit {
  
  public RegistroForm: FormGroup;
  public hoy;
  public nombreUsuario='i';
  public formularioLogin={
    nombreUsuario:"",
    passw:""
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
      this.formularioLogin={
        nombreUsuario:"",
        passw:""
      }
    }

  ngOnInit() {
        
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    
    this.RegistroForm = new FormGroup({
      'nombreUsuario': new FormControl(null, [
        Validators.required
      ]),
      'passw': new FormControl(null, [
        Validators.required
      ])
    });

  }


  logout() {
    this.router.navigate(['/auth/signin-v2']);
  }
  Login2(){
    console.log(this.nombreUsuario);
  }
  Login(login, valid){
  
    if(!valid){
      return this.notifier.notify(this.dataConst.noticacionDefault, this.dataConst.validacion.form);
      
    }

    var body = JSON.stringify({
      nombreUsuario : login.nombreUsuario,
      password: login.passw
    });
    this.service.PostAuth(urls.urlLogin, body)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            /**sessionStorage.setItem('token', data.data.token);
            sessionStorage.setItem('menu', JSON.stringify(data.data.menuGeneral))*/
            sessionStorage.setItem('infoUsuario', JSON.stringify(data.data[0]));
            this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
            this.router.navigate(['/seguridad/mi-perfil']);
            //this.router.navigate(['/mantenimientos/propiedad']);
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
