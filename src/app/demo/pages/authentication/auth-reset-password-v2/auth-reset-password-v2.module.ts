import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthResetPasswordV2RoutingModule } from './auth-reset-password-v2-routing.module';
import { AuthResetPasswordV2Component } from './auth-reset-password-v2.component';
import { NotifierModule } from 'angular-notifier';
import { NotifierConfig } from '../../../../theme/shared/notifier-config';

@NgModule({
  declarations: [AuthResetPasswordV2Component],
  imports: [
    CommonModule,
    AuthResetPasswordV2RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(NotifierConfig.customNotifierOptions)
  ]
})
export class AuthResetPasswordV2Module { }
