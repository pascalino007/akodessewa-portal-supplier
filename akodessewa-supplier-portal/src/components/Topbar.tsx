'use client';

import { useState, useEffect } from 'react';
import { Bell, Menu, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { getStoredUser, getMyShop, logout } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface TopbarProps {
  onMenuClick: () => void;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  shop?: {
    name?: string;
  };
}

interface ShopData {
  name?: string;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [shop, setShop] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Get user from storage
      const storedUser = getStoredUser();
      setUser(storedUser);
      
      // Get shop from API
      try {
        const shopData = await getMyShop();
        setShop(shopData);
      } catch (err) {
        console.error('Failed to load shop:', err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (shop?.name) {
      return shop.name.slice(0, 2).toUpperCase();
    }
    return 'S';
  };

  const getShopName = () => {
    return shop?.name || user?.shop?.name || 'Ma Boutique';
  };

  const getUserName = () => {
    if (user?.firstName) {
      return `${user.firstName} ${user.lastName || ''}`.trim();
    }
    return 'Fournisseur';
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden btn-ghost p-2">
          <Menu size={22} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-80">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher produits, commandes..."
            className="bg-transparent text-sm flex-1 outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="relative btn-ghost p-2 rounded-lg"
          >
            <Bell size={20} />
            {/* Notification dot - only show if we have unread */}
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 card shadow-xl z-50">
              <div className="card-header">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <p className="text-sm text-gray-400 text-center py-8">Aucune notification</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">{getInitials()}</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700 leading-tight">{getShopName()}</p>
              <p className="text-[11px] text-gray-400 leading-tight">{getUserName()}</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-12 w-52 card shadow-xl z-50 py-1">
              <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                <User size={16} /> Mon profil
              </a>
              <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                <Settings size={16} /> Parametres
              </a>
              <hr className="my-1 border-gray-100" />
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left">
                <LogOut size={16} /> Deconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
