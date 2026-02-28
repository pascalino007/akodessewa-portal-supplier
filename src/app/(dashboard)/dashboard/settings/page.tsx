'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Store, User, MapPin, Phone, Mail, X, Loader2, Upload } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<'banner' | 'logo' | null>(null);
  const [shop, setShop] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const shopFormRef = useRef<HTMLFormElement>(null);
  const profileFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { getMyShop, getProfile } = await import('@/lib/api');
      const [s, p] = await Promise.all([
        getMyShop().catch((err) => { console.error('getMyShop error:', err); return null; }),
        getProfile().catch((err) => { console.error('getProfile error:', err); return null; }),
      ]);
      console.log('Shop loaded:', s);
      console.log('Profile loaded:', p);
      setShop(s?.data || s);
      setProfile(p?.data || p);
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  }

  const handleSaveShop = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { updateMyShop } = await import('@/lib/api');
      if (shopFormRef.current) {
        const fd = new FormData(shopFormRef.current);
        const data = {
          name: fd.get('shopName'), 
          description: fd.get('description'),
          phone: fd.get('shopPhone'), 
          country: fd.get('country'),
          city: fd.get('city'), 
          address: fd.get('address'),
        };
        console.log('Saving shop data:', data);
        await updateMyShop(data);
        setMessage({ type: 'success', text: 'Boutique mise à jour avec succès!' });
      }
    } catch (err: any) {
      console.error('Failed to save shop:', err);
      setMessage({ type: 'error', text: err.message || 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { updateProfile } = await import('@/lib/api');
      if (profileFormRef.current) {
        const fd = new FormData(profileFormRef.current);
        const fullName = fd.get('fullName')?.toString() || '';
        const nameParts = fullName.split(' ');
        await updateProfile({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' '),
          email: fd.get('email'), 
          phone: fd.get('phone'),
        });
        setMessage({ type: 'success', text: 'Profil mis à jour avec succès!' });
      }
    } catch (err: any) {
      console.error('Failed to save profile:', err);
      setMessage({ type: 'error', text: err.message || 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (type: 'banner' | 'logo', file: File) => {
    if (!file) return;
    
    setUploading(type);
    setMessage(null);
    
    try {
      const { uploadFile, updateMyShop } = await import('@/lib/api');
      
      // Upload file to cloud
      const uploadRes = await uploadFile(file);
      console.log('Upload response:', uploadRes);
      
      const imageUrl = uploadRes?.data?.url || uploadRes?.url;
      if (!imageUrl) {
        throw new Error("URL de l'image non reçue");
      }
      
      // Update shop with new image
      const updateData = type === 'banner' 
        ? { bannerUrl: imageUrl }
        : { logoUrl: imageUrl };
      
      await updateMyShop(updateData);
      
      // Update local state
      setShop((prev: any) => ({ ...prev, ...updateData }));
      setMessage({ type: 'success', text: type === 'banner' ? 'Bannière mise à jour!' : 'Logo mis à jour!' });
    } catch (err: any) {
      console.error('Failed to upload image:', err);
      setMessage({ type: 'error', text: err.message || "Erreur lors de l'upload" });
    } finally {
      setUploading(null);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Paramètres</h1>
          <p className="page-subtitle">Gérez les informations de votre boutique et profil</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {message.type === 'success' ? <Save size={18} /> : <X size={18} />}
          <p>{message.text}</p>
          <button onClick={() => setMessage(null)} className="ml-auto">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shop Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Store size={20} />
              Informations de la boutique
            </h3>
          </div>
          <div className="card-body">
            {/* Banner and Logo Upload */}
            <div className="space-y-4 mb-6">
              {/* Banner */}
              <div 
                className="h-40 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden border-2 border-dashed border-gray-300"
                style={{ 
                  background: shop?.bannerUrl 
                    ? `url(${shop.bannerUrl}) center/cover` 
                    : 'linear-gradient(to right, #ea580c, #c2410c)'
                }}
                onClick={() => bannerInputRef.current?.click()}
              >
                {uploading === 'banner' ? (
                  <Loader2 size={24} className="text-white animate-spin" />
                ) : !shop?.bannerUrl ? (
                  <div className="text-center text-white/70">
                    <Upload size={24} className="mx-auto mb-1" />
                    <p className="text-xs">Cliquez pour ajouter une bannière (1200x300)</p>
                  </div>
                ) : null}
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload('banner', file);
                  }}
                />
              </div>
              
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div 
                  className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative overflow-hidden border-2 border-dashed border-gray-300"
                  onClick={() => logoInputRef.current?.click()}
                >
                  {uploading === 'logo' ? (
                    <Loader2 size={20} className="text-gray-400 animate-spin" />
                  ) : shop?.logoUrl ? (
                    <img src={shop.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Upload size={20} className="text-gray-400" />
                  )}
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('logo', file);
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Logo de la boutique</p>
                  <p className="text-xs text-gray-400">
                    {shop?.logoUrl ? 'Cliquez pour changer' : 'PNG ou JPG, 200x200px recommandé'}
                  </p>
                </div>
              </div>
            </div>

            <form ref={shopFormRef} className="space-y-4">
              <div>
                <label className="form-label">Nom de la boutique</label>
                <div className="relative">
                  <Store size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="shopName" 
                    defaultValue={shop?.name || ''} 
                    className="form-input pl-11" 
                    placeholder="Nom de votre boutique"
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={shop?.description || ''} 
                  className="form-input min-h-[80px] resize-none" 
                  placeholder="Décrivez votre boutique..."
                />
              </div>

              <div>
                <label className="form-label">Téléphone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="shopPhone" 
                    defaultValue={shop?.phone || ''} 
                    className="form-input pl-11" 
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Pays</label>
                  <select name="country" defaultValue={shop?.country || 'TG'} className="form-input">
                    <option value="TG">Togo</option>
                    <option value="GH">Ghana</option>
                    <option value="BJ">Bénin</option>
                    <option value="CI">Côte d'Ivoire</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Ville</label>
                  <input 
                    name="city" 
                    defaultValue={shop?.city || ''} 
                    className="form-input" 
                    placeholder="Lomé"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Adresse</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="address" 
                    defaultValue={shop?.address || ''} 
                    className="form-input pl-11" 
                    placeholder="Adresse complète"
                  />
                </div>
              </div>

              <button 
                type="button"
                onClick={handleSaveShop} 
                disabled={saving} 
                className="btn-primary w-full"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Enregistrement...' : 'Enregistrer la boutique'}
              </button>
            </form>
          </div>
        </div>

        {/* Owner Profile */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User size={20} />
              Informations personnelles
            </h3>
          </div>
          <div className="card-body">
            <form ref={profileFormRef} className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl">
                  {(profile?.firstName?.[0] || '?').toUpperCase()}{(profile?.lastName?.[0] || '').toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {profile ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() : 'Chargement...'}
                  </p>
                  <p className="text-xs text-gray-400">Propriétaire de la boutique</p>
                </div>
              </div>

              <div>
                <label className="form-label">Nom complet</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="fullName" 
                    defaultValue={profile ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() : ''} 
                    className="form-input pl-11" 
                    placeholder="Prénom Nom"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="email" 
                    type="email"
                    defaultValue={profile?.email || ''} 
                    className="form-input pl-11" 
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Téléphone personnel</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="phone" 
                    defaultValue={profile?.phone || ''} 
                    className="form-input pl-11" 
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
              </div>

              <button 
                type="button"
                onClick={handleSaveProfile} 
                disabled={saving} 
                className="btn-primary w-full"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Enregistrement...' : 'Enregistrer le profil'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
