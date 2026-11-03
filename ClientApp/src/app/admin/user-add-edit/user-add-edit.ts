import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { FormInput } from '../../shared/components/form-input/form-input';
import {
  emailTakenValidator,
  nameTakenValidator,
  specialCharNotAllowedValidator,
} from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-user-add-edit',
  imports: [ReactiveFormsModule, CommonModule, FormInput, RouterModule],
  templateUrl: './user-add-edit.html',
  styleUrl: './user-add-edit.scss',
})
export class UserAddEdit implements OnInit {
  private adminService = inject(AdminService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  id: string | null = null;
  roles: string[] = [];
  originalName: string = '';
  originalEmail: string = '';
  private formBuilder = inject(FormBuilder);
  form!: FormGroup;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || null;
    this.adminService.getAppRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
    });
    if (this.id) {
      this.adminService.getUser(+this.id).subscribe({
        next: (response) => {
          this.initializeForm();
          this.originalName = response.name;
          this.originalEmail = response.email;
          this.form.patchValue({
            name: response.name,
            email: response.email,
            emailConfirmed: response.emailConfirmed,
            isActive: response.isActive,
            roles: response.roles,
          });
        },
      });
    } else {
      this.initializeForm();
    }
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
        [
          nameTakenValidator(
            this.adminService,
            () => this.originalName,
            () => this.id !== null,
          ),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        [
          emailTakenValidator(
            this.adminService,
            () => this.originalEmail,
            () => this.id !== null,
          ),
        ],
      ],
      password: [
        '',
        this.id === null
          ? [Validators.required, Validators.minLength(6), Validators.maxLength(16)]
          : [Validators.minLength(6), Validators.maxLength(16)],
      ],
      emailConfirmed: [false],
      isActive: [false],
      roles: [[], Validators.required],
    });
  }

  addEditUser() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const model = {
      ...this.form.value,
      userId: this.id ? +this.id : 0,
    };
    this.adminService.addEditUser(model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/users');
      },
    });
  }
  onRoleChange(role: string, event: Event) {
    const input = event.target as HTMLInputElement;
    let selectedRoles = this.form.get('roles')?.value;

    if (input.checked) {
      selectedRoles.push(role);
    } else {
      selectedRoles = selectedRoles.filter((selectedRole: string) => selectedRole !== role);
    }
    this.form.get('roles')?.setValue(selectedRoles);
  }
}
