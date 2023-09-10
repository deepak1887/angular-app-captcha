import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CaptchaService{
    private captchaSource = new BehaviorSubject<boolean | null>(null);

    public get captchaStatus(): Observable<boolean | null> {
        return this.captchaSource.asObservable();
    }

    public setCaptchaStatus(code: boolean): void {
        this.captchaSource.next(code);
    }
}