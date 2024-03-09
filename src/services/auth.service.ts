import { SessionKeys } from "./SessionKeys";
import BaseHttpService from "./base.service";
import SessionService from "./session.service";

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
    return {
        login,
        logout
    }
}

export default AuthService;