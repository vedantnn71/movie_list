import { type SessionData } from '@/hooks/types';
import jwtDecode from 'jwt-decode';

export const decodeJwt = async (token: string): Promise<SessionData | null> => {
  let decodedToken: SessionData | null = null;

  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    return null;
  }

  return decodedToken as SessionData;
}