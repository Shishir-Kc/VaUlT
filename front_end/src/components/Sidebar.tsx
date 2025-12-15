import { LayoutGrid, Plus, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
    username: string;
    onAddNew: () => void;
    onLogout: () => void;
}

const Sidebar = ({ username, onAddNew, onLogout }: SidebarProps) => {
    return (
        <aside className="w-64 bg-[#111c16] border-r border-gray-800 flex flex-col h-screen p-4">
            {/* User Profile */}
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-800 font-bold">
                    {username.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                    <h3 className="text-sm font-bold text-white truncate">{username || 'user@email.com'}</h3>
                    <p className="text-xs text-gray-400 truncate">Password Manager</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a2c24] text-white rounded-xl transition-colors">
                    <LayoutGrid size={18} />
                    <span className="text-sm font-medium">All Items</span>
                </button>
            </nav>

            {/* Actions */}
            <div className="mt-auto space-y-4">
                <button
                    onClick={onAddNew}
                    className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <Plus size={18} />
                    Add New
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                    <Settings size={18} />
                    <span className="text-sm font-medium">Settings</span>
                </button>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Log Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
