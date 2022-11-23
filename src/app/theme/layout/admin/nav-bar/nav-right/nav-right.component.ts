import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Service } from 'src/app/theme/shared/services/service';
import {urls} from 'src/app/theme/shared/services/urls';
import {Constantes} from '../../../../../theme/shared/services/constantes';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig, Service]
})
export class NavRightComponent implements OnInit {

  public idRolCliente=1;
  public idRolAnfitrion=2;
  public infoUsuario={
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
  
  constructor(public service: Service,public dataConst: Constantes, private notifier: NotifierService) {
    if(JSON.parse(sessionStorage.getItem('infoUsuario'))!=null){
      this.infoUsuario=JSON.parse(sessionStorage.getItem('infoUsuario'));
    }
   }

  ngOnInit() {
    this.LoadPerfil();
  }

  LoadPerfil(){
    
    this.service.Get(urls.urlPerfil+"/"+this.infoUsuario.idUsuario)
      .subscribe(
        data=> {
          if(data.status==200){
            this.infoUsuario=data.data;
          }
        },
        Error => {
          this.service.errorNotifier(Error);
        }
    );
  }

  agregarNuevoRol(rol){
    let body;
    let anio = new Date (this.infoUsuario.fechaNacimiento)
    if(rol==this.idRolCliente){
      body={
        idUsuario: this.infoUsuario.idUsuario,
        rolPreferido: rol,
        esAnfitrion: this.infoUsuario.esAnfitrion,
        esCliente: 1
      }
    }else if(rol==this.idRolAnfitrion && anio.getFullYear() >= 2005){
      return this.notifier.notify(this.dataConst.noticacionWarning, this.dataConst.mensajeEdad);

    }else if(rol==this.idRolAnfitrion){
      body={
        idUsuario: this.infoUsuario.idUsuario,
        rolPreferido: rol,
        esAnfitrion: 1,
        esCliente: this.infoUsuario.esCliente
      }
    }

    this.actualizarConfigRol(body);
    
  }

  cambiarRol(rol){
    let body={
      idUsuario: this.infoUsuario.idUsuario,
      rolPreferido: rol,
      esAnfitrion: this.infoUsuario.esAnfitrion,
      esCliente: this.infoUsuario.esCliente
    }
    this.actualizarConfigRol(body);
  }

  actualizarConfigRol(body){

    let bodyPut = JSON.stringify(body);
    this.service.Send(urls.urlUsuarioConfigRol, bodyPut, 2)
        .subscribe(
          data=> {
            
            if(data.status==200){
             window.location.reload();
            }
          },
          Error => {
            
            this.service.errorNotifier(Error);
          }
      );
  }

}
