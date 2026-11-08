import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUsernamePassword } from './forgot-username-password';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ForgotUsernamePassword', () => {
  let component: ForgotUsernamePassword;
  let fixture: ComponentFixture<ForgotUsernamePassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotUsernamePassword],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotUsernamePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
