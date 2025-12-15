import { Search, Globe, MoreHorizontal, Copy, Edit, Trash2, Plus } from 'lucide-react';
import type { VaultItem } from '../services/vault';
import toast from 'react-hot-toast';
import CustomToast from './Toast';
import { useState, useRef, useEffect } from 'react';

interface VaultListProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    items: VaultItem[];
    onDelete: (id: string) => void;
    onEdit: (item: VaultItem) => void;
    onAddNew: () => void;
}

const VaultList = ({ searchQuery, setSearchQuery, items, onDelete, onEdit, onAddNew }: VaultListProps) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCopy = (text: string, type: 'email' | 'password') => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.custom((t) => (
                    <CustomToast
                        t={t}
                        title={`${type === 'email' ? 'Email' : 'Password'} Copied`}
                        message={`Copied ${type} to clipboard`}
                        type="success"
                    />
                ), { duration: 2000 });
            })
            .catch((err) => {
                console.error('Clipboard write failed:', err);
                toast.error('Failed to copy');
            });
        setOpenMenuId(null);
    };

    const filteredItems = items.filter(item =>
        item.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user_gmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 bg-[#11221a] p-8 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white">Your Vault</h1>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your vault"
                    className="w-full bg-[#1a2c24] border border-transparent text-gray-200 text-sm rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-500"
                />
            </div>

            {/* List */}
            <div className="space-y-2 pb-20">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <div className="w-16 h-16 bg-[#1a2c24] rounded-full flex items-center justify-center mb-6">
                            <Globe size={32} className="text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No vaults saved!</h3>
                        <p className="text-gray-400 mb-8 max-w-xs">Your vault is currently empty. Start securing your passwords today.</p>
                        <button
                            onClick={onAddNew}
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
                        >
                            <Plus size={20} />
                            Create your vault now!
                        </button>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No results found for "{searchQuery}"</p>
                    </div>
                ) : (
                    filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center justify-between p-4 rounded-xl hover:bg-[#1a2c24] transition-colors border border-transparent hover:border-white/5 relative"
                        >
                            <div
                                className="flex items-center gap-4 flex-1 cursor-pointer"
                                onClick={() => handleCopy(item.user_gmail, 'email')}
                            >
                                <div className="w-10 h-10 bg-[#1a2c24] group-hover:bg-[#111c16] rounded-full flex items-center justify-center text-gray-400 group-hover:text-green-400 transition-colors overflow-hidden flex-shrink-0">
                                    {item.application_icon ? (
                                        <img src={`http://127.0.0.1:8000/${item.application_icon}`} alt={item.application} className="w-full h-full object-cover" />
                                    ) : (
                                        <Globe size={18} />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-medium text-white truncate">{item.application}</h3>
                                    <p className="text-xs text-gray-500 truncate">{item.user_gmail}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {[1, 2, 3, 4, 5].map((dot) => (
                                        <div key={dot} className="w-1 h-1 bg-gray-600 rounded-full" />
                                    ))}
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === item.id ? null : item.id);
                                        }}
                                        className={`p-2 rounded-lg transition-colors ${openMenuId === item.id ? 'text-white bg-white/10' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <MoreHorizontal size={18} />
                                    </button>

                                    {openMenuId === item.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-0 top-full mt-2 w-48 bg-[#1a2c24] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-enter origin-top-right"
                                        >
                                            <div className="p-1">
                                                <button
                                                    onClick={() => handleCopy(item.user_password || '', 'password')}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    <Copy size={14} />
                                                    Copy Password
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        onEdit(item);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    <Edit size={14} />
                                                    Edit
                                                </button>
                                                <div className="h-px bg-white/5 my-1" />
                                                <button
                                                    onClick={() => {
                                                        onDelete(item.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VaultList;
