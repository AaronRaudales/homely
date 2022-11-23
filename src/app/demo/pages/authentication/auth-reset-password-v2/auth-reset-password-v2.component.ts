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
  selector: 'app-auth-reset-password-v2',
  templateUrl: './auth-reset-password-v2.component.html',
  styleUrls: ['./auth-reset-password-v2.component.scss'],
  providers: [Service]
})
export class AuthResetPasswordV2Component implements OnInit {

  public RegistroForm: FormGroup;
  public hoy;
  public correo='i';
  public formularioReset={
    correo:""
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
      this.formularioReset={
        correo:""
      }
    }

    ngOnInit() {
        
      sessionStorage.clear();
      sessionStorage.removeItem('token');
      
      this.RegistroForm = new FormGroup({
        'correo': new FormControl(null, [
          Validators.required
        ])
      });
  
    }

    logout() {
      this.router.navigate(['/auth/reset-password-v2']);
    }
    Reset2(){
      console.log(this.correo);
    }
    Reset(reset, valid){
      console.log(this.RegistroForm);
      console.log(reset);
      console.log(valid);
      if(!valid){
        return this.notifier.notify(this.dataConst.noticacionError, this.dataConst.validacion.form);
      }
      
      
      
      var body = JSON.stringify({
        correoElectronico : this.formularioReset.correo
      });
      this.service.PostAuth(urls.urlForgotPassword, body)
        .subscribe(
          data=> {
            if(data.status==this.dataConst.statusResponse.ok){
              /**sessionStorage.setItem('token', data.data.token);
              sessionStorage.setItem('menu', JSON.stringify(data.data.menuGeneral))
              sessionStorage.setItem('infoUsuario', JSON.stringify(data.data.infoUsuario))*/
              this.notifier.notify(this.dataConst.noticacionSuccess, data.message);
              //this.router.navigate(['/dashboard/home']);
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
