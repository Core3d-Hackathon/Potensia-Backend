type AuthUser = {
  clerkUserId: string;
  sessionId?: string;
  email?: string | null;
};

declare namespace Express {
  interface Request {
    requestId?: string;
    auth?: AuthUser;
  }
}
