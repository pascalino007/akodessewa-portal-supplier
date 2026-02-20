import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchShopBySlug, clearCurrentShop } from '../../redux/slices/shopsSlice';

type Props = StackScreenProps<RootStackParamList, 'SupplierProfile'>;

const supplierProducts = [
  { id: '1', name: 'Filtre à huile Premium', price: 12500, oldPrice: 15000, rating: 4.5, image: null },
  { id: '2', name: 'Plaquettes de frein AV', price: 28000, oldPrice: 35000, rating: 4.7, image: null },
  { id: '3', name: 'Courroie de distribution', price: 45000, oldPrice: null, rating: 4.3, image: null },
  { id: '4', name: 'Amortisseur arrière', price: 38000, oldPrice: 42000, rating: 4.6, image: null },
  { id: '5', name: 'Bougie d\'allumage (x4)', price: 16000, oldPrice: 20000, rating: 4.4, image: null },
  { id: '6', name: 'Disque de frein ventilé', price: 32000, oldPrice: null, rating: 4.8, image: null },
];

const trustHighlights = [
  { icon: 'truck', label: 'Livraison rapide' },
  { icon: 'refresh-cw', label: 'Retours gratuits' },
  { icon: 'headphones', label: 'Support 24/7' },
  { icon: 'shield', label: 'Paiement sécurisé' },
];

