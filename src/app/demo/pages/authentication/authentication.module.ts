import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { NotifierConfig } from '../../../theme/shared/notifier-config';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NotifierModule.withConfig(NotifierConfig.customNotifierOptions)
  ],
  declarations: []
})
export class AuthenticationModule { }
