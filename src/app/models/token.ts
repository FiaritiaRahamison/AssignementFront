export interface Token {
  token: string;
  user: User;
  message?: string
}

export interface User {
  _id: string,
  id: string,
  name: string,
  firstname: string,
  login: string,
  role: Number,
  photo?: string
}
