import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { AccountService } from '../account.service';
import { MyProfileModel } from '../../shared/models/MyProfileModel';
import { CommonModule } from '@angular/common';
import { FormInput } from '../../shared/components/form-input/form-input';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, CommonModule, FormInput],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfile implements OnInit {
  form!: FormGroup;
  myProfile: MyProfileModel | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private sharedService: SharedService,
  ) {}
  ngOnInit(): void {
    this.accountService.myProfile().subscribe({
      next: (response) => {
        this.myProfile = response;
        this.initializeForm();
      },
    });
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: [this.myProfile?.name, [Validators.required]],
      email: [this.myProfile?.email, [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]],
    });
  }

  save() {
    this.accountService.editProfile(this.form.value).subscribe({
      next: (response) => {
        if (this.myProfile?.email != this.form.value.email) {
          this.router.navigate(['/account/confirm-email'], {
            queryParams: { email: this.form.value.email },
          });
        } else {
          this.accountService.setUser(response.data);
          this.sharedService.showNotification(response);
        }
      },
    });
  }
}
