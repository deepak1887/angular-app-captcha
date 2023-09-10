import { Injectable } from "@angular/core";

@Injectable()
export class CaptchaConfig {
    public font: any = {};
    public back: any = {};
    public type: number = 1;
    public length: number = 5;
    public cssClass!: string;
}