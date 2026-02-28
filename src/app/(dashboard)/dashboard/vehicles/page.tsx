'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Car, Eye, MoreVertical, Edit, Trash2, MessageCircle } from 'lucide-react';
import type { UsedVehicle } from '@/types';

const statusBg: Record<string, string> = { active: 'badge-success', sold: 'badge-gray', paused: 'badge-warning' };
const statusTxt: Record<string, string> = { active: 'Active', sold: 'Vendu', paused: 'En pause' };

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<UsedVehicle[]>([]);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { getMyVehicles } = await import('@/lib/api');
        const res = await getMyVehicles();
        const items = (res.data || res || []).map((v: any) => ({
          id: v.id, type: v.type || 'car', make: v.make || '', model: v.model || '',
          year: v.year || 0, mileage: v.mileage || 0, transmission: v.transmission || 'manual',
          fuelType: v.fuelType || 'gasoline', color: v.color || '', condition: v.condition || 'good',
          price: Number(v.price) || 0, description: v.description || '',
          images: (v.images || []).map((img: any) => typeof img === 'string' ? img : img.url || ''),
          status: v.status || 'active', views: v.viewCount || 0, inquiries: v.inquiryCount || 0,
          createdAt: v.createdAt || '',
        }));
        setVehicles(items);
      } catch (err) {
        console.error('Failed to load vehicles:', err);
      }
    };
    load();
  }, []);

  const list = vehicles.filter((v) =>
    `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Vehicules d&apos;occasion</h1>
          <p className="page-subtitle">Publiez des voitures et motos a vendre</p>
        </div>
        <Link href="/dashboard/vehicles/new" className="btn-primary"><Plus size={18} /> Publier</Link>
      </div>

      <div className="card mb-6 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="form-input pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((v) => (
          <div key={v.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <Car size={48} className="text-gray-300" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`badge ${statusBg[v.status]}`}>{statusTxt[v.status]}</span>
                <span className="badge badge-info">{v.type === 'car' ? 'Voiture' : 'Moto'}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{v.make} {v.model}</h3>
                  <p className="text-xs text-gray-400">{v.year} - {v.mileage.toLocaleString()} km - {v.transmission}</p>
                </div>
                <p className="text-lg font-bold text-brand-600">${v.price.toLocaleString()}</p>
              </div>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{v.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                <div className="flex gap-3">
                  <span><Eye size={12} className="inline mr-1" />{v.views}</span>
                  <span><MessageCircle size={12} className="inline mr-1" />{v.inquiries}</span>
                </div>
                <span>{v.color} - {v.condition}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
