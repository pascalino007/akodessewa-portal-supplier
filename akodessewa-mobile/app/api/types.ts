// ─── ENUMS ──────────────────────────────────────────────────────────────────

export type Role = 'ADMIN' | 'MANAGER' | 'ACCOUNTANT' | 'LOGISTICS' | 'SUPPLIER' | 'MECHANIC' | 'CUSTOMER';
export type VehicleType = 'AUTO' | 'MOTO';
export type FuelType = 'GASOLINE' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'PLUGIN_HYBRID' | 'LPG';
export type TransmissionType = 'MANUAL' | 'AUTOMATIC' | 'CVT' | 'DCT' | 'SEMI_AUTOMATIC';
export type ProductCondition = 'NEW' | 'USED' | 'REFURBISHED';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED' | 'RETURNED';
export type PaymentMethod = 'MOBILE_MONEY' | 'CARD' | 'BANK_TRANSFER' | 'CASH_ON_DELIVERY' | 'WALLET';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
export type UsedVehicleType = 'CAR' | 'MOTORCYCLE' | 'BUS' | 'TRUCK' | 'VAN' | 'SUV';
export type VehicleCondition = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
export type UsedVehicleStatus = 'ACTIVE' | 'SOLD' | 'RESERVED' | 'EXPIRED' | 'REMOVED';

// ─── MODELS ─────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  phone?: string;
  role: Role;
  isActive: boolean;
  isVerified: boolean;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  language: string;
  currency: string;
  createdAt: string;
}

export interface Address {
  id: string;
  label?: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  type: VehicleType;
  isActive: boolean;
  order: number;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  country?: string;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  isMain: boolean;
  order: number;
}

export interface ProductSpecification {
  id: string;
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sku?: string;
  partNumber?: string;
  oemNumber?: string;
  price: number;
  comparePrice?: number;
  currency: string;
  stock: number;
  condition: ProductCondition;
  vehicleType: VehicleType;
  material?: string;
  color?: string;
  countryOfOrigin?: string;
  warranty?: string;
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  salesCount: number;
  categoryId?: string;
  category?: Category;
  brandId?: string;
  brand?: Brand;
  shopId: string;
  shop?: Shop;
  images: ProductImage[];
  specifications: ProductSpecification[];
  createdAt: string;
}

export interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  engine?: string;
  displacement?: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType?: string;
  driveType?: string;
  vehicleType: VehicleType;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  banner?: string;
  phone?: string;
  email?: string;
  website?: string;
  street?: string;
  city?: string;
  country?: string;
  isActive: boolean;
  isVerified: boolean;
  rating: number;
  totalSales: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  total: number;
  status: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  shopId: string;
  shop?: Shop;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  notes?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface UsedVehicleImage {
  id: string;
  url: string;
  isMain: boolean;
}

export interface UsedVehicle {
  id: string;
  sellerId: string;
  type: UsedVehicleType;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage?: number;
  condition: VehicleCondition;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  color?: string;
  engine?: string;
  description?: string;
  location?: string;
  city?: string;
  country?: string;
  status: UsedVehicleStatus;
  isFeatured: boolean;
  viewCount: number;
  images: UsedVehicleImage[];
  features: { id: string; feature: string }[];
  createdAt: string;
}

export interface MechanicService {
  id: string;
  name: string;
  description?: string;
  price?: number;
  duration?: string;
}

export interface MechanicShop {
  id: string;
  name: string;
  slug: string;
  description?: string;
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  country?: string;
  logo?: string;
  isActive: boolean;
  isVerified: boolean;
  rating: number;
  services: MechanicService[];
}

export interface Slide {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  linkText?: string;
  position: string;
  order: number;
}

export interface Review {
  id: string;
  userId: string;
  user?: { firstName?: string; lastName?: string; avatar?: string };
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

export interface Promotion {
  id: string;
  name: string;
  description?: string;
  code?: string;
  type: string;
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
}

export interface GarageVehicle {
  id: string;
  carId: string;
  car?: Car;
  vin?: string;
  nickname?: string;
  mileage?: number;
  color?: string;
  plateNumber?: string;
  isDefault: boolean;
}

// ─── API RESPONSE TYPES ─────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// ─── CART ITEM (local) ──────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image?: string;
  quantity: number;
  stock: number;
  shopId: string;
  shopName?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image?: string;
  rating: number;
  slug: string;
}
