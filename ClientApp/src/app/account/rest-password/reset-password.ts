import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';
import { FormInput } from '../../shared/components/form-input/form-input';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule, FormInput],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  email?: string | null;
  token?: string | null;

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
  ) {}
  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.queryParamMap.get('email');

    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      token: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }
  resetPassword() {
    this.accountService.resetPassword(this.form.value).subscribe({
      next: (response) => {
        this.sharedService.showNotification(response);
        this.router.navigateByUrl('/account/login');
      },
    });
  }
}
