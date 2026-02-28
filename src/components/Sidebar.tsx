'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Package, ShoppingCart, Car, Tag, BarChart3,
  Wallet, Truck, Settings, LogOut, X, ChevronLeft,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Produits', icon: Package },
  { href: '/dashboard/orders', label: 'Commandes', icon: ShoppingCart, badge: 0 },
  { href: '/dashboard/vehicles', label: 'Vehicules', icon: Car },
  { href: '/dashboard/promotions', label: 'Promotions', icon: Tag },
  { href: '/dashboard/abonnements' , label: ' Mon Abonnement' , icon: Package , badge: 0 } ,
  { href: '/dashboard/analytics', label: 'Analytiques', icon: BarChart3 },
  { href: '/dashboard/wallet', label: 'Portefeuille', icon: Wallet },
  { href: '/dashboard/basecentral', label: 'Base de Donnees Centrale', icon: Package },
  { href: '/dashboard/delivery', label: 'Livreurs', icon: Truck },
  { href: '/dashboard/settings', label: 'Boutique', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { logout } = await import('@/lib/api');
      await logout();
    } catch { /* ignore */ }
    router.push('/login');
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 z-50 h-full w-[260px] bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <span className="text-base font-bold text-brand-600">Akodessewa</span>
              <span className="text-[10px] block text-gray-400 -mt-1 font-medium">Portail Fournisseur</span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx('sidebar-link', active && 'active')}
              >
                <Icon size={20} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-100 flex-shrink-0">
          <div className="bg-gradient-to-br from-brand-50 to-red-50 rounded-xl p-4 mb-3">
            <p className="text-xs font-semibold text-brand-700 mb-1">Besoin d&apos;aide ?</p>
            <p className="text-[11px] text-gray-500 mb-3">Contactez notre support fournisseur.</p>
            <a href="https://wa.me/22890171212" target="_blank" rel="noreferrer" className="text-xs font-semibold text-brand-600 hover:underline">
              WhatsApp Support &rarr;
            </a>
          </div>
          <button onClick={handleLogout} className="sidebar-link text-gray-400 hover:text-red-500 w-full">
            <LogOut size={20} />
            <span>Deconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
