import axios from "axios";

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

const getApi = () : any => {
  return (!isLogged()) ? null : axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_HOST}/api/v1`,
    headers: {
      authorization: `Bearer ${getSessionId()}`
    }
  });
};

export const api = getApi();