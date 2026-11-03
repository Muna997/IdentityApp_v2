export interface DecodedToken {
  uid: string;
  name: string;
  username: string;
  eml: string;
  role: string | string[];
  exp: number;
}
