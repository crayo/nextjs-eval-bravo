export interface TokenUser {
  id: string,
  username: string
};

export interface User {
  _id: string,
  id?: string,
  username: string
};

export interface JSONResponse {
  status: string,
  error?: string
};

export interface JSONUsersResponse extends JSONResponse {
  users: User[]
};
