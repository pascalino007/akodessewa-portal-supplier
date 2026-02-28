// ============================================================
// Types for the Akodessewa Supplier Portal
// ============================================================

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  shopDescription: string;
  shopLogo: string;
  shopBanner: string;
  country: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  stock: 'in-stock' | 'out-of-stock' | 'on-backorder';
  quantity: number;
  category: string;
  subcategory: string;
  brand: string;
  partNumber: string;
  condition: 'new' | 'used' | 'refurbished';
  weight: number;
  images: string[];
  compatibleVehicles: CompatibleVehicle[];
  attributes: ProductAttribute[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  views: number;
  sales: number;
}

export interface CompatibleVehicle {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  engine?: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface UsedVehicle {
  id: string;
  type: 'car' | 'moto';
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  negotiable: boolean;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  transmission: 'automatic' | 'manual';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  color: string;
  description: string;
  images: string[];
  status: 'active' | 'sold' | 'paused';
  contactWhatsApp: string;
  createdAt: string;
  views: number;
  inquiries: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'accepted' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'rejected';
  paymentMethod: 'mobile_money' | 'card' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
  notes: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  price: number;
  deliveryFee: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxUses: number;
  usedCount: number;
  productIds: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired' | 'paused';
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'withdrawal';
  amount: number;
  description: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: 'mobile_money' | 'bank_transfer';
  accountDetails: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  createdAt: string;
  processedAt: string | null;
}

export interface DeliveryGuy {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: 'motorcycle' | 'car' | 'bicycle';
  licensePlate: string;
  photo: string;
  status: 'active' | 'inactive' | 'suspended';
  totalDeliveries: number;
  rating: number;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueChange: number;
  ordersChange: number;
  productsChange: number;
  customersChange: number;
  recentOrders: Order[];
  topProducts: Product[];
  salesChart: { date: string; revenue: number; orders: number }[];
}
