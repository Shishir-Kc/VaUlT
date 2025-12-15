import { Check, X, AlertCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Toast } from 'react-hot-toast';

export type ToastType = 'success' | 'error' | 'info';

interface CustomToastProps {
    t: Toast;
    title: string;
    message: string;
    type?: ToastType;
    actionLabel?: string;
    onAction?: () => void;
}

const CustomToast = ({ t, title, message, type = 'success', actionLabel, onAction }: CustomToastProps) => {
    const isVisible = t.visible;

    const styles = {
        success: {
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            border: 'border-emerald-500/20',
            progress: 'bg-emerald-500',
            icon: Check
        },
        error: {
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-400',
            border: 'border-red-500/20',
            progress: 'bg-red-500',
            icon: AlertCircle
        },
        info: {
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            border: 'border-blue-500/20',
            progress: 'bg-blue-500',
            icon: Info
        }
    };

    const currentStyle = styles[type];
    const Icon = currentStyle.icon;

    return (
        <div
            className={`${isVisible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-[#0f1914]/80 backdrop-blur-xl shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-white/10 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-900/20`}
        >
            {/* Animated Progress Bar */}
            <div
                className={`absolute bottom-0 left-0 h-1 ${currentStyle.progress} transition-all duration-[2000ms] ease-linear`}
                style={{ width: isVisible ? '0%' : '100%' }}
            />

            <div className="flex-1 w-0 p-4">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 pt-0.5">
                        <div className={`h-10 w-10 rounded-full ${currentStyle.iconBg} flex items-center justify-center animate-checkmark ring-1 ring-inset ${currentStyle.border}`}>
                            <Icon className={`h-5 w-5 ${currentStyle.iconColor}`} />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white leading-5">
                            {title}
                        </p>
                        <p className="mt-1 text-xs text-gray-400 leading-4">
                            {message}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex border-l border-white/5">
                {actionLabel && onAction && (
                    <button
                        onClick={() => {
                            onAction();
                            toast.dismiss(t.id);
                        }}
                        className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-white/5 focus:outline-none transition-colors"
                    >
                        {actionLabel}
                    </button>
                )}
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default CustomToast;
