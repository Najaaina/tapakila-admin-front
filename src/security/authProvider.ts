import { AuthProvider, HttpError } from 'react-admin';

const loginUrl: string = `${import.meta.env.VITE_API_URL}/login`;

interface LoginParams {
    email: string;
    password: string;
}

const authProvider: AuthProvider = {
    login: async function (params: LoginParams): Promise<{ redirectTo?: string | boolean } | void | never> {
        const { email, password } = params;

        const response: Response = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorMessage = (await response.json())?.message || 'Invalid email or password';
            return Promise.reject(new HttpError(errorMessage, response.status));
        }

        const responseData = await response.json();

        const accessToken = responseData.token;
        sessionStorage.setItem('accessToken', accessToken);

        return {
            redirectTo: '/',
        };
    },
    logout: async function (): Promise<void | false | string> {
        sessionStorage.removeItem('accessToken');
        return Promise.resolve();
    },
    checkAuth: function (): Promise<void> {
        const token: string | null = sessionStorage.getItem('accessToken');
        if (!token) {
            return Promise.reject(new HttpError('Not authenticated', 401));
        }
        return Promise.resolve();
    },
    checkError: async function (error): Promise<void> {
        if (error.status === 401 || error.status === 403) {
            sessionStorage.removeItem('accessToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
};

export default authProvider;
