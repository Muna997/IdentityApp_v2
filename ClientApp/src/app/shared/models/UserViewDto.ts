export interface UserViewDto {
  userId: number;
  name: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  isLocked: boolean;
  isActive: boolean;
  lockoutEnd: string | null;
  createdAt: string;
  lastActivity: string | null;
  csvRoles: string;
}
