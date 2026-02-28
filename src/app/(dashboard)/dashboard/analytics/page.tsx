'use client';

import { useState, useEffect } from 'react';
import {
  Download, Calendar, TrendingUp, DollarSign, ShoppingCart, Package, Users,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';

const periods = ['7j', '30j', '90j', '12m', 'Annee'];
const PIE_COLORS = ['#d32f2f', '#1976d2', '#388e3c', '#f57c00', '#7b1fa2'];

const defaultWeekly = [
  { date: 'Lun', revenue: 0, orders: 0 }, { date: 'Mar', revenue: 0, orders: 0 },
  { date: 'Mer', revenue: 0, orders: 0 }, { date: 'Jeu', revenue: 0, orders: 0 },
  { date: 'Ven', revenue: 0, orders: 0 }, { date: 'Sam', revenue: 0, orders: 0 },
  { date: 'Dim', revenue: 0, orders: 0 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30j');
  const [kpis, setKpis] = useState({ revenue: 0, orders: 0, products: 0, customers: 0 });
  const [weeklyData, setWeeklyData] = useState(defaultWeekly);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { getSupplierDashboard, getMyProducts } = await import('@/lib/api');
        const [dash, prodRes] = await Promise.all([
          getSupplierDashboard().catch(() => null),
          getMyProducts({ limit: '5', sortBy: 'sales' }).catch(() => ({ data: [] })),
        ]);
        if (dash) {
          setKpis({
            revenue: dash.totalRevenue || 0,
            orders: dash.totalOrders || 0,
            products: dash.totalProducts || 0,
            customers: dash.totalCustomers || 0,
          });
          if (dash.salesChart?.length) setWeeklyData(dash.salesChart);
          if (dash.monthlyChart?.length) setMonthlyData(dash.monthlyChart);
          if (dash.categoryBreakdown?.length) setCategoryData(dash.categoryBreakdown);
        }
        const prods = (prodRes?.data || []).map((p: any) => ({
          name: p.name || '', sales: p.salesCount || 0,
          revenue: (p.salesCount || 0) * Number(p.price || 0),
        }));
        setTopProducts(prods);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytiques</h1>
          <p className="page-subtitle">Analysez vos performances de vente en detail</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${period === p ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="btn-secondary">
            <Download size={16} /> Exporter
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Revenu Total', value: `$${kpis.revenue.toLocaleString()}`, sub: '', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Commandes', value: String(kpis.orders), sub: '', icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
          { label: 'Produits vendus', value: String(kpis.products), sub: '', icon: Package, color: 'text-purple-600 bg-purple-50' },
          { label: 'Clients uniques', value: String(kpis.customers), sub: '', icon: Users, color: 'text-amber-600 bg-amber-50' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><TrendingUp size={12} /> {s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Revenu et commandes</h3>
          </div>
          <div className="card-body pt-2">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#d32f2f" strokeWidth={2} fill="url(#aGrad)" name="Revenu ($)" />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#1976d2" strokeWidth={2} dot={false} name="Commandes" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Ventes par categorie</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} formatter={(v: number) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly trend + Top products */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Tendance mensuelle</h3>
          </div>
          <div className="card-body pt-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenu']} />
                <Bar dataKey="revenue" fill="#d32f2f" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-700">Top produits</h3>
            <button className="btn-secondary text-xs py-1"><Download size={14} /> CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produit</th>
                  <th>Ventes</th>
                  <th>Revenu</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i}>
                    <td className="font-bold text-gray-300">{i + 1}</td>
                    <td className="font-medium text-gray-700">{p.name}</td>
                    <td>{p.sales}</td>
                    <td className="font-semibold">${p.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
