import { decodeJwt } from "@/lib";
import { useEffect, useState } from "react";
import { type SessionData, type Session } from "./types";

export const useSession = (): Session => {
  const token = localStorage.getItem('token');
  const [session, setSession] = useState<SessionData | null>(null);
  const [status, setStatus] = useState<'unauthenticated' | 'authenticated'>('unauthenticated');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      setSession(null);
      setStatus('unauthenticated');
    }

    decodeJwt(token!)
      .then((payload) => {
        if (payload === null) {
          setStatus('unauthenticated');
          setIsLoading(false);
          return
        }

        setStatus('authenticated');
        setSession(payload);
      })
      .catch(() => {
        setStatus('unauthenticated');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const sessionData: Session = {
    status,
    isLoading,
    data: session,
  };

  return sessionData;
}