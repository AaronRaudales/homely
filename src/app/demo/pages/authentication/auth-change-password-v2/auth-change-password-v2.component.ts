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
  selector: 'app-auth-change-password-v2',
  templateUrl: './auth-change-password-v2.component.html',
  styleUrls: ['./auth-change-password-v2.component.scss'],
  providers: [Service]
})
export class AuthChangePasswordV2Component implements OnInit {

  public RegistroForm: FormGroup;
  public hoy;
  public correo='i';
  public formularioChange={
    password1:"",
    password2:""
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
  token;
  id;
  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private router: Router,
    private datePipe: DatePipe ,
    private notifier: NotifierService, 
    private validacion: Validacion,
    public dataConst: Constantes) { 
      this.formularioChange={
        password1:"",
        password2:""
      }

      this.route.params.subscribe(params=>{
        this.token=params['token'];
        this.id=params['id'];
      });

      console.log(this.token);
      console.log(this.id);
    }

  ngOnInit() {
        
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    
    this.RegistroForm = new FormGroup({
      'password1': new FormControl(null, [
        Validators.required
      ]),
      'password2': new FormControl(null, [
        Validators.required
      ])

    });

  }

  logout() {
    this.router.navigate(['/auth/change-password-v2']);
  }
  Change2(){
    console.log(this.correo);
  }
  Change(change, valid){
    
    if(!valid){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.validacion.form);
      
    }
    var body = JSON.stringify({
      contrasena : change.password1,
      confirmarContrasena: change.password2
    });

    this.service.PutAuth(urls.urlForgotPassword+"/"+this.id+"/"+this.token, body)
      .subscribe(
        data=> {
          if(data.status==this.dataConst.statusResponse.ok){
            this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
            this.router.navigate(['/auth/signin-v2']);

            /**sessionStorage.setItem('token', data.data.token);
            sessionStorage.setItem('menu', JSON.stringify(data.data.menuGeneral))
            sessionStorage.setItem('infoUsuario', JSON.stringify(data.data.infoUsuario))*/
            //this.notifier.notify(this.dataConst.noticacionDefault, data.message);
            //this.router.navigate(['/dashboard/home']);
          }else{
            this.notifier.notify(this.dataConst.noticacionWarning, data.mensaje);
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
