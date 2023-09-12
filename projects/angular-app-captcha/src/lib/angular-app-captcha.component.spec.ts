import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCaptchaComponent } from './angular-app-captcha.component';

describe('AngularAppCaptchaComponent', () => {
  let component: AppCaptchaComponent;
  let fixture: ComponentFixture<AppCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCaptchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
