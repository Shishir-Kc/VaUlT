import { useState, useEffect } from 'react';
import { X, Lock, Mail, Globe, Loader2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import type { CreateVaultItem, VaultItem } from '../services/vault';

interface AddEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CreateVaultItem) => Promise<void>;
    initialData?: VaultItem | null;
}

const AddEntryModal = ({ isOpen, onClose, onSave, initialData }: AddEntryModalProps) => {
    const [formData, setFormData] = useState<CreateVaultItem>({
        application: '',
        user_gmail: '',
        user_password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    application: initialData.application,
                    user_gmail: initialData.user_gmail,
                    user_password: initialData.user_password || '',
                });
            } else {
                setFormData({
                    application: '',
                    user_gmail: '',
                    user_password: '',
                });
            }
            setShowPassword(false);
        }
    }, [isOpen, initialData]);

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData({ ...formData, user_password: password });
        setShowPassword(true); // Show generated password
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Failed to save:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-enter">
            <div className="w-full max-w-md bg-[#1a2c24] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Entry' : 'Add New Entry'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Application</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Globe size={16} />
                            </div>
                            <input
                                type="text"
                                required
                                value={formData.application}
                                onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                                className="w-full bg-[#111c16] border border-white/10 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-600"
                                placeholder="e.g. Netflix"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email / Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Mail size={16} />
                            </div>
                            <input
                                type="email"
                                required
                                value={formData.user_gmail}
                                onChange={(e) => setFormData({ ...formData, user_gmail: e.target.value })}
                                className="w-full bg-[#111c16] border border-white/10 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-600"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                        <div className="relative flex gap-2">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.user_password}
                                    onChange={(e) => setFormData({ ...formData, user_password: e.target.value })}
                                    className="w-full bg-[#111c16] border border-white/10 text-white text-sm rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-600 font-mono"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={generatePassword}
                                className="px-3 bg-[#111c16] border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all"
                                title="Generate Password"
                            >
                                <RefreshCw size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold py-3.5 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Entry'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntryModal;
