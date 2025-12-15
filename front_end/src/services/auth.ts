export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', '');
    formData.append('client_id', 'string');
    formData.append('client_secret', '');

    const response = await fetch('/user/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

export interface UserInfo {
    email: string;
    username: string;
    id: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
    const token = localStorage.getItem('token');
    const response = await fetch('/users/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user info');
    }

    return response.json();
};

export const signup = async (email: string, username: string, password: string): Promise<any> => {
    const response = await fetch('/user/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
        throw new Error('Signup failed');
    }

    return response.json();
};
