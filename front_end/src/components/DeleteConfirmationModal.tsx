import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    isLoading: boolean;
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading }: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-enter">
            <div className="w-full max-w-sm bg-[#1a2c24] rounded-2xl shadow-2xl border border-red-500/20 overflow-hidden">
                <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Delete Password?</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Your password will be deleted permanently! This action cannot be undone.
                    </p>
                </div>

                <div className="flex border-t border-white/5">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 py-4 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <div className="w-px bg-white/5" />
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 py-4 text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
