'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Eye } from 'lucide-react';
import type { Order } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'badge-warning', accepted: 'badge-info', processing: 'badge-info',
  shipped: 'badge-info', delivered: 'badge-success', cancelled: 'badge-danger', rejected: 'badge-danger',
};
const statusLabels: Record<string, string> = {
  pending: 'En attente', accepted: 'Acceptee', processing: 'En cours',
  shipped: 'Expediee', delivered: 'Livree', cancelled: 'Annulee', rejected: 'Refusee',
};
const paymentLabels: Record<string, string> = {
  mobile_money: 'Mobile Money', card: 'Carte bancaire', cash_on_delivery: 'A la livraison',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const load = async () => {
      try {
        const { getMyOrders } = await import('@/lib/api');
        const res = await getMyOrders();
        const items = (res.data || res || []).map((o: any) => ({
          id: o.id, orderNumber: o.orderNumber || `#${String(o.id).slice(0, 8)}`,
          customer: {
            name: o.user?.firstName ? `${o.user.firstName} ${o.user.lastName || ''}` : 'Client',
            email: o.user?.email || '', phone: o.user?.phone || '',
            address: '', city: o.address?.city || '', country: o.address?.country || '',
          },
          items: (o.items || []).map((item: any) => ({
            productId: item.productId || item.product?.id || '', productName: item.product?.name || '',
            quantity: item.quantity, unitPrice: Number(item.price), total: Number(item.total || item.price * item.quantity),
          })),
          subtotal: Number(o.subtotal || o.total), deliveryFee: Number(o.shippingFee || 0), tax: Number(o.tax || 0),
          total: Number(o.total), status: o.status?.toLowerCase() || 'pending',
          paymentMethod: o.payment?.method || 'mobile_money',
          paymentStatus: o.payment?.status?.toLowerCase() || 'pending',
          createdAt: o.createdAt || '', updatedAt: o.updatedAt || '', notes: o.notes || '',
        }));
        setOrders(items);
      } catch (err) {
        console.error('Failed to load orders:', err);
      }
    };
    load();
  }, []);

  const filtered = orders.filter((o) => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Commandes</h1>
          <p className="page-subtitle">{orders.length} commandes - {pendingCount} en attente</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'En attente', count: orders.filter((o) => o.status === 'pending').length, cls: 'text-amber-600 bg-amber-50' },
          { label: 'En cours', count: orders.filter((o) => ['accepted', 'processing', 'shipped'].includes(o.status)).length, cls: 'text-blue-600 bg-blue-50' },
          { label: 'Livrees', count: orders.filter((o) => o.status === 'delivered').length, cls: 'text-emerald-600 bg-emerald-50' },
          { label: 'Annulees', count: orders.filter((o) => ['cancelled', 'rejected'].includes(o.status)).length, cls: 'text-red-600 bg-red-50' },
        ].map((s, i) => (
          <div key={i} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.cls}`}>
              <span className="text-lg font-bold">{s.count}</span>
            </div>
            <span className="text-sm text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher commande ou client..." className="form-input pl-10" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-input w-auto">
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="accepted">Acceptee</option>
            <option value="shipped">Expediee</option>
            <option value="delivered">Livree</option>
            <option value="cancelled">Annulee</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Commande</th>
                <th>Client</th>
                <th>Articles</th>
                <th>Total</th>
                <th>Paiement</th>
                <th>Statut</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link href={`/dashboard/orders/${order.id}`} className="font-semibold text-brand-600 hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{order.customer.name}</p>
                      <p className="text-xs text-gray-400">{order.customer.city}, {order.customer.country}</p>
                    </div>
                  </td>
                  <td className="text-gray-600">{order.items.length} article{order.items.length > 1 ? 's' : ''}</td>
                  <td className="font-semibold">${order.total.toFixed(2)}</td>
                  <td className="text-xs text-gray-500">{paymentLabels[order.paymentMethod]}</td>
                  <td><span className={`badge ${statusColors[order.status]}`}>{statusLabels[order.status]}</span></td>
                  <td className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <Link href={`/dashboard/orders/${order.id}`} className="btn-ghost p-1.5">
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
