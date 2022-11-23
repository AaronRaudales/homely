import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/theme/shared/services/service';
import {urls} from 'src/app/theme/shared/services/urls';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss'],
  providers: [Service]
})
export class NavLeftComponent implements OnInit {

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
    imagenPerfil: null
  };
  
  constructor(public service: Service) {
    if(JSON.parse(sessionStorage.getItem('infoUsuario'))!=null){
      this.infoUsuario=JSON.parse(sessionStorage.getItem('infoUsuario'));
    }
    this.LoadPerfil();
    
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

}
