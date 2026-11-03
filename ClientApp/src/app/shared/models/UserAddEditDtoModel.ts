export interface UserAddEditDto {
  userId: number;
  name: string; // required, 3-15 chars, letters+numbers only
  email: string; // required, lowercased server-side
  password?: string; // required only when creating (UserId == 0); 6-16 chars if provided on edit
  emailConfirmed: boolean;
  isActive: boolean;
  lastActivity: string | null;
  roles: string[];
}
