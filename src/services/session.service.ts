
interface ISessionService {
    set(key: string, value: string): void;
    get(key: string): string | null;
    clear(key: string): void;
}

export default class SessionService implements ISessionService {
    private static instance: SessionService;

    private constructor() { }

    static getInstance() {
        if (!SessionService.instance) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }

    set(key: string, value: string) {
        window.sessionStorage.setItem(key, value);
    }

    get(key: string) {
        return window.sessionStorage.getItem(key);
    }

    clear(key: string) {
        window.sessionStorage.removeItem(key);
    }
}