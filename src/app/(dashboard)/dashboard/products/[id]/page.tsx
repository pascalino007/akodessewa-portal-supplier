'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Plus, X, Upload, Car, Eye, Trash2 } from 'lucide-react';
import type { Product } from '@/types';

const categories = ['Freinage', 'Moteur', 'Suspension', 'Allumage', 'Eclairage', 'Carrosserie', 'Transmission', 'Echappement', 'Climatisation', 'Electricite'];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { getProduct } = await import('@/lib/api');
        const p = await getProduct(String(params.id));
        setProduct({
          id: p.id, name: p.name || '', sku: p.sku || '', slug: p.slug || '',
          description: p.description || '', price: Number(p.price) || 0,
          compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
          stock: (p.stockQuantity ?? p.stock ?? 0) > 0 ? 'in-stock' : 'out-of-stock',
          quantity: p.stockQuantity ?? p.stock ?? 0,
          category: p.category?.name || '', subcategory: '', brand: p.brand?.name || '',
          partNumber: p.partNumber || p.sku || '', condition: p.condition || 'new',
          weight: Number(p.weight || 0),
          images: (p.images || []).map((img: any) => typeof img === 'string' ? img : img.url || ''),
          compatibleVehicles: (p.compatibleVehicles || []).map((v: any) => ({
            make: v.make || '', model: v.model || '', yearFrom: v.yearFrom || '', yearTo: v.yearTo || '', engine: v.engine || '',
          })),
          attributes: (p.attributes || []).map((a: any) => ({ name: a.name || '', value: a.value || '' })),
          status: (p.status || 'published').toLowerCase() as any,
          createdAt: p.createdAt || '', updatedAt: p.updatedAt || '',
          views: p.viewCount || 0, sales: p.salesCount || 0,
        });
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, [params.id]);

  if (pageLoading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-gray-300 border-t-brand-600 rounded-full animate-spin" /></div>;
  }

  if (!product) {
    return <div className="text-center py-20"><p className="text-gray-500">Produit introuvable.</p></div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { updateProduct } = await import('@/lib/api');
      const fd = new FormData(e.target as HTMLFormElement);
      await updateProduct(product.id, {
        name: fd.get('name'), sku: fd.get('sku'), partNumber: fd.get('partNumber'),
        description: fd.get('description'), price: Number(fd.get('price')),
        compareAtPrice: fd.get('compareAtPrice') ? Number(fd.get('compareAtPrice')) : null,
        stockQuantity: Number(fd.get('quantity')), weight: Number(fd.get('weight') || 0),
        status: fd.get('status'), stock: fd.get('stock'), condition: fd.get('condition'),
        category: fd.get('category'), brand: fd.get('brand'),
      });
      router.push('/dashboard/products');
    } catch (err) {
      console.error('Failed to update product:', err);
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
            <h1 className="page-title">Modifier: {product.name}</h1>
            <p className="page-subtitle">SKU: {product.sku} &middot; {product.views} vues &middot; {product.sales} ventes</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Eye size={16} /> Voir</button>
          <button className="btn-danger"><Trash2 size={16} /> Supprimer</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Informations generales</h3></div>
              <div className="card-body space-y-4">
                <div><label className="form-label">Nom du produit *</label><input name="name" defaultValue={product.name} className="form-input" required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="form-label">SKU *</label><input name="sku" defaultValue={product.sku} className="form-input" required /></div>
                  <div><label className="form-label">Numero OEM</label><input name="partNumber" defaultValue={product.partNumber} className="form-input" /></div>
                </div>
                <div><label className="form-label">Description</label><textarea name="description" defaultValue={product.description} className="form-input min-h-[120px] resize-none" /></div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Prix et stock</h3></div>
              <div className="card-body">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div><label className="form-label">Prix ($) *</label><input name="price" type="number" step="0.01" defaultValue={product.price} className="form-input" required /></div>
                  <div><label className="form-label">Ancien prix</label><input name="compareAtPrice" type="number" step="0.01" defaultValue={product.compareAtPrice || ''} className="form-input" /></div>
                  <div><label className="form-label">Quantite *</label><input name="quantity" type="number" defaultValue={product.quantity} className="form-input" required /></div>
                  <div><label className="form-label">Poids (kg)</label><input name="weight" type="number" step="0.01" defaultValue={product.weight} className="form-input" /></div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Vehicules compatibles ({product.compatibleVehicles.length})</h3>
                <button type="button" className="btn-secondary text-xs py-1.5"><Plus size={14} /> Ajouter</button>
              </div>
              <div className="card-body space-y-3">
                {product.compatibleVehicles.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Car size={18} className="text-gray-400 flex-shrink-0" />
                    <div className="grid grid-cols-5 gap-2 flex-1">
                      <input defaultValue={v.make} className="form-input text-xs py-2" />
                      <input defaultValue={v.model} className="form-input text-xs py-2" />
                      <input defaultValue={v.yearFrom} className="form-input text-xs py-2" />
                      <input defaultValue={v.yearTo} className="form-input text-xs py-2" />
                      <input defaultValue={v.engine || ''} className="form-input text-xs py-2" />
                    </div>
                    <button type="button" className="btn-ghost p-1 text-red-400"><X size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-700">Caracteristiques ({product.attributes.length})</h3>
                <button type="button" className="btn-secondary text-xs py-1.5"><Plus size={14} /> Ajouter</button>
              </div>
              <div className="card-body space-y-2">
                {product.attributes.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input defaultValue={a.name} className="form-input flex-1" />
                    <input defaultValue={a.value} className="form-input flex-1" />
                    <button type="button" className="btn-ghost p-1 text-red-400"><X size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Publication</h3></div>
              <div className="card-body space-y-4">
                <div><label className="form-label">Statut</label><select name="status" defaultValue={product.status} className="form-input"><option value="draft">Brouillon</option><option value="published">Publie</option><option value="archived">Archive</option></select></div>
                <div><label className="form-label">Stock</label><select name="stock" defaultValue={product.stock} className="form-input"><option value="in-stock">En stock</option><option value="out-of-stock">Rupture</option><option value="on-backorder">Sur commande</option></select></div>
                <div><label className="form-label">Etat</label><select name="condition" defaultValue={product.condition} className="form-input"><option value="new">Neuf</option><option value="used">Occasion</option><option value="refurbished">Reconditionne</option></select></div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Categorie</h3></div>
              <div className="card-body space-y-4">
                <div><label className="form-label">Categorie</label><select name="category" defaultValue={product.category} className="form-input">{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
                <div><label className="form-label">Marque</label><input name="brand" defaultValue={product.brand} className="form-input" /></div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Images</h3></div>
              <div className="card-body">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-brand-600 transition-colors">
                  <Upload size={24} className="mx-auto text-gray-300 mb-1" />
                  <p className="text-xs text-gray-500">Ajouter des images</p>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> Enregistrer</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
