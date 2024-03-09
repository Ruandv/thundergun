export default class BaseHttpService {
    private baseUrl: string;
    private language: string;
    private static instances: BaseHttpService[];
    private preCall?: () => RequestInit;

    private async fetch(url: string, options: RequestInit) {
        const response = await fetch(this.baseUrl + url, {
            ...options,
            headers: {
                'Accept-Language': this.language,
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
    private constructor(baseUrl: string, language: string) {
        this.baseUrl = baseUrl;
        this.language = language;
    }

    static getInstance(baseUrl: string, language: string, preCall?: () => RequestInit) {
        if (!BaseHttpService.instances) {
            BaseHttpService.instances = [];
        }
        // check if an instance already exist with the same baseUrl, language and authToken
        const instance = BaseHttpService.instances.find(i => i.baseUrl === baseUrl && i.language === language);
        if (instance) {
            return instance;
        }
        // create a new instance
        const newInstance = new BaseHttpService(baseUrl, language);
        newInstance.preCall = preCall;
        BaseHttpService.instances.push(newInstance);
        return newInstance;
    }
    get(url: string, options: RequestInit = {}) {
        const h = this.preCall ? this.preCall() : {};
        // merge the h with options
        options.headers = { ...h.headers };
        return this.fetch(url, { ...options, method: 'GET' });
    }

    post(url: string, body: any, options: RequestInit = {}) {
        return this.fetch(url, { ...options, method: 'POST', body: JSON.stringify(body) });
    }

    put(url: string, body: any, options: RequestInit = {}) {
        return this.fetch(url, { ...options, method: 'PUT', body: JSON.stringify(body) });
    }

    delete(url: string, options: RequestInit = {}) {
        return this.fetch(url, { ...options, method: 'DELETE' });
    }
}