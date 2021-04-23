import axios from "axios";
import { ENV } from '../env';

export const api = axios.create({
  baseURL: `${ENV.BACKEND_HOST}/api/v1`
});

export const login = (sessionId: string) : void => {
  localStorage.setItem('sessionId', sessionId);
}

export const logout = () : void => {
  localStorage.clear();
};

export const isLogged = () : boolean => {
  return  localStorage.getItem('sessionId') !== null &&
          localStorage.getItem('sessionId') !== undefined;
};

export const getSessionId = (): string | null => {
  return localStorage.getItem('sessionId');
};