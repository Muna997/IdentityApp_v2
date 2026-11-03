import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../shared/components/form-input/form-input';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-forgot-username-password',
  imports: [ReactiveFormsModule, CommonModule, FormInput],
  templateUrl: './forgot-username-password.html',
  styleUrl: './forgot-username-password.scss',
})
export class ForgotUsernamePassword implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private sharedService: SharedService,
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  send() {
    this.accountService.forgotUsernamePassword(this.form.value).subscribe({
      next: (response) => {
        this.sharedService.showNotification(response);
        this.router.navigate(['/account/reset-password'], {
          queryParams: { email: this.form.value.email },
        });
      },
    });
  }
}
