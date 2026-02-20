import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Linking,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../redux/actions/drawerAction';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchActiveSlides } from '../../redux/slices/slidesSlice';
import { fetchFeaturedProducts } from '../../redux/slices/productsSlice';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { fetchBrands } from '../../redux/slices/brandsSlice';
import { fetchShops } from '../../redux/slices/shopsSlice';

const { width } = Dimensions.get('window');

// ─── DATA ────────────────────────────────────────────────────────────────────

const heroBanners = [
  { id: '1', title: 'Pièces Auto de Qualité', subtitle: 'Livraison rapide en Afrique de l\'Ouest', color: COLORS.primary },
  { id: '2', title: 'Promo -30%', subtitle: 'Sur les filtres et plaquettes de frein', color: '#1a237e' },
  { id: '3', title: 'Recherche par VIN', subtitle: 'Trouvez la pièce exacte pour votre véhicule', color: '#2e7d32' },
];

const quickActions = [
  { id: '1', icon: 'search', label: 'Chercher', route: 'VehicleSearch' },
  { id: '2', icon: 'zap', label: 'Motos', route: 'MotoHome' },
  { id: '3', icon: 'tool', label: 'Garages', route: 'Garages' },
  { id: '4', icon: 'truck', label: 'Occasion', route: 'UsedVehicles' },
  { id: '5', icon: 'package', label: 'Suivi', route: 'TrackOrder' },
  { id: '6', icon: 'globe', label: 'Langue', route: 'LanguageCurrency' },
];

const autoCategories = [
  { id: '1', name: 'Moteur', icon: 'settings' },
  { id: '2', name: 'Freinage', icon: 'disc' },
  { id: '3', name: 'Filtration', icon: 'filter' },
  { id: '4', name: 'Suspension', icon: 'trending-up' },
  { id: '5', name: 'Électricité', icon: 'zap' },
  { id: '6', name: 'Carrosserie', icon: 'shield' },
  { id: '7', name: 'Transmission', icon: 'link' },
  { id: '8', name: 'Échappement', icon: 'wind' },
];

const popularParts = [
  { id: '1', name: 'Filtre à huile Bosch', brand: 'Bosch', price: 8500, oldPrice: 12000, rating: 4.7 },
  { id: '2', name: 'Plaquettes frein TRW', brand: 'TRW', price: 28000, oldPrice: 35000, rating: 4.8 },
  { id: '3', name: 'Courroie distrib. Gates', brand: 'Gates', price: 42000, oldPrice: null, rating: 4.5 },
  { id: '4', name: 'Amortisseur Monroe', brand: 'Monroe', price: 38000, oldPrice: 45000, rating: 4.4 },
  { id: '5', name: 'Bougie NGK BKR6E', brand: 'NGK', price: 3500, oldPrice: 5000, rating: 4.9 },
  { id: '6', name: 'Disque frein Brembo', brand: 'Brembo', price: 48000, oldPrice: null, rating: 4.7 },
];

const topSuppliers = [
  { id: '1', name: 'AutoParts TG', slug: 'autoparts-tg' },
  { id: '2', name: 'Brake Master', slug: 'brake-master' },
  { id: '3', name: 'Moto Parts', slug: 'moto-parts' },
  { id: '4', name: 'ElectroPro', slug: 'electropro' },
  { id: '5', name: 'SuspensionPro', slug: 'suspensionpro' },
  { id: '6', name: 'FiltrePlus', slug: 'filtreplus' },
];

