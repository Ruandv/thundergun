import { SessionKeys } from "./SessionKeys";
import BaseHttpService from "./base.service";
import SessionService from "./session.service";
import { User } from "../models/user";

const UserService = () => {
    var httpService = BaseHttpService.getInstance(process.env.REACT_APP_API_URL!, 'en',
        () => {
            var authToken = sessionStorage.get(SessionKeys.AuthToken);
            const headers = {
                'Authorization': `Bearer ${authToken}`,
                'Accept-Language': navigator.language
            };
            return { headers };
        }
    );
    const sessionStorage = SessionService.getInstance();
    const get = async (): Promise<User> => {
        const response = await httpService.get('/user');
        return Promise.resolve(response);
    }
    const update = async (userName: string, password: string, email: string): Promise<boolean> => {
        const response = await httpService.post('/user', { userName, password, email });
        return Promise.resolve(response);
    }
    const remove = async (): Promise<boolean> => {
        const response = await httpService.delete('/user');
        return Promise.resolve(response);
    }
    return {
        get,
        remove,
        update
    }
}

export default UserService;