import { SessionKeys } from "./SessionKeys";
import BaseHttpService from "./base.service";
import SessionService from "./session.service";
import { jwtDecode } from "jwt-decode";

export interface AuthUser {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    nbf: number;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
    jti: string;
  }

const AuthService = () => {
    var httpService = BaseHttpService.getInstance(process.env.REACT_APP_API_URL!, 'en');
    const sessionStorage = SessionService.getInstance();
    const login = async (username: string, password: string): Promise<boolean> => {
        const response = await httpService.post('/login', { username, password });
        sessionStorage.set(SessionKeys.AuthToken, response.access_token);
        return Promise.resolve(true);
    }

    const logout = async (): Promise<boolean> => {
        await httpService.post('/logout', {});
        sessionStorage.clear(SessionKeys.AuthToken);
        window.location.href = '/';
        return Promise.resolve(true);
    }

    const decodeToken = async (token: string): Promise<any> => {
        var result = jwtDecode(token);
        return Promise.resolve(result);
    }

    const getAvatar = async (): Promise<any> => {
        const token  = sessionStorage.get(SessionKeys.AuthToken);
        var result = await decodeToken(token!);
        return result.picture;
    }

    const getUserName = async (): Promise<any> => {
        const token  = sessionStorage.get(SessionKeys.AuthToken);
        var result = await decodeToken(token!);
        return result.name;
    }

    return {
        login,
        logout,
        decodeToken,
        getAvatar,
        getUserName
    }
}

export default AuthService;