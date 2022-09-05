export type Session = {
  status: "unauthenticated" | "authenticated";
  isLoading: boolean;
  data: SessionData | null;
}

export type SessionData = {
  email: string;
}