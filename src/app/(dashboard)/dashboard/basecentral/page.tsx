'use client';

import { useState, useEffect } from 'react';
import { Search, Package, Plus, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { getUnassignedProducts, claimProduct, getCategories, getBrands } from '@/lib/api';
import type { Product } from '@/types';

interface ClaimModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (price: number, quantity: number) => void;
  loading: boolean;
}

function ClaimModal({ product, isOpen, onClose, onConfirm, loading }: ClaimModalProps) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(parseFloat(price) || 0, parseInt(quantity) || 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ajouter à ma boutique</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Produit:</p>
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-xs text-gray-500">Prix central: {product.price?.toLocaleString()} XOF</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Votre prix de vente (XOF) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 25000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <p className="text-xs text-gray-500 mt-1">Définissez votre propre prix de vente</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantité en stock *
            </label>
            <input
              type="number"
              required
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <p className="text-xs text-gray-500 mt-1">Nombre d&apos;unités disponibles</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ajout...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Ajouter
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BaseCentralPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);

  useEffect(() => {
    loadFilters();
    loadProducts();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProducts();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, categoryFilter, brandFilter, pagination.page]);

  async function loadFilters() {
    try {
      const [cats, brs] = await Promise.all([
        getCategories().catch(() => ({ data: [] })),
        getBrands().catch(() => ({ data: [] })),
      ]);
      setCategories(cats.data || []);
      setBrands(brs.data || []);
    } catch (err) {
      console.error('Failed to load filters:', err);
    }
  }

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await getUnassignedProducts({
        search: searchQuery || undefined,
        categoryId: categoryFilter || undefined,
        brandId: brandFilter || undefined,
        page: pagination.page,
        limit: 12,
      });
      setProducts(res.data || []);
      setPagination({
        page: res.meta?.page || 1,
        totalPages: res.meta?.totalPages || 1,
        total: res.meta?.total || 0,
      });
    } catch (err) {
      console.error('Failed to load products:', err);
      setErrorMessage('Failed to load products from central database');
    } finally {
      setLoading(false);
    }
  }

  async function handleClaim(productId: string, price: number, quantity: number) {
    setClaiming(productId);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      await claimProduct(productId, price, quantity);
      setSuccessMessage(`Produit ajouté à votre boutique avec succès !`);
      setShowClaimModal(false);
      setSelectedProduct(null);
      // Remove the claimed product from the list
      setProducts(products.filter(p => p.id !== productId));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
    } catch (err: any) {
      console.error('Failed to claim product:', err);
      setErrorMessage(err.message || 'Failed to claim product. It may already be claimed.');
    } finally {
      setClaiming(null);
    }
  }

  function openClaimModal(product: Product) {
    setSelectedProduct(product);
    setShowClaimModal(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Base de Données Centrale</h1>
          <p className="text-gray-500 mt-1">
            Browse unassigned products from the central database and add them to your shop
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Package className="w-4 h-4" />
          <span>{pagination.total} products available</span>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery || categoryFilter || brandFilter
              ? 'Try adjusting your filters'
              : 'No unassigned products available in the central database'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 relative">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category?.name || 'Uncategorized'}
                    {product.brand?.name && ` • ${product.brand.name}`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-brand-600">
                      {product.price?.toLocaleString() || '0'} XOF
                    </span>
                    <span className="text-xs text-gray-400">
                      {product.stock || 0} en stock
                    </span>
                  </div>

                  {/* Claim Button */}
                  <button
                    onClick={() => openClaimModal(product)}
                    disabled={claiming === product.id}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {claiming === product.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Ajout...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Ajouter à ma boutique
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                disabled={pagination.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      {/* Claim Modal */}
      <ClaimModal
        product={selectedProduct}
        isOpen={showClaimModal}
        onClose={() => {
          setShowClaimModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={(price, quantity) => {
          if (selectedProduct) {
            handleClaim(selectedProduct.id, price, quantity);
          }
        }}
        loading={!!claiming}
      />
    </div>
  );
}
