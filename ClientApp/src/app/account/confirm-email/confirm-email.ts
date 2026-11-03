import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { SharedService } from '../../shared/shared.service';
import { FormInput } from '../../shared/components/form-input/form-input';

@Component({
  selector: 'app-confirm-email',
  imports: [ReactiveFormsModule, CommonModule, FormInput],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.scss',
})
export class ConfirmEmail implements OnInit {
  email?: string | null;
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
    });
  }
  confirmEmail() {
    this.accountService.confirmEmail(this.form.value).subscribe({
      next: (response) => {
        this.sharedService.showNotification(response);
        this.router.navigateByUrl('/account/login');
      },
    });
  }
}
