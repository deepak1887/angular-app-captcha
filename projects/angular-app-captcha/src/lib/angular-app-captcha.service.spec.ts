import { TestBed } from '@angular/core/testing';

import { AngularAppCaptchaService } from './angular-app-captcha.service';

describe('AngularAppCaptchaService', () => {
  let service: AngularAppCaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularAppCaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
