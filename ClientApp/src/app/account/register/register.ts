import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { FormInput } from '../../shared/components/form-input/form-input';
import { specialCharNotAllowedValidator } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormInput],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          specialCharNotAllowedValidator,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });
  }

  register() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.accountService.register(this.form.value).subscribe({
      next: (response) => {
        this.sharedService.showNotification(response);
        this.router.navigate(['/account/confirm-email'], {
          queryParams: { email: this.form.value.email },
        });
      },
    });
  }

  // //private methods
  // specialCharNotAllowed(val: AbstractControl) {
  //   let allowName = /^[a-zA-Z0-9]+$/;
  //   let enteredName = val.value;
  //   if (!allowName.test(enteredName)) {
  //     return { specialCharNotAllowed: true };
  //   }
  //   return null;
  // }
}
