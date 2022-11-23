import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';

import { DataTablesModule } from "angular-datatables";
import { UsuariosComponent } from './usuarios/usuarios.component';


import { NotifierModule } from 'angular-notifier';
import { NotifierConfig } from '../../theme/shared/notifier-config';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxSpinnerModule} from 'ngx-spinner';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SeguridadRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule,
    NotifierModule.withConfig(NotifierConfig.customNotifierOptions),
    NgxSpinnerModule,
    NgSelectModule,
    NgbCarouselModule
  ],
  exports:[
    MiPerfilComponent


  ],
  declarations: [
   
    UsuariosComponent,
   
    MiPerfilComponent,
     
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SeguridadModule {

}
