declare namespace Express {
  export interface User {
    id: number;
    username: string;
    role: string;
  }

  export interface Request {
    user?: User;
  }
}
