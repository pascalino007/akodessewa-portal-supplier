import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchActiveSlides } from '../../redux/slices/slidesSlice';
import { fetchBrands } from '../../redux/slices/brandsSlice';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { fetchFeaturedProducts } from '../../redux/slices/productsSlice';

type Props = StackScreenProps<RootStackParamList, 'MotoHome'>;

const { width } = Dimensions.get('window');

const bannerSlides = [
  { id: '1', title: 'Pièces Moto Premium', subtitle: 'Jusqu\'à -40% sur les kits chaîne', color: '#ff6b00' },
  { id: '2', title: 'Casques & Équipements', subtitle: 'Protection certifiée CE', color: '#e52727' },
  { id: '3', title: 'Entretien Moto', subtitle: 'Huile, filtres, bougies...', color: '#1a237e' },
];

const motoCategories = [
  { id: '1', name: 'Moteur', icon: 'settings' },
  { id: '2', name: 'Freinage', icon: 'disc' },
  { id: '3', name: 'Transmission', icon: 'link' },
  { id: '4', name: 'Électrique', icon: 'zap' },
  { id: '5', name: 'Carrosserie', icon: 'shield' },
  { id: '6', name: 'Échappement', icon: 'wind' },
  { id: '7', name: 'Suspension', icon: 'trending-up' },
  { id: '8', name: 'Accessoires', icon: 'package' },
];

const popularParts = [
  { id: '1', name: 'Kit Chaîne DID VX3', brand: 'DID', price: 55000, oldPrice: 65000, rating: 4.6 },
  { id: '2', name: 'Plaquettes Frein AV', brand: 'Brembo', price: 18000, oldPrice: 22000, rating: 4.8 },
  { id: '3', name: 'Pneu Michelin Pilot', brand: 'Michelin', price: 42000, oldPrice: null, rating: 4.7 },
  { id: '4', name: 'Huile Motul 5100 4T', brand: 'Motul', price: 12000, oldPrice: 15000, rating: 4.9 },
  { id: '5', name: 'Rétroviseur CNC', brand: 'Generic', price: 8000, oldPrice: 12000, rating: 4.2 },
  { id: '6', name: 'Poignées Racing', brand: 'Domino', price: 6500, oldPrice: 9000, rating: 4.5 },
];

const motoTypes = [
  { id: '1', name: 'Sport', icon: 'zap' },
  { id: '2', name: 'Roadster', icon: 'compass' },
  { id: '3', name: 'Trail', icon: 'map' },
  { id: '4', name: 'Scooter', icon: 'navigation' },
  { id: '5', name: 'Custom', icon: 'star' },
  { id: '6', name: 'Cross', icon: 'flag' },
];

const topBrands = [
  { id: '1', name: 'Yamaha' },
  { id: '2', name: 'Honda' },
  { id: '3', name: 'Suzuki' },
  { id: '4', name: 'Kawasaki' },
  { id: '5', name: 'BMW' },
  { id: '6', name: 'KTM' },
  { id: '7', name: 'Ducati' },
  { id: '8', name: 'Bajaj' },
];

