import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaptchaService } from './angular-app-captcha.service';
import { CaptchaConfig } from './angular-app-captcha.config';

@Component({
  selector: 'angular-app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="captcha-container {{config.cssClass}}">\n <canvas id="captcahCanvas" width="316" height="80"></canvas>\n \n\n <div class="captcha-actions" *ngIf="config.type != 3">\n  <input type="text" [(ngModel)]="captch_input" />\n  <input type="button" value="Check" (click)="checkCaptcha()" />\n  <a href="javascript:void(0)" class="cpt-btn" (click)="playCaptcha()">\uD83D\uDD08</a>\n    <a href="javascript:void(0)" class="cpt-btn reload" (click)="createCaptcha()">&#x21bb;</a>\n</div>\n</div>
  `,
  styles: [".captcha-container{width:315px;box-shadow:1px 1px 1px #ccc}.captcha-actions input[type=text]{padding:5px;border:1px solid #CCC;border-radius:10px 0 0 10px;outline:none}.captcha-actions input[type=button]{outline:none;padding:6px;border:none;background:#CCC;border-radius:0 10px 10px 0}.captcha-actions a{padding:10px;cursor:pointer;font-size:15px;font-weight:bold;text-decoration:none;color:#222}.captcha-container .powered-by{font-size:11px;font-family:Arial;color:#ccc;padding:5px;display:block!important}\n"]
})
export class AppCaptchaComponent {
  private code: any;
  private resultCode: any;
  public captch_input: any;
  constructor(private captchService: CaptchaService, public config: CaptchaConfig) { }

  ngOnInit() {
      if (this.config) {
          if (!this.config.font || !this.config.font.size) {
              this.config['font']['size'] = '40px';
          }
          if (!this.config.font || !this.config.font.family) {
              this.config['font']['family'] = 'Arial';
          }
          if (!this.config.font || !this.config.font.color) {
              this.config['font']['color'] = '#000000';
          }
          if (!this.config.length) {
              this.config['length'] = 6;
          }
          if (!this.config.cssClass) {
              this.config['cssClass'] = '';
          }
          if (!this.config.type) {
              this.config['type'] = 1;
          }
          if (!this.config.back || !this.config.back.stroke) {
              this.config['back']['stroke'] = '';
          }
          if (!this.config.back || !this.config.back.solid) {
              this.config['back']['solid'] = '#fbfbfb';
          }
          this.createCaptcha();
      }

  }

  public createCaptcha() {
      switch (this.config.type) {
          case 1:
              let char = Math.random().toString(24).substring(2, this.config.length) +
                                              Math.random().toString(24).substring(2, 4);
              this.code = this.resultCode = char.toUpperCase();
              break;
          case 2:
              let num1 = Math.floor(Math.random() * 99);
              let num2 = Math.floor(Math.random() * 9);
              let operators = ['+', '-'];
              let operator = operators[(Math.floor(Math.random() * operators.length))];
              this.code = num1 + operator + num2 + '=?';
              this.resultCode = (operator == '+') ? (num1 + num2) : (num1 - num2);
              break;
          case 3:
              break;
      }

      setTimeout(() => {
          let captcahCanvas: any = document.getElementById('captcahCanvas');
          if(captcahCanvas === null) return;
          var ctx = captcahCanvas.getContext('2d');
          ctx.fillStyle = this.config.back.solid;
          ctx.fillRect(0, 0, captcahCanvas.width, captcahCanvas.height);
          ctx.beginPath();
          if (this.config.type !== 3) {
              captcahCanvas.style.letterSpacing = 15 + 'px';
              ctx.font = this.config.font.size + ' ' + this.config.font.family;
              ctx.fillStyle = this.config.font.color;
              ctx.textBaseline = 'middle';
              ctx.fillText(this.code, 40, 50);
              if (this.config.back.stroke) {
                  ctx.strokeStyle = this.config.back.stroke;
                  for (var i = 0; i < 150; i++) {
                      ctx.moveTo(Math.random() * 300, Math.random() * 300);
                      ctx.lineTo(Math.random() * 300, Math.random() * 300);
                  }
                  ctx.stroke();
              }
          }
          else {
              ctx.fillStyle = '#000';
              let position = {
                  x: 20,
                  y: 20,
                  width: 30,
                  height: 30,
                  thickness: 1
              };
              ctx.fillRect(position.x - (position.thickness), position.y - (position.thickness), position.width + (position.thickness * 2), position.height + (position.thickness * 2));
              ctx.fillStyle = '#FFF';
              ctx.fillRect(position.x, position.y, position.width, position.height);
              ctx.font = '15px ' + this.config.font.family;
              ctx.fillStyle = this.config.font.color;
              ctx.fillText('I\'m not a robot', (position.x) + position.width + 5, (position.y * 2));
              captcahCanvas.addEventListener('mousedown', (e: any) => {
                  let clickPosition = this.getMousePosition(captcahCanvas, e);
                  let midOfBox = {
                      x: position.x + position.width / 2,
                      y: position.y + position.height / 2
                  };
                  this.resultCode = 1;
                  if (Math.abs(clickPosition.x - midOfBox.x) <= 5 &&
                      Math.abs(clickPosition.y - midOfBox.y) <= 5) { /// it is a robot
                      this.captch_input = 0;
                  }
                  else { // it is a human
                      if ((clickPosition.x >= position.x && clickPosition.x <= (position.x + position.width)) &&
                          (clickPosition.y >= position.y && clickPosition.y <= (position.y + position.height))) {
                          this.captch_input = 1;
                          ctx.font = '30px ' + this.config.font.family;
                          ctx.fillText('✔', position.x, position.y + position.height - 5);
                      }
                  }
                  this.checkCaptcha();
              });
          }
      }, 100);

  }

  public playCaptcha() {
      var msg = new SpeechSynthesisUtterance(this.code.split('').join(' '));
      msg.pitch = 1;
      window.speechSynthesis.speak(msg);
  }

  public checkCaptcha() {
      if (this.captch_input != this.resultCode) {
          this.captchService.setCaptchaStatus(false);
      }
      else {
          this.captchService.setCaptchaStatus(true);
      }
  }

  public getMousePosition(canvas: any, event: any) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      return { x: x, y: y };
  }
}
