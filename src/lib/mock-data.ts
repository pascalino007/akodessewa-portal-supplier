import { Product, Order, Promotion, WalletTransaction, WithdrawalRequest, DeliveryGuy, UsedVehicle, DashboardStats } from '@/types';

// ============================================================
// Mock data for the Supplier Portal
// ============================================================

export const mockProducts: Product[] = [
  {
    id: 'p1', name: 'Plaquettes de frein avant Bosch', sku: 'BRK-001', slug: 'plaquettes-frein-avant-bosch',
    description: 'Plaquettes de frein haute performance pour freinage optimal.',
    price: 45, compareAtPrice: 65, stock: 'in-stock', quantity: 150,
    category: 'Freinage', subcategory: 'Plaquettes', brand: 'Bosch', partNumber: 'BP2345',
    condition: 'new', weight: 0.8, images: ['/placeholder-part.jpg'],
    compatibleVehicles: [
      { make: 'Toyota', model: 'Camry', yearFrom: 2018, yearTo: 2023, engine: '2.5L' },
      { make: 'Honda', model: 'Accord', yearFrom: 2017, yearTo: 2022, engine: '1.5T' },
    ],
    attributes: [{ name: 'Matiere', value: 'Ceramique' }, { name: 'Position', value: 'Avant' }],
    status: 'published', createdAt: '2024-12-01', updatedAt: '2025-01-15', views: 1240, sales: 89,
  },
  {
    id: 'p2', name: 'Filtre a huile Mann HU719/7x', sku: 'FLT-002', slug: 'filtre-huile-mann',
    description: 'Filtre a huile de qualite OEM.',
    price: 12, compareAtPrice: null, stock: 'in-stock', quantity: 300,
    category: 'Moteur', subcategory: 'Filtres', brand: 'Mann', partNumber: 'HU719',
    condition: 'new', weight: 0.3, images: ['/placeholder-part.jpg'],
    compatibleVehicles: [
      { make: 'Volkswagen', model: 'Golf', yearFrom: 2015, yearTo: 2023 },
    ],
    attributes: [{ name: 'Type', value: 'Cartouche' }],
    status: 'published', createdAt: '2024-11-15', updatedAt: '2025-01-10', views: 890, sales: 234,
  },
  {
    id: 'p3', name: 'Amortisseur arriere Monroe', sku: 'SUS-003', slug: 'amortisseur-arriere-monroe',
    description: 'Amortisseur de remplacement haute qualite.',
    price: 78, compareAtPrice: 95, stock: 'in-stock', quantity: 45,
    category: 'Suspension', subcategory: 'Amortisseurs', brand: 'Monroe', partNumber: 'MN5543',
    condition: 'new', weight: 3.2, images: ['/placeholder-part.jpg'],
    compatibleVehicles: [
      { make: 'Ford', model: 'Focus', yearFrom: 2016, yearTo: 2022 },
    ],
    attributes: [{ name: 'Position', value: 'Arriere' }, { name: 'Type', value: 'Gaz' }],
    status: 'published', createdAt: '2024-10-20', updatedAt: '2025-01-05', views: 560, sales: 42,
  },
  {
    id: 'p4', name: 'Bougies NGK Iridium IX', sku: 'IGN-004', slug: 'bougies-ngk-iridium',
    description: 'Bougies iridium pour performance et longevite optimale.',
    price: 8, compareAtPrice: null, stock: 'in-stock', quantity: 500,
    category: 'Allumage', subcategory: 'Bougies', brand: 'NGK', partNumber: 'BKR6EIX',
    condition: 'new', weight: 0.05, images: ['/placeholder-part.jpg'],
    compatibleVehicles: [
      { make: 'Toyota', model: 'Corolla', yearFrom: 2014, yearTo: 2023 },
      { make: 'Nissan', model: 'Sentra', yearFrom: 2015, yearTo: 2022 },
    ],
    attributes: [{ name: 'Materiau', value: 'Iridium' }],
    status: 'published', createdAt: '2024-09-10', updatedAt: '2024-12-20', views: 2100, sales: 567,
  },
  {
    id: 'p5', name: 'Courroie de distribution Gates', sku: 'ENG-005', slug: 'courroie-distribution-gates',
    description: 'Kit courroie de distribution complet.',
    price: 120, compareAtPrice: 160, stock: 'out-of-stock', quantity: 0,
    category: 'Moteur', subcategory: 'Distribution', brand: 'Gates', partNumber: 'K025493XS',
    condition: 'new', weight: 1.5, images: ['/placeholder-part.jpg'],
    compatibleVehicles: [
      { make: 'Peugeot', model: '308', yearFrom: 2013, yearTo: 2021 },
    ],
    attributes: [{ name: 'Inclus', value: 'Courroie + Galets + Pompe a eau' }],
    status: 'draft', createdAt: '2024-08-01', updatedAt: '2024-11-30', views: 340, sales: 18,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o1', orderNumber: 'AKD-2025-001',
    customer: { name: 'Kofi Mensah', email: 'kofi@email.com', phone: '+228 90112233', address: '15 Rue du Commerce', city: 'Lome', country: 'TG' },
    items: [
      { id: 'oi1', productId: 'p1', productName: 'Plaquettes de frein avant Bosch', productImage: '/placeholder-part.jpg', sku: 'BRK-001', quantity: 2, price: 45, deliveryFee: 3.5, status: 'pending' },
      { id: 'oi2', productId: 'p4', productName: 'Bougies NGK Iridium IX', productImage: '/placeholder-part.jpg', sku: 'IGN-004', quantity: 4, price: 8, deliveryFee: 1.2, status: 'pending' },
    ],
    subtotal: 122, deliveryFee: 4.7, tax: 24.4, total: 151.1,
    status: 'pending', paymentMethod: 'mobile_money', paymentStatus: 'paid',
    createdAt: '2025-02-09T14:30:00Z', updatedAt: '2025-02-09T14:30:00Z', notes: '',
  },
  {
    id: 'o2', orderNumber: 'AKD-2025-002',
    customer: { name: 'Ama Doe', email: 'ama@email.com', phone: '+228 91223344', address: '8 Blvd Circulaire', city: 'Lome', country: 'TG' },
    items: [
      { id: 'oi3', productId: 'p3', productName: 'Amortisseur arriere Monroe', productImage: '/placeholder-part.jpg', sku: 'SUS-003', quantity: 2, price: 78, deliveryFee: 5.0, status: 'confirmed' },
    ],
    subtotal: 156, deliveryFee: 5.0, tax: 31.2, total: 192.2,
    status: 'accepted', paymentMethod: 'card', paymentStatus: 'paid',
    createdAt: '2025-02-08T10:15:00Z', updatedAt: '2025-02-08T11:00:00Z', notes: 'Livraison rapide svp',
  },
  {
    id: 'o3', orderNumber: 'AKD-2025-003',
    customer: { name: 'Yao Agbeko', email: 'yao@email.com', phone: '+228 90445566', address: '22 Ave de la Paix', city: 'Kpalime', country: 'TG' },
    items: [
      { id: 'oi4', productId: 'p2', productName: 'Filtre a huile Mann HU719/7x', productImage: '/placeholder-part.jpg', sku: 'FLT-002', quantity: 3, price: 12, deliveryFee: 2.0, status: 'confirmed' },
      { id: 'oi5', productId: 'p4', productName: 'Bougies NGK Iridium IX', productImage: '/placeholder-part.jpg', sku: 'IGN-004', quantity: 8, price: 8, deliveryFee: 1.5, status: 'confirmed' },
    ],
    subtotal: 100, deliveryFee: 3.5, tax: 20, total: 123.5,
    status: 'shipped', paymentMethod: 'mobile_money', paymentStatus: 'paid',
    createdAt: '2025-02-07T08:45:00Z', updatedAt: '2025-02-08T09:00:00Z', notes: '',
  },
  {
    id: 'o4', orderNumber: 'AKD-2025-004',
    customer: { name: 'Akua Tedam', email: 'akua@email.com', phone: '+233 201234567', address: '5 High St', city: 'Accra', country: 'GH' },
    items: [
      { id: 'oi6', productId: 'p5', productName: 'Courroie de distribution Gates', productImage: '/placeholder-part.jpg', sku: 'ENG-005', quantity: 1, price: 120, deliveryFee: 8.0, status: 'cancelled' },
    ],
    subtotal: 120, deliveryFee: 8.0, tax: 24, total: 152,
    status: 'cancelled', paymentMethod: 'card', paymentStatus: 'refunded',
    createdAt: '2025-02-05T16:20:00Z', updatedAt: '2025-02-06T10:30:00Z', notes: 'Client a annule',
  },
  {
    id: 'o5', orderNumber: 'AKD-2025-005',
    customer: { name: 'Edem Kossi', email: 'edem@email.com', phone: '+228 93667788', address: '10 Rue Tokoin', city: 'Lome', country: 'TG' },
    items: [
      { id: 'oi7', productId: 'p1', productName: 'Plaquettes de frein avant Bosch', productImage: '/placeholder-part.jpg', sku: 'BRK-001', quantity: 1, price: 45, deliveryFee: 2.5, status: 'confirmed' },
    ],
    subtotal: 45, deliveryFee: 2.5, tax: 9, total: 56.5,
    status: 'delivered', paymentMethod: 'cash_on_delivery', paymentStatus: 'paid',
    createdAt: '2025-02-03T12:00:00Z', updatedAt: '2025-02-04T15:00:00Z', notes: '',
  },
];

