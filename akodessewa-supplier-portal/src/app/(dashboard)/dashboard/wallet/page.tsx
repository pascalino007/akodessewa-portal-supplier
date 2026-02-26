'use client';

import { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, DollarSign, TrendingUp } from 'lucide-react';
import type { WalletTransaction, WithdrawalRequest } from '@/types';

export default function WalletPage() {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [walletData, setWalletData] = useState({ balance: 0, pending: 0, totalEarned: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const { getMyWallet, getMyTransactions } = await import('@/lib/api');
        const [wallet, txRes] = await Promise.all([
          getMyWallet().catch(() => ({ balance: 0, pending: 0, totalEarned: 0 })),
          getMyTransactions().catch(() => ({ data: [] })),
        ]);
        setWalletData({
          balance: Number(wallet.balance || 0),
          pending: Number(wallet.pending || 0),
          totalEarned: Number(wallet.totalEarned || 0),
        });
        const txItems = (txRes.data || txRes || []).map((tx: any) => ({
          id: tx.id, type: tx.type || 'credit', amount: Number(tx.amount),
          description: tx.description || '', reference: tx.reference || '',
          status: tx.status || 'completed', createdAt: tx.createdAt || '',
        }));
        setTransactions(txItems);
        const wItems = txItems.filter((t: any) => t.type === 'debit').map((t: any) => ({
          id: t.id, amount: Number(t.amount), method: 'mobile_money' as const,
          accountDetails: '', status: t.status || 'pending', createdAt: t.createdAt || '',
        }));
        setWithdrawals(wallet.withdrawals || wItems);
      } catch (err) {
        console.error('Failed to load wallet:', err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Portefeuille</h1>
          <p className="page-subtitle">Gerez vos revenus et retraits</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary"><ArrowUpRight size={18} /> Retrait</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Wallet size={20} /></div>
            <span className="text-xs text-gray-500">Solde disponible</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${walletData.balance.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Clock size={20} /></div>
            <span className="text-xs text-gray-500">En attente</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${walletData.pending.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><DollarSign size={20} /></div>
            <span className="text-xs text-gray-500">Total gagne</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${walletData.totalEarned.toLocaleString()}</p>
        </div>
      </div>

      {showForm && (
        <div className="card mb-6">
          <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Nouveau retrait</h3></div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="form-label">Montant ($)</label><input type="number" className="form-input" placeholder="100" /></div>
              <div><label className="form-label">Methode</label><select className="form-input"><option>Mobile Money</option><option>Virement bancaire</option></select></div>
              <div><label className="form-label">Compte</label><input className="form-input" placeholder="Moov - +228 901..." /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="btn-secondary">Annuler</button>
              <button className="btn-primary">Soumettre</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Transactions</h3></div>
          <div className="divide-y divide-gray-50">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {tx.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{tx.description}</p>
                  <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3 className="text-sm font-semibold text-gray-700">Retraits</h3></div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Montant</th><th>Methode</th><th>Statut</th><th>Date</th></tr></thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td className="font-semibold">${w.amount}</td>
                    <td className="text-xs text-gray-500">{w.method === 'mobile_money' ? 'Mobile Money' : 'Virement'}</td>
                    <td><span className={`badge ${w.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{w.status === 'completed' ? 'OK' : 'En attente'}</span></td>
                    <td className="text-xs text-gray-400">{new Date(w.createdAt).toLocaleDateString('fr-FR')}</td>
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