const SupplierProfile = ({ navigation, route }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const { slug, name } = route.params;
  const appDispatch = useAppDispatch();
  const { currentShop, isLoading } = useAppSelector((state) => state.shops);

  useEffect(() => {
    if (slug) {
      appDispatch(fetchShopBySlug(slug));
    }
    return () => { appDispatch(clearCurrentShop()); };
  }, [slug]);

  // Map shop products from API or fallback
  const shopProducts = useMemo(() => {
    if (currentShop?.products && currentShop.products.length > 0) {
      return currentShop.products.map((p: any) => ({
        id: String(p.id),
        name: p.name,
        price: p.price,
        oldPrice: p.compareAtPrice && p.compareAtPrice > p.price ? p.compareAtPrice : null,
        rating: p.averageRating || 4.5,
        image: p.images?.find((i: any) => i.isMain)?.url || null,
        slug: p.slug,
      }));
    }
    return supplierProducts;
  }, [currentShop]);

  // Dynamic shop stats
  const shopStats = useMemo(() => {
    if (currentShop) {
      return [
        { value: currentShop.productCount ? `${currentShop.productCount}+` : '0', label: 'Produits' },
        { value: currentShop.averageRating?.toFixed(1) || '—', label: 'Note' },
        { value: '<2h', label: 'Réponse' },
        { value: currentShop.createdAt ? new Date(currentShop.createdAt).getFullYear().toString() : '—', label: 'Membre' },
      ];
    }
    return [
      { value: '250+', label: 'Produits' },
      { value: '4.7', label: 'Note' },
      { value: '<2h', label: 'Réponse' },
      { value: '2021', label: 'Membre' },
    ];
  }, [currentShop]);

  const displayName = currentShop?.name || name;

  const [vinInput, setVinInput] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleVinSearch = () => {
    if (vinInput.trim().length >= 17) {
      navigation.navigate('VehicleSearch', { mode: 'vin', vin: vinInput.trim() });
    }
  };

  const renderProduct = ({ item }: { item: typeof supplierProducts[0] }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('ProductsDetails', { slug: item.slug })}
      activeOpacity={0.7}
    >
      <View style={[styles.productImage, { backgroundColor: colors.background }]}>
        <FeatherIcon name="box" size={28} color={colors.text} />
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: colors.title }]} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.productRating}>
          <FeatherIcon name="star" size={11} color={COLORS.gold} />
          <Text style={[styles.productRatingText, { color: colors.text }]}>{item.rating}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.productPrice, { color: COLORS.primary }]}>
            {formatPrice(item.price)}
          </Text>
          {item.oldPrice && (
            <Text style={[styles.productOldPrice, { color: colors.text }]}>
              {formatPrice(item.oldPrice)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{displayName}</Text>
        <TouchableOpacity style={styles.backBtn}>
          <FeatherIcon name="share-2" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Banner */}
        <View style={[styles.profileBanner, { backgroundColor: colors.card }]}>
          <View style={styles.profileTop}>
            <View style={[styles.supplierLogo, { backgroundColor: COLORS.primaryLight }]}>
              <Text style={styles.supplierLogoText}>{displayName.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.profileTextArea}>
              <Text style={[styles.supplierName, { color: colors.title }]}>{displayName}</Text>
              <View style={styles.badgeRow}>
                <View style={[styles.badge, { backgroundColor: '#e8f5e9' }]}>
                  <FeatherIcon name="check-circle" size={11} color="#4caf50" />
                  <Text style={[styles.badgeText, { color: '#4caf50' }]}>Vérifié</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: '#fff3e0' }]}>
                  <FeatherIcon name="award" size={11} color="#ff9800" />
                  <Text style={[styles.badgeText, { color: '#ff9800' }]}>Recommandé</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: '#e3f2fd' }]}>
                  <FeatherIcon name="shield" size={11} color="#2196f3" />
                  <Text style={[styles.badgeText, { color: '#2196f3' }]}>Fiable</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {shopStats.map((stat, idx) => (
              <View key={idx} style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.title }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.text }]}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Action buttons */}
          <View style={styles.profileActions}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://wa.me/22890171212')}
              style={[styles.profileBtn, { backgroundColor: COLORS.whatsapp }]}
            >
              <FeatherIcon name="message-circle" size={16} color={COLORS.white} />
              <Text style={styles.profileBtnText}>Contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFollowing(!isFollowing)}
              style={[
                styles.profileBtn,
                {
                  backgroundColor: isFollowing ? colors.background : COLORS.primary,
                  borderWidth: isFollowing ? 1 : 0,
                  borderColor: COLORS.primary,
                },
              ]}
            >
              <FeatherIcon name={isFollowing ? 'check' : 'plus'} size={16} color={isFollowing ? COLORS.primary : COLORS.white} />
              <Text style={[styles.profileBtnText, { color: isFollowing ? COLORS.primary : COLORS.white }]}>
                {isFollowing ? 'Suivi' : 'Suivre'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trust Highlights */}
        <View style={styles.trustRow}>
          {trustHighlights.map((item, idx) => (
            <View key={idx} style={[styles.trustItem, { backgroundColor: colors.card }]}>
              <FeatherIcon name={item.icon} size={16} color={COLORS.primary} />
              <Text style={[styles.trustText, { color: colors.text }]}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* VIN Search */}
        <View style={[styles.vinSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.vinTitle, { color: colors.title }]}>
            Recherche par VIN
          </Text>
          <View style={[styles.vinInputRow, { borderColor: colors.border }]}>
            <FeatherIcon name="search" size={16} color={colors.text} />
            <TextInput
              style={[styles.vinInput, { color: colors.title }]}
              placeholder="Entrez votre numéro VIN (17 caractères)"
              placeholderTextColor={colors.text}
              value={vinInput}
              onChangeText={setVinInput}
              maxLength={17}
              autoCapitalize="characters"
            />
          </View>
          <TouchableOpacity
            onPress={handleVinSearch}
            style={[styles.vinBtn, { opacity: vinInput.length >= 17 ? 1 : 0.5 }]}
            disabled={vinInput.length < 17}
          >
            <Text style={styles.vinBtnText}>Rechercher des pièces</Text>
          </TouchableOpacity>
        </View>

        {/* Products */}
        <View style={styles.productsSection}>
          <View style={styles.productsSectionHeader}>
            <Text style={[styles.productsSectionTitle, { color: colors.title }]}>
              Produits ({shopProducts.length})
            </Text>
          </View>
          {isLoading && <ActivityIndicator size="small" color={COLORS.primary} style={{ marginBottom: 10 }} />}
          <View style={styles.productsGrid}>
            {shopProducts.map((item: any) => (
              <View key={item.id} style={styles.productGridItem}>
                {renderProduct({ item })}
              </View>
            ))}
          </View>
        </View>
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
    paddingVertical: 14,
  },
  backBtn: { padding: 4 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    ...FONTS.h5,
    color: COLORS.white,
  },
  content: { paddingBottom: 30 },
  profileBanner: {
    padding: 16,
    marginBottom: 10,
  },
  profileTop: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
  },
  supplierLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplierLogoText: {
    fontSize: 28,
    color: COLORS.primary,
    fontFamily: 'Jost-Bold',
  },
  profileTextArea: { flex: 1 },
  supplierName: {
    ...FONTS.h5,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  badgeText: {
    ...FONTS.fontRegular,
    fontSize: 10,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    paddingVertical: 12,
    marginBottom: 14,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.fontSemiBold,
    fontSize: 16,
  },
  statLabel: {
    ...FONTS.fontRegular,
    fontSize: 11,
    marginTop: 2,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 10,
  },
  profileBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: SIZES.radius,
    gap: 6,
  },
  profileBtnText: {
    ...FONTS.fontMedium,
    fontSize: 14,
    color: COLORS.white,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 8,
    marginBottom: 10,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  trustText: {
    ...FONTS.fontRegular,
    fontSize: 12,
  },
  vinSection: {
    margin: 15,
    marginTop: 5,
    padding: 16,
    borderRadius: SIZES.radius_sm,
  },
  vinTitle: {
    ...FONTS.fontSemiBold,
    fontSize: 15,
    marginBottom: 10,
  },
  vinInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    marginBottom: 10,
  },
  vinInput: {
    flex: 1,
    ...FONTS.fontRegular,
    fontSize: 14,
    height: '100%',
  },
  vinBtn: {
    backgroundColor: COLORS.primary,
    height: 42,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vinBtnText: {
    ...FONTS.fontMedium,
    fontSize: 14,
    color: COLORS.white,
  },
  productsSection: {
    paddingHorizontal: 15,
  },
  productsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productsSectionTitle: {
    ...FONTS.h6,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  productGridItem: {
    width: (SIZES.width - 40) / 2,
  },
  productCard: {
    borderRadius: SIZES.radius_sm,
    overflow: 'hidden',
  },
  productImage: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    ...FONTS.fontMedium,
    fontSize: 13,
    marginBottom: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 4,
  },
  productRatingText: {
    ...FONTS.fontRegular,
    fontSize: 11,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productPrice: {
    ...FONTS.fontSemiBold,
    fontSize: 14,
  },
  productOldPrice: {
    ...FONTS.fontRegular,
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
});

export default SupplierProfile;
