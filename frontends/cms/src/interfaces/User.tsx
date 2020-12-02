export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  isAuthenticated?: boolean;
  decodedToken?: DecodedToken | string | { [key: string]: any } | null;
}

export interface DecodedToken {
  iat: number | null;
  exp: number | null;
  sub: string | null;
}
