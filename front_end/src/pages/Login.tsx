import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, HelpCircle, Loader2 } from 'lucide-react';
import { login } from '../services/auth';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login(username, password);
            console.log('Login successful:', data);
            localStorage.setItem('token', data.access_token);
            navigate('/home');
        } catch (err) {
            console.error(err);
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#11221a] flex flex-col font-sans text-white relative overflow-hidden">
            {/* Background Gradient/Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-green-900/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-green-900/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <header className="flex justify-between items-center p-6 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                        <Lock size={18} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">VaUlT</span>
                </div>
                <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                    Need Help? <HelpCircle size={14} />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 z-10">
                <div className="w-full max-w-md bg-[#1a2c24] rounded-3xl p-8 shadow-2xl border border-white/5 backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Please enter your details to access your vault.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-3 rounded-xl text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-300 ml-1">Username or Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-400 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="e.g. user@vault.com"
                                    className="w-full bg-[#111c16] border border-gray-700 text-gray-200 text-sm rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-300 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#111c16] border border-gray-700 text-gray-200 text-sm rounded-xl py-3.5 pl-11 pr-11 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs font-medium text-green-500 hover:text-green-400 transition-colors">
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    Log In
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-6">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <button onClick={() => navigate('/signup')} className="text-green-500 font-bold hover:text-green-400 transition-colors">
                                Sign Up
                            </button>
                        </p>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-900 animate-pulse" />
                            256-bit Encryption
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-6 text-center z-10">
                <div className="flex justify-center gap-6 text-[10px] text-gray-500 font-medium">
                    <button className="hover:text-gray-300 transition-colors">Privacy Policy</button>
                    <button className="hover:text-gray-300 transition-colors">Terms of Service</button>
                </div>
            </footer>
        </div>
    );
};

export default Login;
