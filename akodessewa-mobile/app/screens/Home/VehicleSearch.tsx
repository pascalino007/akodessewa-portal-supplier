import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

type Props = StackScreenProps<RootStackParamList, 'VehicleSearch'>;

interface Part {
  id: string;
  name: string;
  brand: string;
  oem: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  supplier: string;
  inStock: boolean;
  vehicleType: 'car' | 'moto' | 'both';
}

const partsData: Part[] = [
  { id: '1', name: 'Filtre à huile', brand: 'Bosch', oem: 'F026407157', price: 8500, oldPrice: 12000, rating: 4.7, reviews: 89, category: 'Filtration', condition: 'new', supplier: 'AutoParts TG', inStock: true, vehicleType: 'car' },
  { id: '2', name: 'Plaquettes de frein avant', brand: 'TRW', oem: 'GDB1550', price: 28000, oldPrice: 35000, rating: 4.8, reviews: 124, category: 'Freinage', condition: 'new', supplier: 'Brake Master', inStock: true, vehicleType: 'car' },
  { id: '3', name: 'Courroie de distribution', brand: 'Gates', oem: '5508XS', price: 42000, oldPrice: null, rating: 4.5, reviews: 67, category: 'Distribution', condition: 'new', supplier: 'AutoParts TG', inStock: true, vehicleType: 'car' },
  { id: '4', name: 'Amortisseur arrière', brand: 'Monroe', oem: 'G2245', price: 38000, oldPrice: 45000, rating: 4.4, reviews: 45, category: 'Suspension', condition: 'new', supplier: 'SuspensionPro', inStock: true, vehicleType: 'car' },
  { id: '5', name: 'Kit chaîne moto', brand: 'DID', oem: 'VX3-520', price: 55000, oldPrice: 65000, rating: 4.6, reviews: 56, category: 'Transmission', condition: 'new', supplier: 'Moto Parts', inStock: true, vehicleType: 'moto' },
  { id: '6', name: 'Bougie d\'allumage NGK', brand: 'NGK', oem: 'BKR6E', price: 3500, oldPrice: 5000, rating: 4.9, reviews: 210, category: 'Allumage', condition: 'new', supplier: 'AutoParts TG', inStock: true, vehicleType: 'both' },
  { id: '7', name: 'Disque de frein ventilé', brand: 'Brembo', oem: '09.A427.14', price: 48000, oldPrice: null, rating: 4.7, reviews: 78, category: 'Freinage', condition: 'new', supplier: 'Brake Master', inStock: false, vehicleType: 'car' },
  { id: '8', name: 'Filtre à air', brand: 'Mann', oem: 'C25114/1', price: 12000, oldPrice: 15000, rating: 4.3, reviews: 34, category: 'Filtration', condition: 'new', supplier: 'AutoParts TG', inStock: true, vehicleType: 'both' },
  { id: '9', name: 'Rétroviseur moto', brand: 'Generic', oem: 'RM-200', price: 8000, oldPrice: 10000, rating: 4.1, reviews: 22, category: 'Carrosserie', condition: 'new', supplier: 'Moto Parts', inStock: true, vehicleType: 'moto' },
  { id: '10', name: 'Alternateur reconditionné', brand: 'Valeo', oem: '437454', price: 85000, oldPrice: 120000, rating: 4.2, reviews: 18, category: 'Électricité', condition: 'refurbished', supplier: 'ElectroPro', inStock: true, vehicleType: 'car' },
];

const categories = ['Tous', 'Filtration', 'Freinage', 'Distribution', 'Suspension', 'Transmission', 'Allumage', 'Carrosserie', 'Électricité'];

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
type ConditionFilter = 'all' | 'new' | 'used' | 'refurbished';
type ViewMode = 'grid' | 'list';

