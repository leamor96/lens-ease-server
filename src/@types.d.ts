export {};

export type Role = {
  name: string;
};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
