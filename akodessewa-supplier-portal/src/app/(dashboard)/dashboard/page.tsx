'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown,
  ArrowRight, Eye, MoreHorizontal, Crown, Zap, Clock, CalendarDays,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import type { DashboardStats } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'badge-warning',
  accepted: 'badge-info',
  processing: 'badge-info',
  shipped: 'badge-info',
  delivered: 'badge-success',
  cancelled: 'badge-danger',
  rejected: 'badge-danger',
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  accepted: 'Acceptee',
  processing: 'En cours',
  shipped: 'Expediee',
  delivered: 'Livree',
  cancelled: 'Annulee',
  rejected: 'Refusee',
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { getSupplierDashboard, getMyOrders, getMyProducts } = await import('@/lib/api');
        const [dashboard, ordersRes, productsRes] = await Promise.all([
          getSupplierDashboard().catch(() => null),
          getMyOrders({ limit: '5' }).catch(() => ({ data: [] })),
          getMyProducts({ limit: '4', sortBy: 'sales' }).catch(() => ({ data: [] })),
        ]);
        const recentOrders = (ordersRes?.data || []).map((o: any) => ({
          id: o.id, orderNumber: o.orderNumber || `#${String(o.id).slice(0, 8)}`,
          customer: { name: o.user?.firstName ? `${o.user.firstName} ${o.user.lastName || ''}` : 'Client', email: '', phone: '', address: '', city: '', country: '' },
          items: [], subtotal: 0, deliveryFee: 0, tax: 0,
          total: Number(o.total) || 0, status: o.status?.toLowerCase() || 'pending',
          paymentMethod: 'mobile_money' as const, paymentStatus: 'pending' as const,
          createdAt: o.createdAt || '', updatedAt: o.updatedAt || '', notes: '',
        }));
        const topProducts = (productsRes?.data || []).map((p: any) => ({
          id: p.id, name: p.name || '', sku: '', slug: '', description: '', price: Number(p.price) || 0,
          compareAtPrice: null, stock: 'in-stock' as const, quantity: 0, category: '', subcategory: '',
          brand: '', partNumber: '', condition: 'new' as const, weight: 0, images: [],
          compatibleVehicles: [], attributes: [], status: 'published' as const,
          createdAt: '', updatedAt: '', views: p.viewCount || 0, sales: p.salesCount || 0,
        }));
        setStats({
          totalRevenue: dashboard?.totalRevenue || 0,
          totalOrders: dashboard?.totalOrders || 0,
          totalProducts: dashboard?.totalProducts || 0,
          totalCustomers: dashboard?.totalCustomers || 0,
          revenueChange: dashboard?.revenueChange || 0,
          ordersChange: dashboard?.ordersChange || 0,
          productsChange: dashboard?.productsChange || 0,
          customersChange: dashboard?.customersChange || 0,
          recentOrders,
          topProducts,
          salesChart: dashboard?.salesChart || [
            { date: 'Lun', revenue: 0, orders: 0 }, { date: 'Mar', revenue: 0, orders: 0 },
            { date: 'Mer', revenue: 0, orders: 0 }, { date: 'Jeu', revenue: 0, orders: 0 },
            { date: 'Ven', revenue: 0, orders: 0 }, { date: 'Sam', revenue: 0, orders: 0 },
            { date: 'Dim', revenue: 0, orders: 0 },
          ],
        });
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Revenu Total', value: `${stats.totalRevenue.toLocaleString()} XOF`, change: stats.revenueChange, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Commandes', value: stats.totalOrders, change: stats.ordersChange, icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
    { label: 'Produits', value: stats.totalProducts, change: stats.productsChange, icon: Package, color: 'text-purple-600 bg-purple-50' },
    { label: 'Clients', value: stats.totalCustomers, change: stats.customersChange, icon: Users, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tableau de bord</h1>
          <p className="page-subtitle">Bienvenue. Voici un apercu de votre activite.</p>
        </div>
        <Link href="/dashboard/products/new" className="btn-primary">
          <Package size={18} /> Ajouter un produit
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          const up = s.change > 0;
          return (
            <div key={i} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                  <Icon size={20} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {up ? '+' : ''}{s.change}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Revenu cette semaine</h3>
            <button className="btn-ghost p-1"><MoreHorizontal size={18} /></button>
          </div>
          <div className="card-body pt-2">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={stats.salesChart}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} formatter={(value: number) => [`$${value}`, 'Revenu']} />
                <Area type="monotone" dataKey="revenue" stroke="#d32f2f" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Commandes</h3>
          </div>
          <div className="card-body pt-2">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.salesChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                <Bar dataKey="orders" fill="#d32f2f" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent orders + Top products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Commandes recentes</h3>
            <Link href="/dashboard/orders" className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Commande</th><th>Client</th><th>Total</th><th>Statut</th><th>Date</th></tr>
              </thead>
              <tbody>
                {stats.recentOrders.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-gray-400 py-8">Aucune commande</td></tr>
                ) : stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td><Link href={`/dashboard/orders/${order.id}`} className="font-semibold text-brand-600 hover:underline">{order.orderNumber}</Link></td>
                    <td className="text-gray-600">{order.customer.name}</td>
                    <td className="font-semibold">{order.total.toFixed(2)} XOF</td>
                    <td><span className={`badge ${statusColors[order.status] || 'badge-info'}`}>{statusLabels[order.status] || order.status}</span></td>
                    <td className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Meilleurs produits</h3>
            <Link href="/dashboard/products" className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="card-body space-y-4">
            {stats.topProducts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Aucun produit</p>
            ) : stats.topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package size={18} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.sales} ventes &middot; <Eye size={10} className="inline" /> {product.views}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">{product.price.toFixed(2)} XOF</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
