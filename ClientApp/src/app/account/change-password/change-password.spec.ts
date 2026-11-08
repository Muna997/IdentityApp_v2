import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassword } from './change-password';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ChangePassword', () => {
  let component: ChangePassword;
  let fixture: ComponentFixture<ChangePassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePassword],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
