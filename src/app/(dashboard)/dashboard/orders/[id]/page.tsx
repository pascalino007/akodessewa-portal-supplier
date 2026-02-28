'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, Truck, Package, MapPin, Phone, Mail, CreditCard, AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';
import type { Order } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'badge-warning', accepted: 'badge-info', processing: 'badge-info',
  shipped: 'badge-info', delivered: 'badge-success', cancelled: 'badge-danger', rejected: 'badge-danger',
};
const statusLabels: Record<string, string> = {
  pending: 'En attente', accepted: 'Acceptee', processing: 'En cours',
  shipped: 'Expediee', delivered: 'Livree', cancelled: 'Annulee', rejected: 'Refusee',
};

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemStatuses, setItemStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const { getOrder } = await import('@/lib/api');
        const o = await getOrder(String(params.id));
        const mapped: Order = {
          id: o.id, orderNumber: o.orderNumber || `#${String(o.id).slice(0, 8)}`,
          customer: {
            name: o.user?.firstName ? `${o.user.firstName} ${o.user.lastName || ''}` : 'Client',
            email: o.user?.email || '', phone: o.user?.phone || '',
            address: o.address?.address1 || '', city: o.address?.city || '', country: o.address?.country || '',
          },
          items: (o.items || []).map((item: any) => ({
            id: item.id, productId: item.productId || '', productName: item.product?.name || '',
            sku: item.product?.sku || '', quantity: item.quantity,
            price: Number(item.price), deliveryFee: Number(item.deliveryFee || 0),
            total: Number(item.total || item.price * item.quantity),
            status: item.status?.toLowerCase() || 'pending',
          })),
          subtotal: Number(o.subtotal || o.total), deliveryFee: Number(o.shippingFee || 0),
          tax: Number(o.tax || 0), total: Number(o.total),
          status: o.status?.toLowerCase() || 'pending',
          paymentMethod: o.payment?.method || 'mobile_money',
          paymentStatus: o.payment?.status?.toLowerCase() || 'pending',
          createdAt: o.createdAt || '', updatedAt: o.updatedAt || '', notes: o.notes || '',
        };
        setOrder(mapped);
        setItemStatuses(Object.fromEntries(mapped.items.map((item) => [item.id, item.status])));
      } catch (err) {
        console.error('Failed to load order:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-gray-300 border-t-brand-600 rounded-full animate-spin" /></div>;
  }

  if (!order) {
    return <div className="text-center py-20"><p className="text-gray-500">Commande introuvable.</p></div>;
  }

  const cancelItem = (itemId: string) => {
    setItemStatuses({ ...itemStatuses, [itemId]: 'cancelled' });
  };

  const confirmItem = (itemId: string) => {
    setItemStatuses({ ...itemStatuses, [itemId]: 'confirmed' });
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/orders" className="btn-ghost p-2"><ArrowLeft size={20} /></Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{order.orderNumber}</h1>
              <span className={`badge ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
            </div>
            <p className="page-subtitle">Passee le {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
        {order.status === 'pending' && (
          <div className="flex gap-2">
            <button className="btn-danger"><X size={16} /> Rejeter</button>
            <button className="btn-primary"><Check size={16} /> Accepter</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Items */}
        <div className="xl:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold text-gray-700">Articles commandes ({order.items.length})</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {order.items.map((item) => {
                const currentStatus = itemStatuses[item.id] || item.status;
                return (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package size={22} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{item.productName}</p>
                      <p className="text-xs text-gray-400">SKU: {item.sku} &middot; Qte: {item.quantity}</p>
                      <p className="text-xs text-gray-400">Livraison: ${item.deliveryFee.toFixed(2)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-gray-400">${item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1">
                      {currentStatus === 'pending' && (
                        <>
                          <button onClick={() => confirmItem(item.id)} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors" title="Confirmer">
                            <Check size={16} />
                          </button>
                          <button onClick={() => cancelItem(item.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors" title="Annuler">
                            <X size={16} />
                          </button>
                        </>
                      )}
                      {currentStatus === 'confirmed' && (
                        <span className="badge badge-success">Confirme</span>
                      )}
                      {currentStatus === 'cancelled' && (
                        <span className="badge badge-danger">Annule</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Totals */}
          <div className="card">
            <div className="card-body">
              <div className="space-y-2 max-w-xs ml-auto">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Sous-total</span><span>${order.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Frais de livraison</span><span>${order.deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Taxe (20%)</span><span>${order.tax.toFixed(2)}</span></div>
                <hr className="border-gray-100" />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Notes du client</h3>
              </div>
              <div className="card-body">
                <p className="text-sm text-gray-600 italic">&ldquo;{order.notes}&rdquo;</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold text-gray-700">Client</h3>
            </div>
            <div className="card-body space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {order.customer.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{order.customer.name}</p>
                  <p className="text-xs text-gray-400">{order.customer.city}, {order.customer.country}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400" /> {order.customer.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400" /> {order.customer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-gray-400" /> {order.customer.address}
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold text-gray-700">Paiement</h3>
            </div>
            <div className="card-body space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Methode</span>
                <span className="font-medium">{order.paymentMethod === 'mobile_money' ? 'Mobile Money' : order.paymentMethod === 'card' ? 'Carte bancaire' : 'A la livraison'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Statut</span>
                <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : order.paymentStatus === 'refunded' ? 'badge-danger' : 'badge-warning'}`}>
                  {order.paymentStatus === 'paid' ? 'Paye' : order.paymentStatus === 'refunded' ? 'Rembourse' : 'En attente'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {order.status === 'accepted' && (
            <div className="card">
              <div className="card-body">
                <button className="btn-primary w-full"><Truck size={16} /> Marquer comme expediee</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