export const mockPromotions: Promotion[] = [
  { id: 'pr1', name: 'Soldes Janvier', description: '-15% sur les freins', type: 'percentage', value: 15, minOrderAmount: 50, maxUses: 100, usedCount: 43, productIds: ['p1'], startDate: '2025-01-01', endDate: '2025-01-31', status: 'expired', createdAt: '2024-12-28' },
  { id: 'pr2', name: 'Promo Filtres', description: '-2000 FCFA sur les filtres', type: 'fixed', value: 3.32, minOrderAmount: 0, maxUses: 200, usedCount: 12, productIds: ['p2'], startDate: '2025-02-01', endDate: '2025-02-28', status: 'active', createdAt: '2025-01-28' },
  { id: 'pr3', name: 'Flash Sale Mars', description: '-20% sur tout', type: 'percentage', value: 20, minOrderAmount: 100, maxUses: 50, usedCount: 0, productIds: [], startDate: '2025-03-01', endDate: '2025-03-07', status: 'scheduled', createdAt: '2025-02-05' },
];

export const mockTransactions: WalletTransaction[] = [
  { id: 't1', type: 'credit', amount: 151.1, description: 'Commande AKD-2025-001', reference: 'o1', status: 'completed', createdAt: '2025-02-09T14:35:00Z' },
  { id: 't2', type: 'credit', amount: 192.2, description: 'Commande AKD-2025-002', reference: 'o2', status: 'completed', createdAt: '2025-02-08T11:05:00Z' },
  { id: 't3', type: 'withdrawal', amount: 200, description: 'Retrait vers Moov Money', reference: 'w1', status: 'completed', createdAt: '2025-02-07T09:00:00Z' },
  { id: 't4', type: 'credit', amount: 123.5, description: 'Commande AKD-2025-003', reference: 'o3', status: 'completed', createdAt: '2025-02-07T08:50:00Z' },
  { id: 't5', type: 'credit', amount: 56.5, description: 'Commande AKD-2025-005', reference: 'o5', status: 'completed', createdAt: '2025-02-04T15:05:00Z' },
  { id: 't6', type: 'withdrawal', amount: 150, description: 'Retrait vers Mixx by Yas', reference: 'w2', status: 'pending', createdAt: '2025-02-09T16:00:00Z' },
];

