'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { requestPasswordReset } = await import('@/lib/api');
      await requestPasswordReset(email);
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">A</span>
          </div>
          <span className="text-xl font-bold text-brand-600">Akodessewa</span>
        </div>

        <div className="card p-8">
          {!sent ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Mot de passe oublie ?</h2>
              <p className="text-gray-500 text-sm mb-6 text-center">
                Entrez votre adresse email. Nous vous enverrons un lien pour reinitialiser votre mot de passe.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="form-label">Adresse email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="form-input pl-11"
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Envoyer le lien <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email envoye !</h3>
              <p className="text-gray-500 text-sm mb-6">
                Un lien de reinitialisation a ete envoye a <strong>{email}</strong>. Verifiez votre boite de reception.
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary">
                Renvoyer l&apos;email
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-gray-500 hover:text-brand-600 inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Retour a la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
