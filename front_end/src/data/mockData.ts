export interface PasswordEntry {
    id: string;
    title: string;
    username: string;
    category: 'Passwords' | 'Secure Notes' | 'Cards' | 'Identities';
    icon?: string; // URL or initial
    color?: string; // Tailwind color class for avatar background
}

export const mockPasswords: PasswordEntry[] = [
    {
        id: '1',
        title: 'Acme Corporation',
        username: 'user@email.com',
        category: 'Passwords',
        color: 'bg-teal-800',
    },
    {
        id: '2',
        title: 'Innovate Inc.',
        username: 'contact@innovate.design',
        category: 'Passwords',
        color: 'bg-yellow-100', // Light background for contrast
    },
    {
        id: '3',
        title: 'SocialSphere',
        username: 'user@email.com',
        category: 'Passwords',
        color: 'bg-green-700',
    },
    {
        id: '4',
        title: 'QuantumCloud Services',
        username: 'user@email.com',
        category: 'Passwords',
        color: 'bg-white',
    },
    {
        id: '5',
        title: 'Nexus Gaming',
        username: 'gamer.tag@email.com',
        category: 'Passwords',
        color: 'bg-gray-800',
    },
];
