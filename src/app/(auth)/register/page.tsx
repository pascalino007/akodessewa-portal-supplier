'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Eye, EyeOff, Mail, Lock, User, Phone, Store, MapPin, ArrowRight, Check,
  Globe, Coins, LocateFixed, Loader2, Crown, Zap, Star, CreditCard, Smartphone,
} from 'lucide-react';

const steps = ['Compte', 'Boutique', 'Abonnement', 'Paiement', 'Confirmation'];

const languages = [
  { code: 'fr', label: 'Francais' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

const currencies = [
  { code: 'XOF', label: 'XOF (Franc CFA)', symbol: 'CFA' },
  { code: 'USD', label: 'USD (Dollar US)', symbol: '$' },
  { code: 'EUR', label: 'EUR (Euro)', symbol: '€' },
  { code: 'GHS', label: 'GHS (Cedi)', symbol: '₵' },
  { code: 'NGN', label: 'NGN (Naira)', symbol: '₦' },
];

interface Plan {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  period: string;
  icon: typeof Star;
  color: string;
  bg: string;
  border: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    priceLabel: 'Gratuit',
    period: '',
    icon: Star,
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    features: ['5 produits max', 'Commandes illimitees', 'Support par email', 'Statistiques de base'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 15000,
    priceLabel: '15 000 XOF',
    period: '/ trimestre',
    icon: Zap,
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    border: 'border-brand-300',
    features: ['50 produits max', 'Commandes illimitees', 'Support prioritaire', 'Analytiques avancees', 'Promotions illimitees', 'Badge "Premium"'],
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 35000,
    priceLabel: '35 000 XOF',
    period: '/ trimestre',
    icon: Crown,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    features: ['Produits illimites', 'Commandes illimitees', 'Support 24/7 WhatsApp', 'Analytiques completes', 'Promotions illimitees', 'Badge "VIP" + mise en avant', 'Vehicules d\'occasion illimites', 'Livreurs illimites'],
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    language: 'fr', currency: 'XOF',
    shopName: '', shopDescription: '', country: '', city: '', address: '',
    plan: 'basic',
    paymentMethod: 'mobile_money',
    mobileNumber: '', cardNumber: '', cardExpiry: '', cardCvc: '',
    agreeTerms: false,
  });

  const update = (field: string, value: string | boolean) => setForm({ ...form, [field]: value });

  const useGPS = useCallback(async () => {
    if (!navigator.geolocation) { alert('GPS non disponible sur cet appareil.'); return; }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=fr`
          );
          const data = await res.json();
          const addr = data.address || {};
          const road = addr.road || addr.pedestrian || addr.neighbourhood || '';
          const houseNumber = addr.house_number || '';
          const city = addr.city || addr.town || addr.village || addr.state || '';
          const countryCode = (addr.country_code || '').toUpperCase();
          const fullAddress = [houseNumber, road, addr.suburb].filter(Boolean).join(', ');

          setForm((prev) => ({
            ...prev,
            address: fullAddress || data.display_name?.split(',').slice(0, 3).join(',') || '',
            city: city,
            country: countryCode === 'TG' ? 'TG' : countryCode === 'GH' ? 'GH' : countryCode === 'BJ' ? 'BJ' : countryCode === 'CI' ? 'CI' : countryCode === 'NG' ? 'NG' : countryCode === 'SN' ? 'SN' : prev.country,
            // Store coordinates for backend
            lat: latitude,
            lng: longitude,
          }));
        } catch {
          alert('Impossible de determiner votre adresse. Veuillez la saisir manuellement.');
        }
        setGpsLoading(false);
      },
      () => { alert('Acces GPS refuse. Veuillez autoriser la localisation.'); setGpsLoading(false); },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, []);

  const selectedPlan = plans.find((p) => p.id === form.plan)!;
  const needsPayment = selectedPlan.price > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      // Skip payment step if basic plan
      if (step === 2 && !needsPayment) { setStep(4); return; }
      setStep(step + 1);
      return;
    }
    
    setLoading(true);
    
    try {
      // Step 1: Register the supplier using the correct endpoint
      const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.aakodessewa.com/api/api/v1'}/auth/register/supplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.fullName.split(' ')[0] || form.fullName,
          lastName: form.fullName.split(' ').slice(1).join(' ') || '',
          phone: form.phone,
          language: form.language,
          currency: form.currency,
          shopName: form.shopName,
          shopDescription: form.shopDescription,
          country: form.country,
          city: form.city,
          address: form.address,
          lat: (form as any).lat,
          lng: (form as any).lng,
        }),
      });
      
      if (!registerResponse.ok) {
        const error = await registerResponse.json().catch(() => ({}));
        throw new Error(error.message || 'Registration failed');
      }
      
      const registerData = await registerResponse.json();
      console.log('Registration response:', registerData); // Debug log
      
      // Handle different response formats
      const user = registerData.user || registerData;
      const tokens = registerData.tokens || registerData.accessToken || registerData;
      
      // Store tokens with correct keys
      if (tokens) {
        localStorage.setItem('supplier_auth_tokens', JSON.stringify(tokens));
      }
      localStorage.setItem('supplier_user', JSON.stringify(user));
      
      // Step 2: No need to create shop separately - backend already created it with supplier registration
      console.log('Shop already created by backend:', user.shop);
      
      // Step 3: Handle subscription/payment if needed
      if (needsPayment && selectedPlan.price > 0) {
        // TODO: Implement payment processing for paid plans
        console.log('Payment processing not implemented yet');
      }
      
      // Success! Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Erreur: ${error instanceof Error ? error.message : 'Une erreur est survenue'}`);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    // Skip payment step if basic plan
    if (step === 4 && !needsPayment) { setStep(2); return; }
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <span className="text-white text-xl font-bold">Akodessewa</span>
          </div>
        </div>
        <div className="relative z-10 space-y-8">
          <h1 className="text-3xl font-bold text-white leading-tight">Rejoignez la 1ere place de marche de pieces auto en Afrique de l&apos;Ouest.</h1>
          <div className="space-y-4">
            {['Inscription gratuite et rapide', 'Gerez vos produits facilement', 'Recevez des paiements securises', 'Analysez vos performances'].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-white" />
                </div>
                <span className="text-white/80 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-white/40 text-xs">&copy; 2025 Akodessewa.com &mdash; Imaginov Cyber Tech</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-start justify-center p-6 lg:p-12 bg-gray-50 overflow-y-auto min-h-screen">
        <div className="w-full max-w-xl py-4">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-lg font-bold text-brand-600">Akodessewa</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Creer votre compte</h2>
          <p className="text-gray-500 text-sm mb-6">Commencez a vendre en quelques minutes.</p>

          {/* Steps */}
          <div className="flex items-center gap-1 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${
                  i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-[10px] font-medium hidden sm:inline ${i <= step ? 'text-gray-700' : 'text-gray-400'}`}>{s}</span>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 0: Account */}
            {step === 0 && (
              <>
                <div>
                  <label className="form-label">Nom complet</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Jean Dupont" className="form-input pl-11" required />
                  </div>
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="votre@email.com" className="form-input pl-11" required />
                  </div>
                </div>
                <div>
                  <label className="form-label">Telephone</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+228 90 XX XX XX" className="form-input pl-11" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Mot de passe</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Min. 8 caract." className="form-input pl-11" required />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Confirmer</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={showPw ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="Confirmer" className="form-input pl-11" required />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label"><Globe size={14} className="inline mr-1" />Langue</label>
                    <select value={form.language} onChange={(e) => update('language', e.target.value)} className="form-input">
                      {languages.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label"><Coins size={14} className="inline mr-1" />Devise</label>
                    <select value={form.currency} onChange={(e) => update('currency', e.target.value)} className="form-input">
                      {currencies.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Shop */}
            {step === 1 && (
              <>
                <div>
                  <label className="form-label">Nom de la boutique</label>
                  <div className="relative">
                    <Store size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={form.shopName} onChange={(e) => update('shopName', e.target.value)} placeholder="Auto Fiable SARL" className="form-input pl-11" required />
                  </div>
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea value={form.shopDescription} onChange={(e) => update('shopDescription', e.target.value)} placeholder="Decrivez votre activite..." className="form-input min-h-[90px] resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Pays</label>
                    <select value={form.country} onChange={(e) => update('country', e.target.value)} className="form-input">
                      <option value="">Selectionner</option>
                      <option value="TG">Togo</option>
                      <option value="GH">Ghana</option>
                      <option value="BJ">Benin</option>
                      <option value="CI">Cote d&apos;Ivoire</option>
                      <option value="NG">Nigeria</option>
                      <option value="SN">Senegal</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Ville</label>
                    <input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Lome" className="form-input" required />
                  </div>
                </div>
                <div>
                  <label className="form-label">Adresse complete</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="15 Rue du Commerce, Lome" className="form-input pl-11" required />
                    </div>
                    <button
                      type="button"
                      onClick={useGPS}
                      disabled={gpsLoading}
                      className="btn-secondary flex-shrink-0 gap-1.5 px-3"
                      title="Utiliser le GPS"
                    >
                      {gpsLoading ? <Loader2 size={16} className="animate-spin" /> : <LocateFixed size={16} />}
                      <span className="hidden sm:inline text-xs">GPS</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Cliquez sur GPS pour detecter automatiquement votre adresse</p>
                </div>
              </>
            )}

            {/* Step 2: Subscription */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Choisissez votre abonnement</h3>
                <p className="text-sm text-gray-500 mb-6">Selectionnez le forfait adapte a vos besoins. Changeable a tout moment.</p>
                <div className="space-y-4">
                  {plans.map((plan) => {
                    const Icon = plan.icon;
                    const selected = form.plan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => update('plan', plan.id)}
                        className={`w-full text-left rounded-xl border-2 p-5 transition-all relative ${
                          selected ? `${plan.border} ${plan.bg} shadow-md` : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2.5 right-4 bg-brand-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                            POPULAIRE
                          </span>
                        )}
                        <div className="flex items-start gap-4">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${selected ? plan.bg : 'bg-gray-100'}`}>
                            <Icon size={22} className={selected ? plan.color : 'text-gray-400'} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-gray-900">{plan.name}</h4>
                              <div className="text-right">
                                <span className="text-lg font-bold text-gray-900">{plan.priceLabel}</span>
                                {plan.period && <span className="text-xs text-gray-400 ml-1">{plan.period}</span>}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                              {plan.features.map((f, i) => (
                                <span key={i} className="text-xs text-gray-500 flex items-center gap-1.5">
                                  <Check size={12} className={selected ? 'text-emerald-500' : 'text-gray-300'} />
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            selected ? 'border-brand-600 bg-brand-600' : 'border-gray-300'
                          }`}>
                            {selected && <Check size={12} className="text-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Paiement de l&apos;abonnement</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="badge badge-info">{selectedPlan.name}</span>
                  <span className="text-sm text-gray-500">&mdash; {selectedPlan.priceLabel} {selectedPlan.period}</span>
                </div>

                {/* Payment method selector */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => update('paymentMethod', 'mobile_money')}
                    className={`rounded-xl border-2 p-4 text-center transition-all ${
                      form.paymentMethod === 'mobile_money' ? 'border-brand-600 bg-brand-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Smartphone size={28} className={`mx-auto mb-2 ${form.paymentMethod === 'mobile_money' ? 'text-brand-600' : 'text-gray-400'}`} />
                    <p className="text-sm font-semibold text-gray-800">Mobile Money</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mixx by Yas, Moov Money</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => update('paymentMethod', 'card')}
                    className={`rounded-xl border-2 p-4 text-center transition-all ${
                      form.paymentMethod === 'card' ? 'border-brand-600 bg-brand-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <CreditCard size={28} className={`mx-auto mb-2 ${form.paymentMethod === 'card' ? 'text-brand-600' : 'text-gray-400'}`} />
                    <p className="text-sm font-semibold text-gray-800">Carte Bancaire</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Visa, Mastercard</p>
                  </button>
                </div>

                {form.paymentMethod === 'mobile_money' && (
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Numero Mobile Money</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={form.mobileNumber} onChange={(e) => update('mobileNumber', e.target.value)} placeholder="+228 90 XX XX XX" className="form-input pl-11" required />
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                      <Smartphone size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-amber-700">Vous recevrez une demande de paiement sur votre telephone. Confirmez le paiement de <strong>{selectedPlan.priceLabel}</strong> pour activer votre abonnement.</p>
                    </div>
                  </div>
                )}

                {form.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Numero de carte</label>
                      <div className="relative">
                        <CreditCard size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" className="form-input pl-11" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Expiration</label>
                        <input value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} placeholder="MM/AA" className="form-input" required />
                      </div>
                      <div>
                        <label className="form-label">CVC</label>
                        <input value={form.cardCvc} onChange={(e) => update('cardCvc', e.target.value)} placeholder="123" className="form-input" required />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Abonnement {selectedPlan.name}</span>
                    <span className="font-semibold">{selectedPlan.priceLabel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Periode</span>
                    <span className="font-medium">3 mois (trimestre)</span>
                  </div>
                  <hr className="my-2 border-gray-200" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-brand-600">{selectedPlan.priceLabel}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tout est pret !</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  Verifiez vos informations puis cliquez sur &quot;Creer mon compte&quot; pour commencer.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
                  <p><span className="text-gray-400">Nom:</span> <span className="font-medium">{form.fullName}</span></p>
                  <p><span className="text-gray-400">Email:</span> <span className="font-medium">{form.email}</span></p>
                  <p><span className="text-gray-400">Boutique:</span> <span className="font-medium">{form.shopName}</span></p>
                  <p><span className="text-gray-400">Adresse:</span> <span className="font-medium">{form.address}, {form.city}, {form.country}</span></p>
                  <p><span className="text-gray-400">Langue:</span> <span className="font-medium">{languages.find((l) => l.code === form.language)?.label}</span></p>
                  <p><span className="text-gray-400">Devise:</span> <span className="font-medium">{currencies.find((c) => c.code === form.currency)?.label}</span></p>
                  <hr className="border-gray-200" />
                  <p><span className="text-gray-400">Abonnement:</span> <span className="font-bold">{selectedPlan.name}</span> &mdash; <span className="text-brand-600 font-semibold">{selectedPlan.priceLabel}</span>{selectedPlan.period ? ` ${selectedPlan.period}` : ''}</p>
                  {needsPayment && (
                    <p><span className="text-gray-400">Paiement:</span> <span className="font-medium">{form.paymentMethod === 'mobile_money' ? `Mobile Money (${form.mobileNumber})` : `Carte bancaire (...${form.cardNumber.slice(-4)})`}</span></p>
                  )}
                </div>
                <label className="flex items-center gap-2 mt-6 justify-center">
                  <input type="checkbox" checked={form.agreeTerms} onChange={(e) => update('agreeTerms', e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-600" />
                  <span className="text-sm text-gray-600">J&apos;accepte les <a href="#" className="text-brand-600 underline">conditions generales</a></span>
                </label>
              </div>
            )}

            <div className="flex gap-3">
              {step > 0 && (
                <button type="button" onClick={goBack} className="btn-secondary flex-1">Retour</button>
              )}
              <button type="submit" disabled={loading || (step === 4 && !form.agreeTerms)} className="btn-primary flex-1 py-3">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : step === 4 ? (
                  <>Creer mon compte <ArrowRight size={18} /></>
                ) : step === 2 && !needsPayment ? (
                  <>Passer au resume <ArrowRight size={18} /></>
                ) : (
                  <>Continuer <ArrowRight size={18} /></>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Deja inscrit ?{' '}
            <Link href="/login" className="text-brand-600 font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
