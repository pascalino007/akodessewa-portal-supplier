const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// ── Token Management ─────────────────────────────────────

interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export function getTokens(): TokenData | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('supplier_auth_tokens');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setTokens(tokens: TokenData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('supplier_auth_tokens', JSON.stringify(tokens));
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('supplier_auth_tokens');
  localStorage.removeItem('supplier_user');
}

export function getStoredUser(): any {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('supplier_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setStoredUser(user: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('supplier_user', JSON.stringify(user));
}

export function isAuthenticated(): boolean {
  return !!getTokens()?.accessToken;
}

// ── HTTP Client ──────────────────────────────────────────

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

async function refreshAccessToken(): Promise<string | null> {
  const tokens = getTokens();
  if (!tokens?.refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    });
    if (!res.ok) { clearTokens(); return null; }
    const data = await res.json();
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    return data.accessToken;
  } catch {
    clearTokens();
    return null;
  }
}

export async function api<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const tokens = getTokens();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (tokens?.accessToken) headers['Authorization'] = `Bearer ${tokens.accessToken}`;
  if (options.body instanceof FormData) delete headers['Content-Type'];

  let res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && tokens?.refreshToken) {
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshAccessToken();
      isRefreshing = false;
      if (newToken) {
        refreshQueue.forEach((cb) => cb(newToken));
        refreshQueue = [];
        headers['Authorization'] = `Bearer ${newToken}`;
        res = await fetch(`${API_BASE}${path}`, { ...options, headers });
      } else {
        refreshQueue = [];
        if (typeof window !== 'undefined') window.location.href = '/login';
        throw new Error('Session expired');
      }
    } else {
      const newToken = await new Promise<string>((resolve) => refreshQueue.push(resolve));
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API error ${res.status}`);
  }
  if (res.status === 204) return undefined as any;
  return res.json();
}

// ── Auth ─────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const data = await api('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
  setStoredUser(data.user);
  return data.user;
}

export async function register(payload: {
  email: string; password: string; firstName: string; lastName: string; phone: string;
  shopName: string; shopDescription: string; country: string; city: string; address: string;
}) {
  const data = await api('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
  setStoredUser(data.user);
  return data.user;
}

export async function logout() {
  try { await api('/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
  clearTokens();
}

export async function requestPasswordReset(email: string) {
  return api('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// ── Dashboard / Analytics ────────────────────────────────

export async function getSupplierDashboard() {
  return api('/analytics/supplier/dashboard');
}

// ── Products ─────────────────────────────────────────────

export async function getMyProducts(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return api(`/products/my${qs}`);
}

export async function getProduct(id: string) {
  return api(`/products/${id}`);
}

export async function createProduct(data: any) {
  return api('/products', { method: 'POST', body: JSON.stringify(data) });
}

export async function updateProduct(id: string, data: any) {
  return api(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export async function deleteProduct(id: string) {
  return api(`/products/${id}`, { method: 'DELETE' });
}

// ── Orders ───────────────────────────────────────────────

export async function getMyOrders(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return api(`/orders${qs}`);
}

export async function getOrder(id: string) {
  return api(`/orders/${id}`);
}

export async function updateOrderStatus(id: string, status: string) {
  return api(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

// ── Used Vehicles ────────────────────────────────────────

export async function getMyVehicles(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return api(`/marketplace/my${qs}`);
}

export async function createVehicleListing(data: any) {
  return api('/marketplace', { method: 'POST', body: JSON.stringify(data) });
}

export async function updateVehicleListing(id: string, data: any) {
  return api(`/marketplace/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export async function deleteVehicleListing(id: string) {
  return api(`/marketplace/${id}`, { method: 'DELETE' });
}

// ── Promotions ───────────────────────────────────────────

export async function getMyPromotions(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return api(`/promotions${qs}`);
}

export async function createPromotion(data: any) {
  return api('/promotions', { method: 'POST', body: JSON.stringify(data) });
}

export async function updatePromotion(id: string, data: any) {
  return api(`/promotions/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export async function deactivatePromotion(id: string) {
  return api(`/promotions/${id}/deactivate`, { method: 'PATCH' });
}

// ── Wallet ───────────────────────────────────────────────

export async function getMyWallet() {
  return api('/wallet');
}

export async function getMyTransactions(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return api(`/wallet/transactions${qs}`);
}

export async function requestWithdrawal(data: { amount: number; method: string; accountDetails: string }) {
  return api('/wallet/withdraw', { method: 'POST', body: JSON.stringify(data) });
}

// ── Delivery ─────────────────────────────────────────────

export async function getMyDeliveryPersonnel() {
  return api('/delivery');
}

export async function createDeliveryPerson(data: any) {
  return api('/delivery', { method: 'POST', body: JSON.stringify(data) });
}

export async function updateDeliveryPerson(id: string, data: any) {
  return api(`/delivery/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

// ── Shop Settings ────────────────────────────────────────

export async function getMyShop() {
  return api('/shops/mine');
}

export async function updateMyShop(data: any) {
  return api('/shops/mine', { method: 'PATCH', body: JSON.stringify(data) });
}

// ── Profile ──────────────────────────────────────────────

export async function getProfile() {
  return api('/users/me');
}

export async function updateProfile(data: any) {
  return api('/users/me', { method: 'PATCH', body: JSON.stringify(data) });
}

// ── Upload ───────────────────────────────────────────────

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return api('/upload', { method: 'POST', body: formData });
}

export async function uploadFiles(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  return api('/upload/batch', { method: 'POST', body: formData });
}

// ── Subscription ─────────────────────────────────────────

export async function getMySubscription() {
  return api('/subscriptions/mine');
}

export async function changePlan(plan: string) {
  return api('/subscriptions/change-plan', { method: 'PATCH', body: JSON.stringify({ plan }) });
}

// ── Categories & Brands (for product forms) ──────────────

export async function getCategories() {
  return api('/categories?depth=2');
}

export async function getBrands() {
  return api('/brands');
}

// ── Cars (for compatibility) ─────────────────────────────

export async function getCarMakes() {
  return api('/cars/makes');
}

export async function getCarModels(make: string) {
  return api(`/cars/models?make=${encodeURIComponent(make)}`);
}

// ── Central Database (Base Centrale) ────────────────────

export async function getUnassignedProducts(query?: { search?: string; categoryId?: string; brandId?: string; page?: number; limit?: number }) {
  const params = new URLSearchParams();
  if (query?.search) params.set('search', query.search);
  if (query?.categoryId) params.set('categoryId', query.categoryId);
  if (query?.brandId) params.set('brandId', query.brandId);
  if (query?.page) params.set('page', String(query.page));
  if (query?.limit) params.set('limit', String(query.limit));
  return api(`/products/central/unassigned?${params.toString()}`);
}

export async function claimProduct(productId: string, price: number, quantity: number) {
  return api(`/products/${productId}/claim`, { 
    method: 'POST',
    body: JSON.stringify({ price, quantity })
  });
}
