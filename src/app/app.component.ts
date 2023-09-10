import { Component } from '@angular/core';
import { CaptchaConfig, CaptchaService } from './captcha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'AngularAppCaptcha';
  public enableCaptcha = true;
  public selectedOption: number = 1;
  constructor(private captchsService: CaptchaService, private config: CaptchaConfig){
    this.config.type = 3;
    this.captchsService.captchaStatus.subscribe((value: boolean | null)=>{
      if(value){
        console.log(value)
      }
    })
  }

  public onSelect(): void {
    this.enableCaptcha = false;
    setTimeout(() => {
      this.config.type = +this.selectedOption;
      this.enableCaptcha = true;
    }, 300);
  }
}
