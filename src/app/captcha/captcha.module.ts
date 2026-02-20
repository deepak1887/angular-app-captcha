import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CaptchaComponent } from "./captcha.component";
import { CaptchaService } from "./captcha.service";
import { CaptchaConfig } from "./captcha.config";

@NgModule({
    providers:[
        CaptchaService,
        CaptchaConfig
    ],
    imports: [
        CommonModule,
        FormsModule,
        CaptchaComponent
    ],
    exports:[
        CaptchaComponent
    ]
})
export class CaptchaModule{}