import api from './client';

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data: { email: string; password: string; firstName?: string; lastName?: string; phone?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; password: string }) =>
    api.post('/auth/reset-password', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch('/auth/change-password', data),
  getProfile: () =>
    api.get('/auth/profile'),
  logout: (refreshToken: string) =>
    api.post('/auth/logout', { refreshToken }),
};

// ─── USERS ───────────────────────────────────────────────────────────────────
export const usersAPI = {
  getMe: () => api.get('/users/me'),
  updateMe: (data: any) => api.patch('/users/me', data),
  getMyAddresses: () => api.get('/users/me/addresses'),
  createAddress: (data: any) => api.post('/users/me/addresses', data),
  updateAddress: (id: string, data: any) => api.patch(`/users/me/addresses/${id}`, data),
  deleteAddress: (id: string) => api.delete(`/users/me/addresses/${id}`),
};

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getFeatured: (limit?: number) => api.get('/products/featured', { params: { limit } }),
  getBySlug: (slug: string) => api.get(`/products/slug/${slug}`),
  getById: (id: string) => api.get(`/products/${id}`),
  getRelated: (id: string, limit?: number) => api.get(`/products/${id}/related`, { params: { limit } }),
  getByShop: (shopId: string, params?: any) => api.get(`/products/shop/${shopId}`, { params }),
};

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
export const categoriesAPI = {
  getAll: (type?: string) => api.get('/categories', { params: type ? { type } : undefined }),
  getBySlug: (slug: string) => api.get(`/categories/slug/${slug}`),
  getById: (id: string) => api.get(`/categories/${id}`),
};

// ─── BRANDS ──────────────────────────────────────────────────────────────────
export const brandsAPI = {
  getAll: () => api.get('/brands'),
  getById: (id: string) => api.get(`/brands/${id}`),
};

// ─── CARS ────────────────────────────────────────────────────────────────────
export const carsAPI = {
  getAll: (params?: any) => api.get('/cars', { params }),
  getMakes: () => api.get('/cars/makes'),
  getModels: (make: string) => api.get(`/cars/models/${make}`),
  getYears: (make: string, model: string) => api.get(`/cars/years/${make}/${model}`),
  getTrims: (make: string, model: string, year: number) => api.get(`/cars/trims/${make}/${model}/${year}`),
  getById: (id: string) => api.get(`/cars/${id}`),
};

// ─── SEARCH ──────────────────────────────────────────────────────────────────
export const searchAPI = {
  searchByVin: (vin: string) => api.get('/search/vin', { params: { vin } }),
  searchProducts: (q: string) => api.get('/search/products', { params: { q } }),
  advancedSearch: (params: any) => api.get('/search/advanced', { params }),
  getSuggestions: (q: string) => api.get('/search/suggestions', { params: { q } }),
};

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export const ordersAPI = {
  getAll: (params?: any) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  updateStatus: (id: string, status: string, note?: string) =>
    api.patch(`/orders/${id}/status`, { status, note }),
  cancelItem: (orderId: string, itemId: string, reason?: string) =>
    api.patch(`/orders/${orderId}/items/${itemId}/cancel`, { reason }),
};

// ─── SHOPS ───────────────────────────────────────────────────────────────────
export const shopsAPI = {
  getAll: (params?: any) => api.get('/shops', { params }),
  getBySlug: (slug: string) => api.get(`/shops/slug/${slug}`),
  getById: (id: string) => api.get(`/shops/${id}`),
};

// ─── MARKETPLACE (Used Vehicles) ─────────────────────────────────────────────
export const marketplaceAPI = {
  getAll: (params?: any) => api.get('/marketplace', { params }),
  getById: (id: string) => api.get(`/marketplace/${id}`),
  create: (data: any) => api.post('/marketplace', data),
  update: (id: string, data: any) => api.patch(`/marketplace/${id}`, data),
  remove: (id: string) => api.delete(`/marketplace/${id}`),
};

// ─── MECHANICS ───────────────────────────────────────────────────────────────
export const mechanicsAPI = {
  getAll: (params?: any) => api.get('/mechanics', { params }),
  getById: (id: string) => api.get(`/mechanics/${id}`),
};

// ─── SLIDES / BANNERS ────────────────────────────────────────────────────────
export const slidesAPI = {
  getActive: (position?: string) => api.get('/slides/active', { params: position ? { position } : undefined }),
};

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
export const reviewsAPI = {
  getProductReviews: (productId: string, params?: any) =>
    api.get(`/reviews/product/${productId}`, { params }),
  create: (data: { productId: string; rating: number; title?: string; comment?: string }) =>
    api.post('/reviews', data),
  update: (id: string, data: any) => api.patch(`/reviews/${id}`, data),
  remove: (id: string) => api.delete(`/reviews/${id}`),
};

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
export const notificationsAPI = {
  getAll: (params?: any) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

// ─── PROMOTIONS ──────────────────────────────────────────────────────────────
export const promotionsAPI = {
  getActive: () => api.get('/promotions/active'),
  validateCode: (code: string) => api.get(`/promotions/validate/${code}`),
};

// ─── PAYMENTS ────────────────────────────────────────────────────────────────
export const paymentsAPI = {
  createForOrder: (orderId: string, data: any) => api.post(`/payments/order/${orderId}`, data),
  getById: (id: string) => api.get(`/payments/${id}`),
};

// ─── GARAGE ──────────────────────────────────────────────────────────────────
export const garageAPI = {
  getMyVehicles: () => api.get('/garage'),
  addVehicle: (data: any) => api.post('/garage', data),
  updateVehicle: (id: string, data: any) => api.patch(`/garage/${id}`, data),
  removeVehicle: (id: string) => api.delete(`/garage/${id}`),
  getCompatibleParts: (id: string) => api.get(`/garage/${id}/parts`),
};
