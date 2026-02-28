'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';

export default function NewVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { createVehicleListing } = await import('@/lib/api');
      const fd = new FormData(e.target as HTMLFormElement);
      await createVehicleListing({
        type: fd.get('type'), make: fd.get('make'), model: fd.get('model'),
        year: Number(fd.get('year')), mileage: Number(fd.get('mileage')),
        transmission: fd.get('transmission'), fuelType: fd.get('fuelType'),
        color: fd.get('color'), description: fd.get('description'),
        price: Number(fd.get('price')), condition: fd.get('condition'),
        contactPhone: fd.get('contactPhone'),
      });
      router.push('/dashboard/vehicles');
    } catch (err) {
      console.error('Failed to create vehicle listing:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/vehicles" className="btn-ghost p-2"><ArrowLeft size={20} /></Link>
          <div>
            <h1 className="page-title">Publier un vehicule</h1>
            <p className="page-subtitle">Mettez en vente une voiture ou moto d&apos;occasion</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Informations</h3></div>
              <div className="card-body space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">Type *</label><select name="type" className="form-input"><option value="car">Voiture</option><option value="moto">Moto</option></select></div>
                  <div><label className="form-label">Marque *</label><input name="make" className="form-input" placeholder="Toyota" required /></div>
                  <div><label className="form-label">Modele *</label><input name="model" className="form-input" placeholder="Corolla" required /></div>
                  <div><label className="form-label">Annee *</label><input name="year" type="number" className="form-input" placeholder="2020" required /></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div><label className="form-label">Km *</label><input name="mileage" type="number" className="form-input" placeholder="45000" required /></div>
                  <div><label className="form-label">Transmission</label><select name="transmission" className="form-input"><option value="automatic">Automatique</option><option value="manual">Manuelle</option></select></div>
                  <div><label className="form-label">Carburant</label><select name="fuelType" className="form-input"><option value="gasoline">Essence</option><option value="diesel">Diesel</option><option value="electric">Electrique</option></select></div>
                  <div><label className="form-label">Couleur</label><input name="color" className="form-input" placeholder="Blanc" /></div>
                </div>
                <div><label className="form-label">Description</label><textarea name="description" className="form-input min-h-[120px] resize-none" placeholder="Decrivez le vehicule..." /></div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Photos</h3></div>
              <div className="card-body">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-brand-600 transition-colors cursor-pointer">
                  <Upload size={28} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">Ajoutez jusqu&apos;a 10 photos</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG max 5MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Prix et contact</h3></div>
              <div className="card-body space-y-4">
                <div><label className="form-label">Prix (USD) *</label><input name="price" type="number" className="form-input" placeholder="8500" required /></div>
                <div className="flex items-center gap-2"><input type="checkbox" id="neg" className="rounded border-gray-300 text-brand-600" /><label htmlFor="neg" className="text-sm text-gray-600">Negociable</label></div>
                <div><label className="form-label">Etat</label><select name="condition" className="form-input"><option value="excellent">Excellent</option><option value="good">Bon</option><option value="fair">Correct</option><option value="needs-repair">A reparer</option></select></div>
                <div><label className="form-label">WhatsApp *</label><input name="contactPhone" className="form-input" placeholder="+228 90..." required /></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> Publier</>}
              </button>
              <Link href="/dashboard/vehicles" className="btn-secondary w-full justify-center">Annuler</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
