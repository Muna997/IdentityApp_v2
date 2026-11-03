import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../account.service';
import { FormInput } from '../../shared/components/form-input/form-input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormInput, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  login() {
    this.accountService.login(this.form.value).subscribe({
      next: (response) => {
        this.accountService.setUser(response);
        this.router.navigateByUrl('/');
      },
    });
  }
  forgot() {
    this.router.navigateByUrl('/account/forgot-user-password');
  }
}
