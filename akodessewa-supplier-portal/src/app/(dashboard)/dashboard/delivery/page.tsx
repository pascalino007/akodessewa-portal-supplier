'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Truck, Star, Phone, Mail, MoreVertical, Edit, Trash2, UserX, UserCheck } from 'lucide-react';
import type { DeliveryGuy } from '@/types';

const statusColors: Record<string, string> = { active: 'badge-success', inactive: 'badge-gray', suspended: 'badge-danger' };
const statusLabels: Record<string, string> = { active: 'Actif', inactive: 'Inactif', suspended: 'Suspendu' };
const vehicleLabels: Record<string, string> = { motorcycle: 'Moto', car: 'Voiture', bicycle: 'Velo' };

export default function DeliveryPage() {
  const [deliveryGuys, setDeliveryGuys] = useState<DeliveryGuy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { getMyDeliveryPersonnel } = await import('@/lib/api');
        const res = await getMyDeliveryPersonnel();
        const items = (res.data || res || []).map((d: any) => ({
          id: d.id, name: d.name || `${d.firstName || ''} ${d.lastName || ''}`.trim(),
          phone: d.phone || '', email: d.email || '',
          vehicleType: d.vehicleType || 'motorcycle', licensePlate: d.licensePlate || '',
          status: d.status?.toLowerCase() || 'active',
          totalDeliveries: d.totalDeliveries || 0, rating: Number(d.rating) || 0,
          createdAt: d.createdAt || '',
        }));
        setDeliveryGuys(items);
      } catch (err) {
        console.error('Failed to load delivery personnel:', err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Livreurs</h1>
          <p className="page-subtitle">Enregistrez et gerez votre equipe de livraison</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary"><Plus size={18} /> Ajouter un livreur</button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Nouveau livreur</h3></div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="form-label">Nom complet *</label><input className="form-input" placeholder="Nom du livreur" /></div>
              <div><label className="form-label">Telephone *</label><input className="form-input" placeholder="+228 90 XX XX XX" /></div>
              <div><label className="form-label">Email</label><input type="email" className="form-input" placeholder="email@example.com" /></div>
              <div>
                <label className="form-label">Type de vehicule *</label>
                <select className="form-input">
                  <option value="motorcycle">Moto</option>
                  <option value="car">Voiture</option>
                  <option value="bicycle">Velo</option>
                </select>
              </div>
              <div><label className="form-label">Plaque d&apos;immatriculation</label><input className="form-input" placeholder="TG 1234 AB" /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="btn-secondary">Annuler</button>
              <button className="btn-primary">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span className="text-lg font-bold">{deliveryGuys.filter((d) => d.status === 'active').length}</span>
          </div>
          <span className="text-sm text-gray-600">Actifs</span>
        </div>
        <div className="stat-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <span className="text-lg font-bold">{deliveryGuys.reduce((a, d) => a + d.totalDeliveries, 0)}</span>
          </div>
          <span className="text-sm text-gray-600">Total livraisons</span>
        </div>
        <div className="stat-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star size={18} />
          </div>
          <span className="text-sm text-gray-600">Note moy. {(deliveryGuys.length ? (deliveryGuys.reduce((a, d) => a + d.rating, 0) / deliveryGuys.length).toFixed(1) : '0')}</span>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {deliveryGuys.map((guy) => (
          <div key={guy.id} className="card p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {guy.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{guy.name}</h3>
                  <span className={`badge ${statusColors[guy.status]}`}>{statusLabels[guy.status]}</span>
                </div>
              </div>
              <div className="relative">
                <button onClick={() => setMenuOpen(menuOpen === guy.id ? null : guy.id)} className="btn-ghost p-1"><MoreVertical size={16} /></button>
                {menuOpen === guy.id && (
                  <div className="absolute right-0 top-8 w-44 card shadow-xl z-20 py-1">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full text-left"><Edit size={14} /> Modifier</button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full text-left">
                      {guy.status === 'active' ? <><UserX size={14} /> Desactiver</> : <><UserCheck size={14} /> Activer</>}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left"><Trash2 size={14} /> Supprimer</button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {guy.phone}</div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {guy.email}</div>
              <div className="flex items-center gap-2"><Truck size={14} className="text-gray-400" /> {vehicleLabels[guy.vehicleType]} - {guy.licensePlate}</div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400">
                <span className="font-semibold text-gray-700">{guy.totalDeliveries}</span> livraisons
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="font-semibold text-gray-700">{guy.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