const MotoHome = ({ navigation }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [vinInput, setVinInput] = useState('');
  const appDispatch = useAppDispatch();
  const { items: apiSlides } = useAppSelector((state) => state.slides);
  const { items: apiBrands } = useAppSelector((state) => state.brands);
  const { items: apiCategories } = useAppSelector((state) => state.categories);
  const { featured: apiFeatured, isLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    appDispatch(fetchActiveSlides('moto'));
    appDispatch(fetchBrands());
    appDispatch(fetchCategories('moto'));
    appDispatch(fetchFeaturedProducts(10));
  }, []);

  // Map API slides or fallback
  const slides = useMemo(() => {
    if (apiSlides.length > 0) {
      const colors_ = ['#ff6b00', '#e52727', '#1a237e', '#2e7d32', '#6a1b9a'];
      return apiSlides.map((s: any, i: number) => ({
        id: String(s.id),
        title: s.title || s.name || 'Offre',
        subtitle: s.subtitle || s.description || '',
        color: colors_[i % colors_.length],
      }));
    }
    return bannerSlides;
  }, [apiSlides]);

  // Map API brands or fallback
  const brands = useMemo(() => {
    if (apiBrands.length > 0) {
      return apiBrands.map((b: any) => ({ id: String(b.id), name: b.name }));
    }
    return topBrands;
  }, [apiBrands]);

  // Map API categories or fallback
  const categories = useMemo(() => {
    const iconMap: Record<string, string> = {
      'Moteur': 'settings', 'Freinage': 'disc', 'Transmission': 'link',
      'Électrique': 'zap', 'Carrosserie': 'shield', 'Échappement': 'wind',
      'Suspension': 'trending-up', 'Accessoires': 'package',
    };
    if (apiCategories.length > 0) {
      return apiCategories.map((c: any) => ({
        id: String(c.id),
        name: c.name,
        icon: iconMap[c.name] || 'grid',
      }));
    }
    return motoCategories;
  }, [apiCategories]);

  // Map API featured products or fallback
  const parts = useMemo(() => {
    if (apiFeatured.length > 0) {
      return apiFeatured.map((p: any) => ({
        id: String(p.id),
        name: p.name,
        brand: p.brand?.name || '',
        price: p.price,
        oldPrice: p.compareAtPrice && p.compareAtPrice > p.price ? p.compareAtPrice : null,
        rating: p.averageRating || 4.5,
        slug: p.slug,
      }));
    }
    return popularParts;
  }, [apiFeatured]);

  const formatPrice = (price: number) => price.toLocaleString('fr-FR') + ' FCFA';

  const handleVinSearch = () => {
    if (vinInput.trim().length >= 17) {
      navigation.navigate('VehicleSearch', { mode: 'vin', vin: vinInput.trim() });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <FeatherIcon name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>MOTO</Text>
          <Text style={styles.headerSubtitle}>Pièces & Accessoires</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={styles.headerBtn}
        >
          <FeatherIcon name="search" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Slider */}
        <View style={styles.bannerSection}>
          <FlatList
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            renderItem={({ item }) => (
              <View style={[styles.bannerSlide, { backgroundColor: item.color }]}>
                <FeatherIcon name="zap" size={40} color="rgba(255,255,255,0.3)" style={styles.bannerBgIcon} />
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                <TouchableOpacity
                  style={styles.bannerBtn}
                  onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
                >
                  <Text style={styles.bannerBtnText}>Voir les offres</Text>
                  <FeatherIcon name="arrow-right" size={14} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            )}
          />
          {/* Dots */}
          <View style={styles.dotRow}>
            {slides.map((_: any, i: number) => {
              const dotWidth = scrollX.interpolate({
                inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                outputRange: [8, 20, 8],
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

        {/* VIN Search */}
        <View style={[styles.vinSection, { backgroundColor: colors.card }]}>
          <View style={styles.vinHeader}>
            <FeatherIcon name="search" size={18} color={COLORS.primary} />
            <Text style={[styles.vinTitle, { color: colors.title }]}>Recherche par VIN</Text>
          </View>
          <View style={[styles.vinInputRow, { borderColor: colors.border }]}>
            <TextInput
              style={[styles.vinInput, { color: colors.title }]}
              placeholder="Entrez le VIN de votre moto (17 car.)"
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

        {/* Moto Types */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Type de Moto</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typesRow}>
            {motoTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
              >
                <View style={[styles.typeIconCircle, { backgroundColor: COLORS.primaryLight }]}>
                  <FeatherIcon name={type.icon} size={20} color={COLORS.primary} />
                </View>
                <Text style={[styles.typeName, { color: colors.title }]}>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Catégories</Text>
          <View style={styles.catGrid}>
            {categories.map((cat: any) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
              >
                <View style={[styles.catIconCircle, { backgroundColor: COLORS.primaryLight }]}>
                  <FeatherIcon name={cat.icon} size={22} color={COLORS.primary} />
                </View>
                <Text style={[styles.catName, { color: colors.title }]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Brands */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Marques Populaires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandsRow}>
            {brands.map((brand: any) => (
              <TouchableOpacity
                key={brand.id}
                style={[styles.brandCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('SupplierProfile', { slug: brand.name.toLowerCase(), name: brand.name })}
              >
                <View style={[styles.brandLogo, { backgroundColor: COLORS.primaryLight }]}>
                  <Text style={[styles.brandLogoText, { color: COLORS.primary }]}>{brand.name.charAt(0)}</Text>
                </View>
                <Text style={[styles.brandName, { color: colors.title }]}>{brand.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Parts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.title }]}>Pièces Populaires</Text>
            <TouchableOpacity onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}>
              <Text style={[styles.seeAll, { color: COLORS.primary }]}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.partsRow}>
            {parts.map((part: any) => (
              <TouchableOpacity
                key={part.id}
                style={[styles.partCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('ProductsDetails', { slug: part.slug })}
              >
                <View style={[styles.partImage, { backgroundColor: colors.background }]}>
                  <FeatherIcon name="box" size={28} color={colors.text} />
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

        {/* Switch to Cars Banner */}
        <TouchableOpacity
          style={[styles.switchBanner, { backgroundColor: colors.card }]}
          onPress={() => navigation.goBack()}
        >
          <View style={[styles.switchIconCircle, { backgroundColor: COLORS.primaryLight }]}>
            <FeatherIcon name="truck" size={24} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchTitle, { color: colors.title }]}>
              Pièces Auto ?
            </Text>
            <Text style={[styles.switchSubtitle, { color: colors.text }]}>
              Basculez vers la section automobile
            </Text>
          </View>
          <FeatherIcon name="chevron-right" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        {/* WhatsApp CTA */}
        <TouchableOpacity
          style={[styles.whatsappCta, { backgroundColor: COLORS.whatsapp }]}
          onPress={() => {}}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { ...FONTS.h5, color: COLORS.white, letterSpacing: 3 },
  headerSubtitle: { ...FONTS.fontRegular, fontSize: 11, color: 'rgba(255,255,255,0.8)' },
  bannerSection: { marginBottom: 10 },
  bannerSlide: {
    width: width,
    height: 180,
    justifyContent: 'center',
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerBgIcon: { position: 'absolute', right: 30, top: 30 },
  bannerTitle: { ...FONTS.h4, color: COLORS.white, marginBottom: 4 },
  bannerSubtitle: { ...FONTS.font, color: 'rgba(255,255,255,0.85)', marginBottom: 16 },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  bannerBtnText: { ...FONTS.fontSemiBold, fontSize: 13, color: COLORS.primary },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  dot: { height: 6, borderRadius: 3 },
  vinSection: {
    margin: 15,
    padding: 16,
    borderRadius: SIZES.radius_sm,
  },
  vinHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  vinTitle: { ...FONTS.fontSemiBold, fontSize: 15 },
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
    height: 44,
    paddingHorizontal: 12,
  },
  vinBtn: {
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { paddingHorizontal: 15, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { ...FONTS.h6, marginBottom: 12 },
  seeAll: { ...FONTS.fontMedium, fontSize: 13 },
  typesRow: { gap: 10 },
  typeCard: {
    width: 80,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: SIZES.radius_sm,
  },
  typeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  typeName: { ...FONTS.fontMedium, fontSize: 12 },
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
  catIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  catName: { ...FONTS.fontMedium, fontSize: 11, textAlign: 'center' },
  brandsRow: { gap: 10 },
  brandCard: {
    width: 80,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: SIZES.radius_sm,
  },
  brandLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  brandLogoText: { fontSize: 22, fontFamily: 'Jost-Bold' },
  brandName: { ...FONTS.fontMedium, fontSize: 11 },
  partsRow: { gap: 10 },
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
  switchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    padding: 16,
    borderRadius: SIZES.radius_sm,
    gap: 12,
    marginBottom: 12,
  },
  switchIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchTitle: { ...FONTS.fontSemiBold, fontSize: 15 },
  switchSubtitle: { ...FONTS.fontRegular, fontSize: 12 },
  whatsappCta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    padding: 16,
    borderRadius: SIZES.radius_sm,
    gap: 12,
  },
  whatsappTitle: { ...FONTS.fontSemiBold, fontSize: 15, color: COLORS.white },
  whatsappSubtitle: { ...FONTS.fontRegular, fontSize: 12, color: 'rgba(255,255,255,0.8)' },
});

export default MotoHome;
