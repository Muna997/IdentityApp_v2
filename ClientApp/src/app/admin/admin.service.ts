import { UserActionDto } from './../shared/models/UserActionDtoModel';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../shared/models/PaginatedResult';
import { UserViewDto } from '../shared/models/UserViewDto';
import { GetUsersParams } from '../shared/models/GetUsersParams';
import { ApiResponse } from '../shared/models/ApiResponse';
import { UserAddEditDto } from '../shared/models/UserAddEditDtoModel';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = environment.api;
  private http = inject(HttpClient);
  getUsers(getUsersParams: GetUsersParams) {
    return this.http.get<PaginatedResult<UserViewDto>>(this.apiUrl + 'Admin/get-users', {
      params: getUsersParams,
    });
  }

  lockUnlockUser(userActionDto: UserActionDto) {
    return this.http.put<ApiResponse<any>>(this.apiUrl + 'Admin/lock-unlock-user', userActionDto);
  }
  activeInactiveUser(userActionDto: UserActionDto) {
    return this.http.put<ApiResponse<any>>(
      this.apiUrl + 'Admin/active-inactive-user',
      userActionDto,
    );
  }
  emailConfirmationLink(userId: number) {
    return this.http.put<ApiResponse<any>>(
      this.apiUrl + 'Admin/email-confirmation-link/' + userId,
      '',
    );
  }

  forgotUsernameOrPassword(userId: number) {
    return this.http.put<ApiResponse<any>>(
      this.apiUrl + 'Admin/forgot-username-or-password/' + userId,
      '',
    );
  }

  deleteAccount(userId: number) {
    return this.http.delete<ApiResponse<any>>(this.apiUrl + 'Admin/delete-user/' + userId, {});
  }

  getAppRoles() {
    return this.http.get<string[]>(this.apiUrl + 'Admin/app-roles');
  }
  getUser(userId: number) {
    return this.http.get<UserAddEditDto>(this.apiUrl + 'Admin/get-user/' + userId);
  }

  nameTaken(name: string) {
    return this.http.get<{ isTaken: boolean }>(this.apiUrl + 'Admin/name-taken', {
      params: { name },
    });
  }
  emailTaken(email: string) {
    return this.http.get<{ isTaken: boolean }>(this.apiUrl + 'Admin/email-taken', {
      params: { email },
    });
  }
  addEditUser(userAddEditDto: UserAddEditDto) {
    return this.http.post<ApiResponse<any>>(this.apiUrl + 'Admin/add-edit-user', userAddEditDto);
  }
}
