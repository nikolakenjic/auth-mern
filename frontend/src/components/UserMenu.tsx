import queryClient from '@/config/queryClient';
import { logout } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { LogOut, Settings, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-0"
      >
        <UserCircle className="w-10 h-10" />
      </button>
      {isOpen && (
        <div className="absolute right-10 top-10 bg-gray-300 border text-black rounded-lg shadow-md">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left"
          >
            <UserCircle size={18} /> Profile
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left"
          >
            <Settings size={18} /> Settings
          </button>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
