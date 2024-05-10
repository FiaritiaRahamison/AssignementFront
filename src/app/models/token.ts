export interface Token {
  token: string;
  user: User,
  message?: string
}

interface User {
  id: string,
  name: string,
  firstname: string,
  login: string,
  role: Int16Array
}