export const mockWithdrawals: WithdrawalRequest[] = [
  { id: 'w1', amount: 200, method: 'mobile_money', accountDetails: 'Moov Money - +228 90171212', status: 'completed', createdAt: '2025-02-07T09:00:00Z', processedAt: '2025-02-07T12:00:00Z' },
  { id: 'w2', amount: 150, method: 'mobile_money', accountDetails: 'Mixx by Yas - +228 90171212', status: 'pending', createdAt: '2025-02-09T16:00:00Z', processedAt: null },
];

export const mockDeliveryGuys: DeliveryGuy[] = [
  { id: 'd1', name: 'Kodjo Assem', phone: '+228 90112233', email: 'kodjo@email.com', vehicleType: 'motorcycle', licensePlate: 'TG 1234 LM', photo: '', status: 'active', totalDeliveries: 145, rating: 4.8, createdAt: '2024-06-15' },
  { id: 'd2', name: 'Mensah Kwaku', phone: '+228 91223344', email: 'mensah@email.com', vehicleType: 'motorcycle', licensePlate: 'TG 5678 AB', photo: '', status: 'active', totalDeliveries: 89, rating: 4.5, createdAt: '2024-08-20' },
  { id: 'd3', name: 'Afi Dosseh', phone: '+228 92334455', email: 'afi@email.com', vehicleType: 'car', licensePlate: 'TG 9012 CD', photo: '', status: 'inactive', totalDeliveries: 23, rating: 4.2, createdAt: '2024-11-01' },
];

export const mockUsedVehicles: UsedVehicle[] = [
  { id: 'v1', type: 'car', make: 'Toyota', model: 'Corolla', year: 2019, mileage: 45000, price: 8500, negotiable: true, condition: 'good', transmission: 'automatic', fuelType: 'gasoline', color: 'Blanc', description: 'Tres bon etat, climatisation fonctionnelle.', images: [], status: 'active', contactWhatsApp: '+22890171212', createdAt: '2025-01-20', views: 320, inquiries: 15 },
  { id: 'v2', type: 'moto', make: 'Honda', model: 'CBR 600', year: 2021, mileage: 12000, price: 4200, negotiable: false, condition: 'excellent', transmission: 'manual', fuelType: 'gasoline', color: 'Rouge', description: 'Comme neuve, entretien regulier chez Honda.', images: [], status: 'active', contactWhatsApp: '+22890171212', createdAt: '2025-02-01', views: 180, inquiries: 8 },
];

export function getDashboardStats(): DashboardStats {
  return {
    totalRevenue: 12450,
    totalOrders: 156,
    totalProducts: 5,
    totalCustomers: 98,
    revenueChange: 12.5,
    ordersChange: 8.3,
    productsChange: 2,
    customersChange: 15.2,
    recentOrders: mockOrders.slice(0, 5),
    topProducts: mockProducts.slice(0, 4),
    salesChart: [
      { date: 'Lun', revenue: 1200, orders: 18 },
      { date: 'Mar', revenue: 1800, orders: 24 },
      { date: 'Mer', revenue: 1400, orders: 20 },
      { date: 'Jeu', revenue: 2200, orders: 32 },
      { date: 'Ven', revenue: 1900, orders: 28 },
      { date: 'Sam', revenue: 2800, orders: 38 },
      { date: 'Dim', revenue: 1100, orders: 15 },
    ],
  };
}