const countries = [
  { id: '1', name: 'Togo', flag: '🇹🇬' },
  { id: '2', name: 'Bénin', flag: '🇧🇯' },
  { id: '3', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { id: '4', name: 'Ghana', flag: '🇬🇭' },
  { id: '5', name: 'Sénégal', flag: '🇸🇳' },
  { id: '6', name: 'Nigeria', flag: '🇳🇬' },
];

const trustBadges = [
  { icon: 'truck', title: 'Livraison Rapide', subtitle: 'Partout en Afrique' },
  { icon: 'shield', title: 'Paiement Sécurisé', subtitle: 'Transactions protégées' },
  { icon: 'refresh-cw', title: 'Retours Gratuits', subtitle: 'Sous 30 jours' },
  { icon: 'headphones', title: 'Support 24/7', subtitle: 'Appelez ou WhatsApp' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const slides = useAppSelector((state) => state.slides.items);
  const featuredProducts = useAppSelector((state) => state.products.featured);
  const apiCategories = useAppSelector((state) => state.categories.items);
  const apiBrands = useAppSelector((state) => state.brands.items);
  const apiShops = useAppSelector((state) => state.shops.items);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [vinInput, setVinInput] = useState('');

  useEffect(() => {
    appDispatch(fetchActiveSlides('home'));
    appDispatch(fetchFeaturedProducts(10));
    appDispatch(fetchCategories(undefined));
    appDispatch(fetchBrands());
    appDispatch(fetchShops({}));
  }, []);

  // Use API data when available, fall back to hardcoded
  const displayCategories = apiCategories.length > 0
    ? apiCategories.slice(0, 8).map(c => ({ id: c.id, name: c.name, icon: 'settings' }))
    : autoCategories;

  const displayParts = featuredProducts.length > 0
    ? featuredProducts.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand?.name || '',
        price: Number(p.price),
        oldPrice: p.comparePrice ? Number(p.comparePrice) : null,
        rating: p.rating,
        image: p.images?.find(img => img.isMain)?.url || p.images?.[0]?.url || null,
        slug: p.slug,
      }))
    : popularParts.map(p => ({ ...p, image: null, slug: '' }));

  const displaySuppliers = apiShops.length > 0
    ? apiShops.slice(0, 6).map(s => ({ id: s.id, name: s.name, slug: s.slug, logo: s.logo }))
    : topSuppliers.map(s => ({ ...s, logo: null }));

  const displayBanners = slides.length > 0
    ? slides.map(s => ({ id: s.id, title: s.title || '', subtitle: s.subtitle || '', color: COLORS.primary, imageUrl: s.imageUrl }))
    : heroBanners.map(b => ({ ...b, imageUrl: null }));

  const formatPrice = (price: number) => price.toLocaleString('fr-FR') + ' FCFA';

  const handleVinSearch = () => {
    if (vinInput.trim().length >= 17) {
      navigation.navigate('VehicleSearch', { mode: 'vin', vin: vinInput.trim() });
    }
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* ─── HEADER ─── */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => dispatch(openDrawer())} style={styles.headerBtn}>
          <FeatherIcon name="menu" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerBrand}>AKODESSEWA</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.headerBtn}>
            <FeatherIcon name="search" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.headerBtn}>
            <FeatherIcon name="bell" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ─── HERO BANNER SLIDER ─── */}
        <View>
          <FlatList
            data={displayBanners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }: any) => (
              <View style={[styles.heroBanner, { backgroundColor: item.color }]}>
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                ) : (
                  <FeatherIcon name="truck" size={60} color="rgba(255,255,255,0.15)" style={styles.heroBgIcon} />
                )}
                <Text style={styles.heroTitle}>{item.title}</Text>
                <Text style={styles.heroSubtitle}>{item.subtitle}</Text>
                <TouchableOpacity
                  style={styles.heroCta}
                  onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
                >
                  <Text style={styles.heroCtaText}>Explorer</Text>
                  <FeatherIcon name="arrow-right" size={14} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.dotRow}>
            {displayBanners.map((_, i) => {
              const dotWidth = scrollX.interpolate({
                inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                outputRange: [8, 22, 8],
                extrapolate: 'clamp',
              });
              const dotOpacity = scrollX.interpolate({
                inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={i}
                  style={[styles.dot, { width: dotWidth, opacity: dotOpacity, backgroundColor: COLORS.primary }]}
                />
              );
            })}
          </View>
        </View>

        {/* ─── QUICK ACTIONS ─── */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionItem}
                onPress={() => navigation.navigate(action.route as any)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.primaryLight }]}>
                  <FeatherIcon name={action.icon} size={20} color={COLORS.primary} />
                </View>
                <Text style={[styles.quickActionLabel, { color: colors.title }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ─── VIN SEARCH ─── */}
        <View style={[styles.vinSection, { backgroundColor: colors.card }]}>
          <View style={styles.vinHeader}>
            <FeatherIcon name="search" size={18} color={COLORS.primary} />
            <Text style={[styles.vinTitle, { color: colors.title }]}>Recherche par VIN</Text>
          </View>
          <Text style={[styles.vinDesc, { color: colors.text }]}>
            Entrez votre numéro VIN pour trouver les pièces exactes
          </Text>
          <View style={[styles.vinInputRow, { borderColor: colors.border }]}>
            <TextInput
              style={[styles.vinInput, { color: colors.title }]}
              placeholder="Ex: WVWZZZ3CZWE123456"
              placeholderTextColor={colors.text}
              value={vinInput}
              onChangeText={setVinInput}
              maxLength={17}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              onPress={handleVinSearch}
              style={[styles.vinBtn, { opacity: vinInput.length >= 17 ? 1 : 0.5 }]}
              disabled={vinInput.length < 17}
            >
              <FeatherIcon name="arrow-right" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── CATEGORIES ─── */}
        <View style={styles.sectionPadded}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Catégories</Text>
          <View style={styles.catGrid}>
            {displayCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
              >
                <View style={[styles.catIcon, { backgroundColor: COLORS.primaryLight }]}>
                  <FeatherIcon name={cat.icon} size={22} color={COLORS.primary} />
                </View>
                <Text style={[styles.catName, { color: colors.title }]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ─── SEARCH BY COUNTRY ─── */}
        <View style={styles.sectionPadded}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Rechercher par Pays</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.countryRow}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country.id}
                style={[styles.countryCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
              >
                <Text style={styles.countryFlag}>{country.flag}</Text>
                <Text style={[styles.countryName, { color: colors.title }]}>{country.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ─── POPULAR PARTS ─── */}
        <View style={styles.sectionPadded}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.title }]}>Pièces Populaires</Text>
            <TouchableOpacity onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}>
              <Text style={[styles.seeAll, { color: COLORS.primary }]}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {displayParts.map((part: any) => (
              <TouchableOpacity
                key={part.id}
                style={[styles.partCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('ProductsDetails', part.slug ? { slug: part.slug } : undefined)}
              >
                <View style={[styles.partImage, { backgroundColor: colors.background }]}>
                  {part.image ? (
                    <Image source={{ uri: part.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  ) : (
                    <FeatherIcon name="box" size={28} color={colors.text} />
                  )}
                </View>
                <View style={styles.partInfo}>
                  <Text style={[styles.partBrand, { color: COLORS.primary }]}>{part.brand}</Text>
                  <Text style={[styles.partName, { color: colors.title }]} numberOfLines={2}>{part.name}</Text>
                  <View style={styles.partRating}>
                    <FeatherIcon name="star" size={11} color={COLORS.gold} />
                    <Text style={[styles.partRatingText, { color: colors.text }]}>{part.rating}</Text>
                  </View>
                  <Text style={[styles.partPrice, { color: COLORS.primary }]}>{formatPrice(part.price)}</Text>
                  {part.oldPrice && (
                    <Text style={[styles.partOldPrice, { color: colors.text }]}>{formatPrice(part.oldPrice)}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ─── SWITCH TO MOTO ─── */}
        <TouchableOpacity
          style={[styles.switchBanner, { backgroundColor: '#ff6b00' }]}
          onPress={() => navigation.navigate('MotoHome')}
        >
          <FeatherIcon name="zap" size={28} color={COLORS.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>Pièces Moto</Text>
            <Text style={styles.switchSubtitle}>Accédez à notre section dédiée aux motos</Text>
          </View>
          <FeatherIcon name="chevron-right" size={22} color={COLORS.white} />
        </TouchableOpacity>

        {/* ─── SUPPLIERS ─── */}
        <View style={styles.sectionPadded}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.title }]}>Nos Fournisseurs</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {displaySuppliers.map((supplier: any) => (
              <TouchableOpacity
                key={supplier.id}
                style={[styles.supplierCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('SupplierProfile', { slug: supplier.slug, name: supplier.name })}
              >
                <View style={[styles.supplierLogo, { backgroundColor: COLORS.primaryLight }]}>
                  {supplier.logo ? (
                    <Image source={{ uri: supplier.logo }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                  ) : (
                    <Text style={[styles.supplierLogoText, { color: COLORS.primary }]}>
                      {supplier.name.charAt(0)}
                    </Text>
                  )}
                </View>
                <Text style={[styles.supplierName, { color: colors.title }]} numberOfLines={1}>
                  {supplier.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ─── TRUST BADGES ─── */}
        <View style={styles.sectionPadded}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {trustBadges.map((badge, index) => (
              <View key={index} style={[styles.trustCard, { backgroundColor: colors.card }]}>
                <View style={[styles.trustIcon, { backgroundColor: COLORS.primaryLight }]}>
                  <FeatherIcon name={badge.icon} size={20} color={COLORS.primary} />
                </View>
                <Text style={[styles.trustTitle, { color: colors.title }]}>{badge.title}</Text>
                <Text style={[styles.trustSubtitle, { color: colors.text }]}>{badge.subtitle}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ─── GARAGES CTA ─── */}
        <TouchableOpacity
          style={[styles.garageCta, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Garages')}
        >
          <View style={[styles.garageCtaIcon, { backgroundColor: COLORS.primaryLight }]}>
            <FeatherIcon name="tool" size={24} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.garageCtaTitle, { color: colors.title }]}>
              Trouvez un Garage
            </Text>
            <Text style={[styles.garageCtaSubtitle, { color: colors.text }]}>
              Garages partenaires vérifiés dans votre ville
            </Text>
          </View>
          <FeatherIcon name="chevron-right" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        {/* ─── WHATSAPP CTA ─── */}
        <TouchableOpacity
          style={[styles.whatsappCta, { backgroundColor: COLORS.whatsapp }]}
          onPress={() => Linking.openURL('https://wa.me/22890171212')}
        >
          <FeatherIcon name="message-circle" size={22} color={COLORS.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.whatsappTitle}>Besoin d'aide ?</Text>
            <Text style={styles.whatsappSubtitle}>Contactez-nous sur WhatsApp</Text>
          </View>
          <FeatherIcon name="chevron-right" size={20} color={COLORS.white} />
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerBrand: {
    ...FONTS.h5,
    color: COLORS.white,
    letterSpacing: 3,
  },
  headerRight: { flexDirection: 'row', gap: 10 },

  // Hero
  heroBanner: {
    width: width,
    height: 190,
    justifyContent: 'center',
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  heroBgIcon: { position: 'absolute', right: 20, bottom: 20 },
  heroTitle: { ...FONTS.h3, color: COLORS.white, marginBottom: 6 },
  heroSubtitle: { ...FONTS.font, color: 'rgba(255,255,255,0.85)', marginBottom: 18, maxWidth: '70%' },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    gap: 6,
  },
  heroCtaText: { ...FONTS.fontSemiBold, fontSize: 14, color: COLORS.primary },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  dot: { height: 6, borderRadius: 3 },

  // Quick Actions
  section: { padding: 15 },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: (width - 30) / 3 - 6,
    alignItems: 'center',
    paddingVertical: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickActionLabel: { ...FONTS.fontMedium, fontSize: 12 },

  // VIN
  vinSection: {
    margin: 15,
    marginTop: 5,
    padding: 16,
    borderRadius: SIZES.radius_sm,
  },
  vinHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  vinTitle: { ...FONTS.fontSemiBold, fontSize: 16 },
  vinDesc: { ...FONTS.fontRegular, fontSize: 13, marginBottom: 12, lineHeight: 18 },
  vinInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  vinInput: {
    flex: 1,
    ...FONTS.fontRegular,
    fontSize: 14,
    height: 46,
    paddingHorizontal: 12,
  },
  vinBtn: {
    backgroundColor: COLORS.primary,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Categories
  sectionPadded: { paddingHorizontal: 15, marginBottom: 16 },
  sectionTitle: { ...FONTS.h6, marginBottom: 12 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: { ...FONTS.fontMedium, fontSize: 13 },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catCard: {
    width: (width - 50) / 4,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: SIZES.radius_sm,
  },
  catIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  catName: { ...FONTS.fontMedium, fontSize: 11, textAlign: 'center' },

  // Countries
  countryRow: { gap: 10 },
  countryCard: {
    width: 90,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: SIZES.radius_sm,
  },
  countryFlag: { fontSize: 28, marginBottom: 6 },
  countryName: { ...FONTS.fontMedium, fontSize: 11 },

  // Parts
  partCard: {
    width: 160,
    borderRadius: SIZES.radius_sm,
    overflow: 'hidden',
  },
  partImage: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partInfo: { padding: 10 },
  partBrand: { ...FONTS.fontSemiBold, fontSize: 10, marginBottom: 2 },
  partName: { ...FONTS.fontMedium, fontSize: 13, marginBottom: 4 },
  partRating: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  partRatingText: { ...FONTS.fontRegular, fontSize: 11 },
  partPrice: { ...FONTS.fontSemiBold, fontSize: 14 },
  partOldPrice: { ...FONTS.fontRegular, fontSize: 11, textDecorationLine: 'line-through' },

  // Switch banner
  switchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 16,
    padding: 16,
    borderRadius: SIZES.radius_sm,
    gap: 12,
  },
  switchTitle: { ...FONTS.fontSemiBold, fontSize: 16, color: COLORS.white },
  switchSubtitle: { ...FONTS.fontRegular, fontSize: 12, color: 'rgba(255,255,255,0.8)' },

  // Suppliers
  supplierCard: {
    width: 90,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: SIZES.radius_sm,
  },
  supplierLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  supplierLogoText: { fontSize: 22, fontFamily: 'Jost-Bold' },
  supplierName: { ...FONTS.fontMedium, fontSize: 11, textAlign: 'center' },

  // Trust
  trustCard: {
    width: 150,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: SIZES.radius_sm,
  },
  trustIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  trustTitle: { ...FONTS.fontMedium, fontSize: 13, textAlign: 'center', marginBottom: 2 },
  trustSubtitle: { ...FONTS.fontRegular, fontSize: 11, textAlign: 'center' },

  // Garage CTA
  garageCta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 16,
    borderRadius: SIZES.radius_sm,
    gap: 12,
  },
  garageCtaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  garageCtaTitle: { ...FONTS.fontSemiBold, fontSize: 15 },
  garageCtaSubtitle: { ...FONTS.fontRegular, fontSize: 12, marginTop: 2 },

  // WhatsApp
  whatsappCta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 16,
    borderRadius: SIZES.radius_sm,
    gap: 12,
  },
  whatsappTitle: { ...FONTS.fontSemiBold, fontSize: 15, color: COLORS.white },
  whatsappSubtitle: { ...FONTS.fontRegular, fontSize: 12, color: 'rgba(255,255,255,0.8)' },
});

export default Home;