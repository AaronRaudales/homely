import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthSignupV2RoutingModule } from './auth-signup-v2-routing.module';
import { AuthSignupV2Component } from './auth-signup-v2.component';
import { NotifierModule } from 'angular-notifier';
import { NotifierConfig } from '../../../../theme/shared/notifier-config';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [AuthSignupV2Component],
  imports: [
    CommonModule,
    AuthSignupV2RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NotifierModule.withConfig(NotifierConfig.customNotifierOptions)
  ]
})
export class AuthSignupV2Module { }
