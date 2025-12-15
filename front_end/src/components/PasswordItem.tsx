import React from 'react';
import type { PasswordEntry } from '../data/mockData';

interface PasswordItemProps {
    entry: PasswordEntry;
}

const PasswordItem: React.FC<PasswordItemProps> = ({ entry }) => {
    // Helper to get initials
    const getInitials = (name: string) => {
        return name.substring(0, 2).toUpperCase();
    };

    // Helper to determine text color based on bg color (simple heuristic)
    const getTextColor = (bgColorClass?: string) => {
        if (bgColorClass?.includes('white') || bgColorClass?.includes('yellow-100')) {
            return 'text-gray-900';
        }
        return 'text-white';
    };

    return (
        <div className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer border border-transparent hover:border-gray-700/50">
            <div className="flex items-center gap-4">
                {/* Avatar/Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${entry.color || 'bg-gray-700'} ${getTextColor(entry.color)}`}>
                    {entry.icon ? (
                        <img src={entry.icon} alt={entry.title} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        getInitials(entry.title)
                    )}
                </div>

                {/* Text Info */}
                <div>
                    <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">{entry.title}</h3>
                    <p className="text-sm text-gray-400">{entry.username}</p>
                </div>
            </div>

            {/* Password Visual (Dots) */}
            <div className="hidden sm:flex items-center gap-1 text-gray-500 font-mono text-xl tracking-widest">
                ••••••••••
            </div>
        </div>
    );
};

export default PasswordItem;
