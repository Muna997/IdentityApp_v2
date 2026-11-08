import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmail } from './confirm-email';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ConfirmEmail', () => {
  let component: ConfirmEmail;
  let fixture: ComponentFixture<ConfirmEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmail],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
