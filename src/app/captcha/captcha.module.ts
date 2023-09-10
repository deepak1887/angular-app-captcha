import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CaptchaComponent } from "./captcha.component";
import { CaptchaService } from "./captcha.service";
import { CaptchaConfig } from "./captcha.config";

@NgModule({
    declarations:[
        CaptchaComponent
    ],
    providers:[
        CaptchaService,
        CaptchaConfig
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports:[
        CaptchaComponent
    ]
})
export class CaptchaModule{}