'use client';

import { useState, useEffect } from 'react';
import { Plus, Percent, DollarSign, Calendar, MoreVertical, Edit, Trash2, Pause, Play } from 'lucide-react';
import type { Promotion } from '@/types';

const statusColors: Record<string, string> = {
  active: 'badge-success', scheduled: 'badge-info', expired: 'badge-gray', paused: 'badge-warning',
};
const statusLabels: Record<string, string> = {
  active: 'Active', scheduled: 'Planifiee', expired: 'Expiree', paused: 'En pause',
};

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { getMyPromotions } = await import('@/lib/api');
        const res = await getMyPromotions();
        const items = (res.data || res || []).map((p: any) => ({
          id: p.id, name: p.name || '', description: p.description || '',
          type: p.type || 'percentage', value: Number(p.value) || 0,
          startDate: p.startDate?.split('T')[0] || '', endDate: p.endDate?.split('T')[0] || '',
          status: p.status?.toLowerCase() || 'active',
          minOrderAmount: Number(p.minOrderAmount || 0), maxUses: Number(p.maxUses || 100),
          usedCount: Number(p.usedCount || 0), applicableProducts: [],
        }));
        setPromotions(items);
      } catch (err) {
        console.error('Failed to load promotions:', err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Promotions</h1>
          <p className="page-subtitle">Creez et gerez vos offres speciales</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <Plus size={18} /> Nouvelle promotion
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Creer une promotion</h3></div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="form-label">Nom *</label><input className="form-input" placeholder="Ex: Soldes de fevrier" /></div>
              <div><label className="form-label">Description</label><input className="form-input" placeholder="Ex: -20% sur les filtres" /></div>
              <div><label className="form-label">Type *</label><select className="form-input"><option value="percentage">Pourcentage (%)</option><option value="fixed">Montant fixe ($)</option></select></div>
              <div><label className="form-label">Valeur *</label><input type="number" className="form-input" placeholder="15" /></div>
              <div><label className="form-label">Date debut</label><input type="date" className="form-input" /></div>
              <div><label className="form-label">Date fin</label><input type="date" className="form-input" /></div>
              <div><label className="form-label">Commande min ($)</label><input type="number" className="form-input" placeholder="0" /></div>
              <div><label className="form-label">Utilisations max</label><input type="number" className="form-input" placeholder="100" /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="btn-secondary">Annuler</button>
              <button className="btn-primary">Creer</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {promotions.map((promo) => (
          <div key={promo.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-2 ${promo.status === 'active' ? 'bg-emerald-500' : promo.status === 'scheduled' ? 'bg-blue-500' : promo.status === 'expired' ? 'bg-gray-300' : 'bg-amber-500'}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${promo.type === 'percentage' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {promo.type === 'percentage' ? <Percent size={20} /> : <DollarSign size={20} />}
                  </div>
                  <div><h3 className="font-semibold text-gray-800">{promo.name}</h3><p className="text-xs text-gray-400">{promo.description}</p></div>
                </div>
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === promo.id ? null : promo.id)} className="btn-ghost p-1"><MoreVertical size={16} /></button>
                  {menuOpen === promo.id && (
                    <div className="absolute right-0 top-8 w-40 card shadow-xl z-20 py-1">
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full text-left"><Edit size={14} /> Modifier</button>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full text-left">{promo.status === 'active' ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Activer</>}</button>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left"><Trash2 size={14} /> Supprimer</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">{promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`}</span>
                <span className={`badge ${statusColors[promo.status]}`}>{statusLabels[promo.status]}</span>
              </div>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center justify-between"><span className="flex items-center gap-1"><Calendar size={12} /> Periode</span><span>{promo.startDate} - {promo.endDate}</span></div>
                <div className="flex items-center justify-between"><span>Utilisations</span><span>{promo.usedCount} / {promo.maxUses}</span></div>
              </div>
              <div className="mt-3 bg-gray-100 rounded-full h-1.5">
                <div className="bg-brand-600 h-1.5 rounded-full transition-all" style={{ width: `${(promo.usedCount / promo.maxUses) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
