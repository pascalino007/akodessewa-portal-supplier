'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, X, Upload, Car } from 'lucide-react';

const categories = ['Freinage', 'Moteur', 'Suspension', 'Allumage', 'Eclairage', 'Carrosserie', 'Transmission', 'Echappement', 'Climatisation', 'Electricite'];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([{ make: '', model: '', yearFrom: '', yearTo: '', engine: '' }]);
  const [attributes, setAttributes] = useState([{ name: '', value: '' }]);

  const addVehicle = () => setVehicles([...vehicles, { make: '', model: '', yearFrom: '', yearTo: '', engine: '' }]);
  const removeVehicle = (i: number) => setVehicles(vehicles.filter((_, idx) => idx !== i));
  const addAttribute = () => setAttributes([...attributes, { name: '', value: '' }]);
  const removeAttribute = (i: number) => setAttributes(attributes.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { createProduct } = await import('@/lib/api');
      const fd = new FormData(e.target as HTMLFormElement);
      await createProduct({
        name: fd.get('name'), sku: fd.get('sku'), partNumber: fd.get('partNumber'),
        description: fd.get('description'), price: Number(fd.get('price')),
        compareAtPrice: fd.get('compareAtPrice') ? Number(fd.get('compareAtPrice')) : null,
        stockQuantity: Number(fd.get('quantity')), weight: Number(fd.get('weight') || 0),
        status: fd.get('status'), stock: fd.get('stock'), condition: fd.get('condition'),
        category: fd.get('category'), brand: fd.get('brand'),
      });
      router.push('/dashboard/products');
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/products" className="btn-ghost p-2"><ArrowLeft size={20} /></Link>
          <div>
            <h1 className="page-title">Nouveau produit</h1>
            <p className="page-subtitle">Ajoutez une nouvelle piece a votre catalogue</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main info */}
          <div className="xl:col-span-2 space-y-6">
            {/* Basic info */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Informations generales</h3>
              </div>
              <div className="card-body space-y-4">
                <div>
                  <label className="form-label">Nom du produit *</label>
                  <input name="name" className="form-input" placeholder="Ex: Plaquettes de frein avant Bosch" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Reference / SKU *</label>
                    <input name="sku" className="form-input" placeholder="Ex: BRK-001" required />
                  </div>
                  <div>
                    <label className="form-label">Numero de piece OEM</label>
                    <input name="partNumber" className="form-input" placeholder="Ex: BP2345" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-input min-h-[120px] resize-none" placeholder="Decrivez le produit en detail..." />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Prix et stock</h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="form-label">Prix (USD) *</label>
                    <input name="price" type="number" step="0.01" className="form-input" placeholder="45.00" required />
                  </div>
                  <div>
                    <label className="form-label">Ancien prix</label>
                    <input name="compareAtPrice" type="number" step="0.01" className="form-input" placeholder="65.00" />
                  </div>
                  <div>
                    <label className="form-label">Quantite *</label>
                    <input name="quantity" type="number" className="form-input" placeholder="100" required />
                  </div>
                  <div>
                    <label className="form-label">Poids (kg)</label>
                    <input name="weight" type="number" step="0.01" className="form-input" placeholder="0.8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Compatible vehicles */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Vehicules compatibles</h3>
                <button type="button" onClick={addVehicle} className="btn-secondary text-xs py-1.5">
                  <Plus size={14} /> Ajouter
                </button>
              </div>
              <div className="card-body space-y-3">
                {vehicles.map((v, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <Car size={18} className="text-gray-400 mt-2.5 flex-shrink-0" />
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-1">
                      <input className="form-input text-xs py-2" placeholder="Marque" />
                      <input className="form-input text-xs py-2" placeholder="Modele" />
                      <input className="form-input text-xs py-2" placeholder="Annee debut" />
                      <input className="form-input text-xs py-2" placeholder="Annee fin" />
                      <input className="form-input text-xs py-2" placeholder="Moteur" />
                    </div>
                    {vehicles.length > 1 && (
                      <button type="button" onClick={() => removeVehicle(i)} className="btn-ghost p-1 text-red-400 hover:text-red-600 mt-1.5">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Attributes */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Caracteristiques</h3>
                <button type="button" onClick={addAttribute} className="btn-secondary text-xs py-1.5">
                  <Plus size={14} /> Ajouter
                </button>
              </div>
              <div className="card-body space-y-2">
                {attributes.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input className="form-input flex-1" placeholder="Nom (ex: Matiere)" />
                    <input className="form-input flex-1" placeholder="Valeur (ex: Ceramique)" />
                    {attributes.length > 1 && (
                      <button type="button" onClick={() => removeAttribute(i)} className="btn-ghost p-1 text-red-400 hover:text-red-600">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Publication</h3>
              </div>
              <div className="card-body space-y-4">
                <div>
                  <label className="form-label">Statut</label>
                  <select name="status" className="form-input">
                    <option value="draft">Brouillon</option>
                    <option value="published">Publie</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Disponibilite</label>
                  <select name="stock" className="form-input">
                    <option value="in-stock">En stock</option>
                    <option value="out-of-stock">Rupture de stock</option>
                    <option value="on-backorder">Sur commande</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Etat</label>
                  <select name="condition" className="form-input">
                    <option value="new">Neuf</option>
                    <option value="used">Occasion</option>
                    <option value="refurbished">Reconditionne</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Categorie</h3>
              </div>
              <div className="card-body space-y-4">
                <div>
                  <label className="form-label">Categorie *</label>
                  <select name="category" className="form-input" required>
                    <option value="">Selectionner...</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Marque *</label>
                  <input name="brand" className="form-input" placeholder="Ex: Bosch" required />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Images</h3>
              </div>
              <div className="card-body">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-brand-600 transition-colors cursor-pointer">
                  <Upload size={28} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">Cliquez ou glissez vos images ici</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG max 5MB</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Save size={18} /> Enregistrer le produit</>
                )}
              </button>
              <Link href="/dashboard/products" className="btn-secondary w-full justify-center">Annuler</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
