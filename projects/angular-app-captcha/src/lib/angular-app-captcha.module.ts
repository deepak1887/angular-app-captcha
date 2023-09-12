import { NgModule } from '@angular/core';
import { AppCaptchaComponent } from './angular-app-captcha.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppCaptchaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AppCaptchaComponent
  ]
})
export class AppCaptchaModule { }
