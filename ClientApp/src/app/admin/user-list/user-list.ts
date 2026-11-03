import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserViewDto } from '../../shared/models/UserViewDto';
import { GetUsersParams } from '../../shared/models/GetUsersParams';
import { PaginatedResult } from '../../shared/models/PaginatedResult';
import { Pagination } from '../../shared/components/pagination/pagination';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [Pagination, FormsModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
  private adminService = inject(AdminService);
  subject = new Subject<void>();
  selectedRoles: string[] = [];
  getUsersParams: GetUsersParams = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: '',
    searchBy: '',
    csvRoles: '',
    lockUnlock: '',
    activation: '',
  };
  usersResult!: PaginatedResult<UserViewDto>;
  ngOnInit(): void {
    this.getUsers();
    this.subject.pipe(debounceTime(500)).subscribe({
      next: () => this.getUsers(),
    });
  }
  getUsers() {
    this.adminService.getUsers(this.getUsersParams).subscribe({
      next: (response) => {
        this.usersResult = response;
      },
    });
  }
  onPageChanged(newPage: number) {
    this.getUsersParams.pageNumber = newPage;
    this.getUsers();
  }
  search() {
    this.getUsersParams.pageNumber = 1;

    this.subject.next();
  }
  activation() {
    this.getUsersParams.pageNumber = 1;
    this.getUsers();
  }
  lockUnlock() {
    this.getUsersParams.pageNumber = 1;
    this.getUsers();
  }
  sortBy() {
    this.getUsersParams.pageNumber = 1;
    this.getUsers();
  }
  roleChanged(role: string, e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.checked) {
      this.selectedRoles.push(role);
      this.getUsersParams.csvRoles = this.selectedRoles.join(',');
      this.getUsersParams.pageNumber = 1;
      this.getUsers();
    } else {
      this.selectedRoles = this.selectedRoles.filter((selectedRole) => selectedRole !== role);
      this.getUsersParams.csvRoles = this.selectedRoles.join(',');
      this.getUsersParams.pageNumber = 1;
      this.getUsers();
    }
  }

  onLockUnlockUser(user: UserViewDto, action: string) {
    this.adminService.lockUnlockUser({ userId: user.userId, action }).subscribe({
      next: () => {
        this.getUsers();
      },
    });
  }
  onActiveInactiveUser(user: UserViewDto, action: string) {
    this.adminService.activeInactiveUser({ userId: user.userId, action }).subscribe({
      next: () => {
        this.getUsers();
      },
    });
  }

  onEmailConfirmationLink(user: UserViewDto) {
    this.adminService.emailConfirmationLink(user.userId).subscribe({
      next: () => {
        this.getUsers();
      },
    });
  }

  onForgotUsernameOrPassword(user: UserViewDto) {
    this.adminService.forgotUsernameOrPassword(user.userId).subscribe({
      next: () => {
        this.getUsers();
      },
    });
  }
  onDeleteUser(user: UserViewDto) {
    this.adminService.deleteAccount(user.userId).subscribe({
      next: () => {
        this.getUsers();
      },
    });
  }
}
