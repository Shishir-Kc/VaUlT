import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import VaultList from '../components/VaultList';
import AddEntryModal from '../components/AddEntryModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { getVaultItems, addVaultItem, deleteVaultItem, updateVaultItem } from '../services/vault';
import type { VaultItem, CreateVaultItem } from '../services/vault';
import { getUserInfo } from '../services/auth';
import toast from 'react-hot-toast';
import CustomToast from '../components/Toast';


const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [items, setItems] = useState<VaultItem[]>([]);
    const [editingItem, setEditingItem] = useState<VaultItem | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchItems = async () => {
        try {
            const data = await getVaultItems();
            setItems(data);
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    };

    const handleSaveEntry = async (data: CreateVaultItem) => {
        if (editingItem) {
            await updateVaultItem(editingItem.id, data);
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    title="Entry Updated"
                    message={`Credentials for ${data.application} updated`}
                    type="success"
                />
            ), { duration: 2000 });
        } else {
            await addVaultItem(data);
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    title="Password Saved"
                    message={`Credentials for ${data.application} saved`}
                    type="success"
                    actionLabel="View Item"
                    onAction={() => {
                        console.log('View item clicked');
                    }}
                />
            ), { duration: 2000 });
        }
        fetchItems();
        setEditingItem(null);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);
        try {
            await deleteVaultItem(itemToDelete);
            toast.custom((t) => (
                <CustomToast
                    t={t}
                    title="Item Deleted"
                    message="The vault item has been removed"
                    type="success"
                />
            ), { duration: 2000 });
            fetchItems();
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error('Failed to delete item:', error);
            toast.error('Failed to delete item');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = (item: VaultItem) => {
        setEditingItem(item);
        setIsAddModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const userInfo = await getUserInfo();
                setUsername(userInfo.username);
                setEmail(userInfo.email);
                fetchItems();
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="flex h-screen bg-[#11221a] overflow-hidden font-sans">
            <Sidebar username={email || username} onAddNew={() => {
                setEditingItem(null);
                setIsAddModalOpen(true);
            }} onLogout={handleLogout} />
            <VaultList
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                items={items}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}
                onAddNew={() => {
                    setEditingItem(null);
                    setIsAddModalOpen(true);
                }}
            />
            <AddEntryModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                }}
                onSave={handleSaveEntry}
                initialData={editingItem}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setItemToDelete(null);
                }}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default Home;
