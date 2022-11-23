import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservacionRoutingModule } from './reservacion-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { DataTablesModule } from "angular-datatables";
import { NotifierModule } from 'angular-notifier';

import { NgSelectModule } from '@ng-select/ng-select';

import {NgxSpinnerModule} from 'ngx-spinner';
import { NotifierConfig } from '../../theme/shared/notifier-config';
import { PagoComponent } from './pago/pago.component';
import { PropiedadesFavoritasComponent } from './propiedades-favoritas/propiedades-favoritas.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReservacionRoutingModule,
  
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule,
    NgbCarouselModule,
    NotifierModule.withConfig(NotifierConfig.customNotifierOptions),
    NgSelectModule,
  
    NgxSpinnerModule
  ],
  declarations: [

    PagoComponent,

    PropiedadesFavoritasComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ReservacionModule { 
}
