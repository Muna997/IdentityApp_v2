import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../shared/components/form-input/form-input';
import { SharedService } from '../../shared/shared.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CommonModule, FormInput],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private sharedService: SharedService,
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  save() {
    this.accountService.changePassword(this.form.value).subscribe({
      next: (response) => {
        this.sharedService.showNotification(response);
      },
    });
  }
}
