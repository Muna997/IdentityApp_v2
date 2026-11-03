import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../shared/components/form-input/form-input';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-delete-account',
  imports: [ReactiveFormsModule, CommonModule, FormInput],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccount implements OnInit {
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
      currentPassword: ['', [Validators.required]],
      currentUserName: ['', [Validators.required]],
      confirmation: [false, [Validators.required]],
    });
  }
  delete() {
    this.accountService.deleteAccount(this.form.value).subscribe({
      next: (response) => {
        this.sharedService.showNotification(response);
        this.accountService.setUser(null);
        this.router.navigateByUrl('/');
      },
    });
  }
}
