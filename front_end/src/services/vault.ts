import axios from 'axios';

const API_URL = '/user'; // Using proxy

export interface VaultItem {
    id: string;
    user_gmail: string;
    user_password?: string;
    application: string;
    application_icon?: string;
}

export interface CreateVaultItem {
    user_gmail: string;
    user_password: string;
    application: string;
    application_icon?: string;
}

export const getVaultItems = async (): Promise<VaultItem[]> => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/get/passwords/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const addVaultItem = async (item: CreateVaultItem): Promise<VaultItem> => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/add/passwords/`, item, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteVaultItem = async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/delete/passwords/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateVaultItem = async (id: string, item: CreateVaultItem): Promise<VaultItem> => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/update/password/${id}/`, item, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
