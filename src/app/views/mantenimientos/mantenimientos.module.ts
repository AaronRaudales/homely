import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { DataTablesModule } from "angular-datatables";
import { NotifierModule } from 'angular-notifier';

import { NgSelectModule } from '@ng-select/ng-select';

import {NgxSpinnerModule} from 'ngx-spinner';
import { NotifierConfig } from '../../theme/shared/notifier-config';
import { PropiedadComponent } from './propiedad/propiedad.component';


@NgModule({
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
  
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule,
 
    NotifierModule.withConfig(NotifierConfig.customNotifierOptions),
    NgSelectModule,
  
    NgxSpinnerModule
  ],
  declarations: [

  PropiedadComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class MantenimientosModule { 
}
