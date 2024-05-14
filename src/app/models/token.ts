export interface Token {
  token: string;
  user: User;
  message?: string
}

export interface User {
  id: string,
  name: string,
  firstname: string,
  login: string,
  role: Number,
  photo?: string
}
