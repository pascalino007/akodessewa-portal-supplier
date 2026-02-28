'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Package, Archive, LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';

const statusColors: Record<string, string> = {
  published: 'badge-success',
  draft: 'badge-warning',
  archived: 'badge-gray',
};

const stockColors: Record<string, string> = {
  'in-stock': 'badge-success',
  'out-of-stock': 'badge-danger',
  'on-backorder': 'badge-warning',
};

const stockLabels: Record<string, string> = {
  'in-stock': 'En stock',
  'out-of-stock': 'Rupture',
  'on-backorder': 'Sur commande',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      loadProducts();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, statusFilter]);

  async function loadProducts() {
    setLoading(true);
    try {
      const { getMyProducts } = await import('@/lib/api');
      const params: Record<string, string> = { page: String(page), limit: String(limit) };
      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter;
      
      const res = await getMyProducts(params);
      const rawProducts = res.data || [];
      const meta = res.meta || {};
      
      const items = rawProducts.map((p: any) => ({
        id: p.id, name: p.name || '', sku: p.sku || '', slug: p.slug || '',
        description: p.description || '', price: Number(p.price) || 0,
        compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
        stock: (p.stockQuantity ?? p.stock ?? 0) > 0 ? 'in-stock' as const : 'out-of-stock' as const,
        quantity: p.stockQuantity ?? p.stock ?? 0,
        category: p.category?.name || '', subcategory: '', brand: p.brand?.name || '',
        partNumber: p.partNumber || p.sku || '', condition: 'new' as const, weight: 0,
        images: (p.images || []).map((img: any) => typeof img === 'string' ? img : img.url || ''),
        compatibleVehicles: [], attributes: [],
        status: p.isActive === false ? 'archived' : p.stock > 0 ? 'published' : 'draft',
        createdAt: p.createdAt || '', updatedAt: p.updatedAt || '',
        views: p.viewCount || 0, sales: p.salesCount || 0,
      }));
      
      setProducts(items);
      setTotalPages(meta.totalPages || 1);
      setTotal(meta.total || items.length);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Produits</h1>
          <p className="page-subtitle">{products.length} produits dans votre catalogue</p>
        </div>
        <Link href="/dashboard/products/new" className="btn-primary">
          <Plus size={18} /> Ajouter un produit
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou SKU..."
              className="form-input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-input w-auto">
              <option value="all">Tous les statuts</option>
              <option value="published">Publie</option>
              <option value="draft">Brouillon</option>
              <option value="archived">Archive</option>
            </select>
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-brand-600 rounded-full animate-spin" />
        </div>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>SKU</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Statut</th>
                  <th>Ventes</th>
                  <th>Vues</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package size={18} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <Link href={`/dashboard/products/${product.id}`} className="font-medium text-gray-800 hover:text-brand-600">
                            {product.name}
                          </Link>
                          <p className="text-xs text-gray-400">{product.category} &middot; {product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-500 font-mono text-xs">{product.sku}</td>
                    <td>
                      <span className="font-semibold">{product.price.toLocaleString()} XOF</span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-gray-400 line-through ml-1">{product.compareAtPrice.toLocaleString()}</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${stockColors[product.stock]}`}>{stockLabels[product.stock]}</span>
                      <span className="text-xs text-gray-400 ml-1">({product.quantity})</span>
                    </td>
                    <td><span className={`badge ${statusColors[product.status]}`}>{product.status}</span></td>
                    <td className="text-gray-600 font-medium">{product.sales}</td>
                    <td className="text-gray-400">{product.views}</td>
                    <td>
                      <div className="relative">
                        <button onClick={() => setMenuOpen(menuOpen === product.id ? null : product.id)} className="btn-ghost p-1">
                          <MoreVertical size={16} />
                        </button>
                        {menuOpen === product.id && (
                          <div className="absolute right-0 top-8 w-44 card shadow-xl z-20 py-1">
                            <Link href={`/dashboard/products/${product.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                              <Edit size={14} /> Modifier
                            </Link>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full text-left">
                              <Eye size={14} /> Voir sur le site
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full text-left">
                              <Archive size={14} /> Archiver
                            </button>
                            <hr className="my-1 border-gray-100" />
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left">
                              <Trash2 size={14} /> Supprimer
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`badge ${statusColors[product.status]} text-xs`}>{product.status}</span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                  <Link href={`/dashboard/products/${product.id}`} className="hover:text-brand-600">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category} &middot; {product.brand}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-brand-600">{product.price.toLocaleString()} XOF</span>
                  <span className={`badge ${stockColors[product.stock]} text-xs`}>{stockLabels[product.stock]}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>SKU: {product.sku}</span>
                  <span>Stock: {product.quantity}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{product.sales} ventes</span>
                  <span>{product.views} vues</span>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  <Link href={`/dashboard/products/${product.id}`} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                    <Edit size={14} /> Modifier
                  </Link>
                  <button className="flex items-center justify-center p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun produit trouve</h3>
          <p className="text-gray-500 text-sm mb-4">Commencez par ajouter un produit a votre catalogue</p>
          <Link href="/dashboard/products/new" className="btn-primary inline-flex">
            <Plus size={18} /> Ajouter un produit
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Affichage de {((page - 1) * limit) + 1} a {Math.min(page * limit, total)} sur {total} produits
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronLeft size={16} /> Precedent
            </button>
            <span className="text-sm text-gray-600 px-3">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Suivant <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
