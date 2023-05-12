export interface SessionUser {
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

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUser;
  }
}
