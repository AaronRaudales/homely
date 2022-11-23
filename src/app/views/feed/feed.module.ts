import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedRoutingModule } from './feed-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { DataTablesModule } from "angular-datatables";
import { NotifierModule } from 'angular-notifier';

import { NgSelectModule } from '@ng-select/ng-select';

import {NgxSpinnerModule} from 'ngx-spinner';
import { NotifierConfig } from '../../theme/shared/notifier-config';
import { FeedClienteComponent } from './feed-cliente/feed-cliente.component';
import { FeedAnfitrionComponent } from './feed-anfitrion/feed-anfitrion.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { FeedDetallePropiedadComponent } from './feed-detalle-propiedad/feed-detalle-propiedad.component';

@NgModule({
  imports: [
    CommonModule,
    FeedRoutingModule,
  
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

    FeedClienteComponent,
    FeedAnfitrionComponent,
    FeedDetallePropiedadComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class FeedModule { 
}
