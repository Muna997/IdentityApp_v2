export interface MyProfileModel {
  name: string;
  email: string;
}

export interface EditProfileModel extends MyProfileModel {
  currentPassword: string;
}