const VehicleSearch = ({ navigation, route }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const mode = route.params?.mode || 'search';
  const initialVin = route.params?.vin || '';

  const [search, setSearch] = useState(initialVin);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [conditionFilter, setConditionFilter] = useState<ConditionFilter>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<'all' | 'car' | 'moto'>('all');

  const allBrands = useMemo(() => [...new Set(partsData.map((p) => p.brand))], []);

  const filteredParts = useMemo(() => {
    let list = partsData;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.oem.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'Tous') list = list.filter((p) => p.category === selectedCategory);
    if (conditionFilter !== 'all') list = list.filter((p) => p.condition === conditionFilter);
    if (inStockOnly) list = list.filter((p) => p.inStock);
    if (priceMin) list = list.filter((p) => p.price >= parseInt(priceMin));
    if (priceMax) list = list.filter((p) => p.price <= parseInt(priceMax));
    if (selectedBrands.length > 0) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (vehicleTypeFilter !== 'all') list = list.filter((p) => p.vehicleType === vehicleTypeFilter || p.vehicleType === 'both');

    switch (sortBy) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [search, selectedCategory, sortBy, conditionFilter, inStockOnly, priceMin, priceMax, selectedBrands, vehicleTypeFilter]);

  const formatPrice = (price: number) => price.toLocaleString('fr-FR') + ' FCFA';

  const activeFilterCount = [
    conditionFilter !== 'all',
    inStockOnly,
    !!priceMin,
    !!priceMax,
    selectedBrands.length > 0,
    vehicleTypeFilter !== 'all',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setConditionFilter('all');
    setInStockOnly(false);
    setPriceMin('');
    setPriceMax('');
    setSelectedBrands([]);
    setVehicleTypeFilter('all');
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const sortLabels: Record<SortOption, string> = {
    relevance: 'Pertinence',
    price_asc: 'Prix croissant',
    price_desc: 'Prix décroissant',
    rating: 'Meilleures notes',
    newest: 'Plus récent',
  };

  const conditionLabels: Record<string, string> = {
    new: 'Neuf',
    used: 'Occasion',
    refurbished: 'Reconditionné',
  };

  const PartCard = ({ item }: { item: Part }) => {
    const isGrid = viewMode === 'grid';
    return (
      <TouchableOpacity
        style={[
          isGrid ? styles.partCardGrid : styles.partCardList,
          { backgroundColor: colors.card },
        ]}
        onPress={() => navigation.navigate('ProductsDetails')}
        activeOpacity={0.7}
      >
        {/* Image placeholder */}
        <View style={[isGrid ? styles.partImageGrid : styles.partImageList, { backgroundColor: colors.background }]}>
          <FeatherIcon name="box" size={isGrid ? 28 : 24} color={colors.text} />
          {!item.inStock && (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>Épuisé</Text>
            </View>
          )}
          {item.condition !== 'new' && (
            <View style={[styles.condBadge, { backgroundColor: item.condition === 'refurbished' ? '#2196f3' : '#ff9800' }]}>
              <Text style={styles.condBadgeText}>{conditionLabels[item.condition]}</Text>
            </View>
          )}
        </View>

        <View style={isGrid ? styles.partInfoGrid : styles.partInfoList}>
          <Text style={[styles.partBrand, { color: COLORS.primary }]}>{item.brand}</Text>
          <Text style={[styles.partName, { color: colors.title }]} numberOfLines={2}>{item.name}</Text>
          <Text style={[styles.partOem, { color: colors.text }]}>Réf: {item.oem}</Text>

          <View style={styles.ratingRow}>
            <FeatherIcon name="star" size={11} color={COLORS.gold} />
            <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating} ({item.reviews})</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.partPrice, { color: COLORS.primary }]}>{formatPrice(item.price)}</Text>
            {item.oldPrice && (
              <Text style={[styles.partOldPrice, { color: colors.text }]}>{formatPrice(item.oldPrice)}</Text>
            )}
          </View>

          <Text style={[styles.supplierText, { color: colors.text }]}>Par {item.supplier}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recherche de pièces</Text>
        <TouchableOpacity onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} style={styles.backBtn}>
          <FeatherIcon name={viewMode === 'grid' ? 'list' : 'grid'} size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={[styles.searchSection, { backgroundColor: colors.card }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <FeatherIcon name="search" size={18} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.title }]}
            placeholder={mode === 'vin' ? 'Recherche par VIN...' : 'Nom, marque, référence OEM...'}
            placeholderTextColor={colors.text}
            value={search}
            onChangeText={setSearch}
            autoFocus={mode !== 'vin'}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FeatherIcon name="x" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryChips}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.catChip,
                {
                  backgroundColor: selectedCategory === cat ? COLORS.primary : colors.background,
                  borderColor: selectedCategory === cat ? COLORS.primary : colors.border,
                },
              ]}
            >
              <Text style={[styles.catChipText, { color: selectedCategory === cat ? COLORS.white : colors.text }]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.resultCount, { color: colors.text }]}>
          {filteredParts.length} résultat{filteredParts.length !== 1 ? 's' : ''}
        </Text>
        <View style={styles.toolbarRight}>
          <TouchableOpacity onPress={() => setShowSort(true)} style={styles.toolbarBtn}>
            <FeatherIcon name="bar-chart-2" size={14} color={colors.text} />
            <Text style={[styles.toolbarBtnText, { color: colors.text }]}>Trier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowFilters(true)}
            style={[styles.toolbarBtn, activeFilterCount > 0 && { backgroundColor: COLORS.primaryLight }]}
          >
            <FeatherIcon name="sliders" size={14} color={activeFilterCount > 0 ? COLORS.primary : colors.text} />
            <Text style={[styles.toolbarBtnText, { color: activeFilterCount > 0 ? COLORS.primary : colors.text }]}>
              Filtres{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results */}
      <ScrollView contentContainerStyle={viewMode === 'grid' ? styles.gridContent : styles.listContent}>
        {filteredParts.length === 0 && (
          <View style={styles.emptyState}>
            <FeatherIcon name="search" size={48} color={colors.text} />
            <Text style={[styles.emptyTitle, { color: colors.title }]}>Aucun résultat</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text }]}>
              Essayez de modifier vos filtres ou votre recherche
            </Text>
          </View>
        )}
        {viewMode === 'grid' ? (
          <View style={styles.gridWrap}>
            {filteredParts.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <PartCard item={item} />
              </View>
            ))}
          </View>
        ) : (
          filteredParts.map((item) => <PartCard key={item.id} item={item} />)
        )}
      </ScrollView>

      {/* Sort Modal */}
      <Modal visible={showSort} animationType="fade" transparent>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowSort(false)}>
          <View style={[styles.sortModal, { backgroundColor: colors.card }]}>
            <Text style={[styles.sortModalTitle, { color: colors.title }]}>Trier par</Text>
            {(Object.keys(sortLabels) as SortOption[]).map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => { setSortBy(key); setShowSort(false); }}
                style={[styles.sortOption, sortBy === key && { backgroundColor: COLORS.primaryLight }]}
              >
                <Text style={[styles.sortOptionText, { color: sortBy === key ? COLORS.primary : colors.title }]}>
                  {sortLabels[key]}
                </Text>
                {sortBy === key && <FeatherIcon name="check" size={16} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.filterModal, { backgroundColor: colors.card }]}>
            <View style={styles.filterModalHeader}>
              <Text style={[styles.filterModalTitle, { color: colors.title }]}>Filtres</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <FeatherIcon name="x" size={22} color={colors.title} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.filterModalBody}>
              {/* Vehicle type */}
              <Text style={[styles.filterLabel, { color: colors.title }]}>Type de véhicule</Text>
              <View style={styles.chipsRow}>
                {[{ key: 'all', label: 'Tous' }, { key: 'car', label: 'Voiture' }, { key: 'moto', label: 'Moto' }].map((t) => (
                  <TouchableOpacity
                    key={t.key}
                    onPress={() => setVehicleTypeFilter(t.key as any)}
                    style={[styles.filterChip, { backgroundColor: vehicleTypeFilter === t.key ? COLORS.primary : colors.background, borderColor: vehicleTypeFilter === t.key ? COLORS.primary : colors.border }]}
                  >
                    <Text style={[styles.filterChipText, { color: vehicleTypeFilter === t.key ? COLORS.white : colors.text }]}>{t.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Condition */}
              <Text style={[styles.filterLabel, { color: colors.title }]}>État</Text>
              <View style={styles.chipsRow}>
                {[{ key: 'all', label: 'Tous' }, { key: 'new', label: 'Neuf' }, { key: 'used', label: 'Occasion' }, { key: 'refurbished', label: 'Reconditionné' }].map((c) => (
                  <TouchableOpacity
                    key={c.key}
                    onPress={() => setConditionFilter(c.key as ConditionFilter)}
                    style={[styles.filterChip, { backgroundColor: conditionFilter === c.key ? COLORS.primary : colors.background, borderColor: conditionFilter === c.key ? COLORS.primary : colors.border }]}
                  >
                    <Text style={[styles.filterChipText, { color: conditionFilter === c.key ? COLORS.white : colors.text }]}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Price Range */}
              <Text style={[styles.filterLabel, { color: colors.title }]}>Prix (FCFA)</Text>
              <View style={styles.priceRangeRow}>
                <TextInput
                  style={[styles.priceInput, { backgroundColor: colors.background, color: colors.title, borderColor: colors.border }]}
                  placeholder="Min"
                  placeholderTextColor={colors.text}
                  value={priceMin}
                  onChangeText={setPriceMin}
                  keyboardType="numeric"
                />
                <Text style={{ color: colors.text }}>—</Text>
                <TextInput
                  style={[styles.priceInput, { backgroundColor: colors.background, color: colors.title, borderColor: colors.border }]}
                  placeholder="Max"
                  placeholderTextColor={colors.text}
                  value={priceMax}
                  onChangeText={setPriceMax}
                  keyboardType="numeric"
                />
              </View>

              {/* Brand */}
              <Text style={[styles.filterLabel, { color: colors.title }]}>Marques</Text>
              <View style={styles.chipsRow}>
                {allBrands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    onPress={() => toggleBrand(brand)}
                    style={[styles.filterChip, { backgroundColor: selectedBrands.includes(brand) ? COLORS.primary : colors.background, borderColor: selectedBrands.includes(brand) ? COLORS.primary : colors.border }]}
                  >
                    <Text style={[styles.filterChipText, { color: selectedBrands.includes(brand) ? COLORS.white : colors.text }]}>{brand}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* In stock toggle */}
              <TouchableOpacity
                onPress={() => setInStockOnly(!inStockOnly)}
                style={[styles.toggleRow, { borderColor: colors.border }]}
              >
                <Text style={[styles.toggleLabel, { color: colors.title }]}>En stock uniquement</Text>
                <View style={[styles.toggleSwitch, { backgroundColor: inStockOnly ? COLORS.primary : colors.border }]}>
                  <View style={[styles.toggleDot, { transform: [{ translateX: inStockOnly ? 18 : 2 }] }]} />
                </View>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.filterModalFooter}>
              <TouchableOpacity onPress={clearAllFilters} style={[styles.clearBtn, { borderColor: colors.border }]}>
                <Text style={[styles.clearBtnText, { color: colors.title }]}>Effacer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFilters(false)} style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>Appliquer ({filteredParts.length})</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const gridItemWidth = (width - 45) / 2;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 14 },
  backBtn: { padding: 4 },
  headerTitle: { flex: 1, textAlign: 'center', ...FONTS.h5, color: COLORS.white },
  searchSection: { padding: 15, paddingBottom: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: SIZES.radius_sm, paddingHorizontal: 12, height: 46, gap: 8, marginBottom: 10 },
  searchInput: { flex: 1, ...FONTS.fontRegular, fontSize: 14, height: '100%' },
  categoryChips: { gap: 8, paddingBottom: 4 },
  catChip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  catChipText: { ...FONTS.fontMedium, fontSize: 13 },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, borderBottomWidth: 1 },
  resultCount: { ...FONTS.fontRegular, fontSize: 13 },
  toolbarRight: { flexDirection: 'row', gap: 8 },
  toolbarBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, gap: 4 },
  toolbarBtnText: { ...FONTS.fontMedium, fontSize: 12 },
  gridContent: { padding: 15 },
  listContent: { padding: 15, gap: 10 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridItem: { width: gridItemWidth },
  partCardGrid: { borderRadius: SIZES.radius_sm, overflow: 'hidden' },
  partCardList: { borderRadius: SIZES.radius_sm, overflow: 'hidden', flexDirection: 'row' },
  partImageGrid: { height: 130, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  partImageList: { width: 110, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  outOfStockBadge: { position: 'absolute', bottom: 6, left: 6, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  outOfStockText: { ...FONTS.fontSemiBold, fontSize: 9, color: COLORS.white },
  condBadge: { position: 'absolute', top: 6, right: 6, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  condBadgeText: { ...FONTS.fontSemiBold, fontSize: 9, color: COLORS.white },
  partInfoGrid: { padding: 10 },
  partInfoList: { flex: 1, padding: 10 },
  partBrand: { ...FONTS.fontSemiBold, fontSize: 11, marginBottom: 2 },
  partName: { ...FONTS.fontMedium, fontSize: 14, marginBottom: 2 },
  partOem: { ...FONTS.fontRegular, fontSize: 11, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  ratingText: { ...FONTS.fontRegular, fontSize: 11 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  partPrice: { ...FONTS.fontSemiBold, fontSize: 14 },
  partOldPrice: { ...FONTS.fontRegular, fontSize: 11, textDecorationLine: 'line-through' },
  supplierText: { ...FONTS.fontRegular, fontSize: 11 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 8 },
  emptyTitle: { ...FONTS.h6 },
  emptySubtitle: { ...FONTS.font, textAlign: 'center' },
  // Sort Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  sortModal: { width: '80%', borderRadius: SIZES.radius_sm, padding: 16 },
  sortModalTitle: { ...FONTS.h6, marginBottom: 12 },
  sortOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8, marginBottom: 4 },
  sortOptionText: { ...FONTS.fontMedium, fontSize: 14 },
  // Filter Modal
  filterModal: { borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '85%', position: 'absolute', bottom: 0, left: 0, right: 0 },
  filterModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.06)' },
  filterModalTitle: { ...FONTS.h5 },
  filterModalBody: { padding: 16 },
  filterLabel: { ...FONTS.fontMedium, fontSize: 14, marginBottom: 8, marginTop: 14 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  filterChipText: { ...FONTS.fontMedium, fontSize: 13 },
  priceRangeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  priceInput: { flex: 1, height: 44, borderWidth: 1, borderRadius: SIZES.radius, paddingHorizontal: 12, ...FONTS.fontRegular, fontSize: 14 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, marginTop: 14, borderTopWidth: 1 },
  toggleLabel: { ...FONTS.fontMedium, fontSize: 14 },
  toggleSwitch: { width: 44, height: 24, borderRadius: 12, justifyContent: 'center' },
  toggleDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.white },
  filterModalFooter: { flexDirection: 'row', padding: 16, gap: 10, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.06)' },
  clearBtn: { flex: 1, height: 46, borderRadius: SIZES.radius, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  clearBtnText: { ...FONTS.fontMedium, fontSize: 14 },
  applyBtn: { flex: 1, height: 46, borderRadius: SIZES.radius, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  applyBtnText: { ...FONTS.fontMedium, fontSize: 14, color: COLORS.white },
});

export default VehicleSearch;
