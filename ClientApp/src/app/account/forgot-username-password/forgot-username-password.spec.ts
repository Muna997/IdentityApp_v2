import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUsernamePassword } from './forgot-username-password';

describe('ForgotUsernamePassword', () => {
  let component: ForgotUsernamePassword;
  let fixture: ComponentFixture<ForgotUsernamePassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotUsernamePassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotUsernamePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
