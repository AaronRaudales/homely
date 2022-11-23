import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthChangePasswordV2RoutingModule } from './auth-change-password-v2-routing.module';
import { AuthChangePasswordV2Component } from './auth-change-password-v2.component';
import { NotifierModule } from 'angular-notifier';
import { NotifierConfig } from '../../../../theme/shared/notifier-config';

@NgModule({
  declarations: [AuthChangePasswordV2Component],
  imports: [
    CommonModule,
    AuthChangePasswordV2RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(NotifierConfig.customNotifierOptions)
  ]
})
export class AuthChangePasswordV2Module { }
