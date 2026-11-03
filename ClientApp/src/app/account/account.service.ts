import { ConfirmEmailModel } from './../shared/models/confirm-email';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { RegisterModel } from '../shared/models/RegisterModel';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../shared/models/ApiResponse';
import { loginModel } from '../shared/models/loginModel';
import { LoginResponseModel } from '../shared/models/LoginResponse';
import { AuthStatusModel } from '../shared/models/isAuthenticated';
import { ForgotUsernamePasswordModel } from '../shared/models/forgotUsernamePassword';
import { ResetPasswordModel } from '../shared/models/resetPassword';
import { EditProfileModel, MyProfileModel } from '../shared/models/MyProfileModel';
import { ChangePasswordModel } from '../shared/models/ChangePasswordModel';
import { DeleteAccountModel } from '../shared/models/DeleteAccountModel';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../shared/models/DecodedTokenModel';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiUrl = environment.api;
  $user = signal<LoginResponseModel | null>(null);
  private http = inject(HttpClient);
  confirmEmail(confirmEmail: ConfirmEmailModel) {
    return this.http.put<ApiResponse<any>>(this.apiUrl + 'account/confirm-email', confirmEmail, {
      withCredentials: true,
    });
  }
  login(login: loginModel) {
    return this.http.post<LoginResponseModel>(this.apiUrl + 'account/login', login);
  }
  logout() {
    return this.http.post(this.apiUrl + 'account/logout', null);
  }
  register(register: RegisterModel) {
    return this.http.post<ApiResponse<any>>(this.apiUrl + 'account/register', register);
  }
  authStatus() {
    return this.http.get<AuthStatusModel>(this.apiUrl + 'account/auth-status');
  }
  setUser(user: LoginResponseModel | null) {
    this.$user.set(user);
  }
  refreshAppuser() {
    return this.http.get<LoginResponseModel>(this.apiUrl + 'account/refresh-appuser');
  }
  forgotUsernamePassword(forgot: ForgotUsernamePasswordModel) {
    return this.http.post<ApiResponse<any>>(
      this.apiUrl + 'account/forgot-username-or-password',
      forgot,
    );
  }

  resetPassword(resetPassword: ResetPasswordModel) {
    return this.http.put<ApiResponse<any>>(this.apiUrl + 'account/reset-password', resetPassword);
  }

  myProfile() {
    return this.http.get<MyProfileModel>(this.apiUrl + 'MyProfile');
  }
  editProfile(editProfile: EditProfileModel) {
    return this.http.put<ApiResponse<any>>(this.apiUrl + 'MyProfile', editProfile);
  }
  changePassword(ChangePassword: ChangePasswordModel) {
    return this.http.put<ApiResponse<any>>(
      this.apiUrl + 'MyProfile/change-password',
      ChangePassword,
    );
  }
  deleteAccount(deleteAccount: DeleteAccountModel) {
    return this.http.delete<ApiResponse<any>>(this.apiUrl + 'MyProfile/delete-account', {
      body: deleteAccount,
    });
  }

  isAdmin = computed(() => {
    const user = this.$user();
    if (!user) {
      return false;
    }

    const decode = jwtDecode<DecodedToken>(user.jwt);
    const roles = Array.isArray(decode.role) ? decode.role : [decode.role];
    const isAdmin = roles.includes('admin');
    if (isAdmin) {
      return isAdmin;
    } else return false;
  });
}
