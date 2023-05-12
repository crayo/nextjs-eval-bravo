export interface SessionUser {
  id: string,
  username: string
};

export interface Session {
  user: SessionUser | null
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

// Post related interfaces
export interface NewPost {
  irt?: string | null,
  title?: string,
  content: string,
  userid: string,
  username: string
};

export interface Post {
  _id: string,
  irt: string | null,
  userid: string,
  username: string,
  title: string | null,
  content: string,
  createdAt: Date,
  deletedAt?: Date | null
};

export interface FullPost extends Post {
  replies: Post[]
};

export interface FilterPosts {
  _id?: string,
  userid?: string,
  username?: string,
  title?: string,
  irt?: string | null
};
