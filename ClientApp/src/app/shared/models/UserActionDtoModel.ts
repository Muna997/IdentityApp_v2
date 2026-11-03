export interface UserActionDto {
  userId: number;
  action: string; // 'lock' | 'unlock' | 'active' | 'inactive'
  daysToLock?: number; // only meaningful for 'lock'
}
