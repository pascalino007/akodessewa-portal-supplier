import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchUsedVehicles } from '../../redux/slices/marketplaceSlice';

type Props = StackScreenProps<RootStackParamList, 'UsedVehicles'>;

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  city: string;
  fuelType: string;
  transmission: string;
  condition: string;
  type: 'car' | 'moto';
  bodyStyle: string;
  color: string;
}

const vehiclesData: Vehicle[] = [
  { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, price: 8500000, mileage: 45000, city: 'Lomé', fuelType: 'Essence', transmission: 'Automatique', condition: 'Excellent', type: 'car', bodyStyle: 'Berline', color: 'Blanc' },
  { id: '2', brand: 'Honda', model: 'CR-V', year: 2019, price: 12000000, mileage: 62000, city: 'Cotonou', fuelType: 'Essence', transmission: 'Automatique', condition: 'Très bon', type: 'car', bodyStyle: 'SUV', color: 'Noir' },
  { id: '3', brand: 'Yamaha', model: 'MT-07', year: 2021, price: 3200000, mileage: 15000, city: 'Lomé', fuelType: 'Essence', transmission: 'Manuelle', condition: 'Excellent', type: 'moto', bodyStyle: 'Roadster', color: 'Bleu' },
  { id: '4', brand: 'Mercedes', model: 'C200', year: 2018, price: 15000000, mileage: 78000, city: 'Abidjan', fuelType: 'Diesel', transmission: 'Automatique', condition: 'Bon', type: 'car', bodyStyle: 'Berline', color: 'Gris' },
  { id: '5', brand: 'BMW', model: 'X3', year: 2020, price: 18000000, mileage: 35000, city: 'Accra', fuelType: 'Essence', transmission: 'Automatique', condition: 'Excellent', type: 'car', bodyStyle: 'SUV', color: 'Blanc' },
  { id: '6', brand: 'Honda', model: 'CBR 600', year: 2020, price: 4500000, mileage: 12000, city: 'Lomé', fuelType: 'Essence', transmission: 'Manuelle', condition: 'Très bon', type: 'moto', bodyStyle: 'Sport', color: 'Rouge' },
  { id: '7', brand: 'Hyundai', model: 'Tucson', year: 2021, price: 14000000, mileage: 28000, city: 'Lomé', fuelType: 'Essence', transmission: 'Automatique', condition: 'Excellent', type: 'car', bodyStyle: 'SUV', color: 'Bleu' },
  { id: '8', brand: 'Nissan', model: 'Sentra', year: 2019, price: 7500000, mileage: 55000, city: 'Cotonou', fuelType: 'Essence', transmission: 'Manuelle', condition: 'Bon', type: 'car', bodyStyle: 'Berline', color: 'Argent' },
];

type VehicleTypeFilter = 'all' | 'car' | 'moto';
type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'mileage';

const ConditionColors: Record<string, string> = {
  Excellent: '#4caf50',
  'Très bon': '#2196f3',
  Bon: '#ff9800',
  Passable: '#f44336',
};

const UsedVehicles = ({ navigation }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const appDispatch = useAppDispatch();
  const { items: apiVehicles, isLoading } = useAppSelector((state) => state.marketplace);

  useEffect(() => {
    appDispatch(fetchUsedVehicles({}));
  }, []);

  // Map API vehicles or fallback
  const vehiclesList: Vehicle[] = useMemo(() => {
    if (apiVehicles.length > 0) {
      return apiVehicles.map((v: any) => ({
        id: String(v.id),
        brand: v.brand || v.make || '',
        model: v.model || '',
        year: v.year || 0,
        price: v.price || 0,
        mileage: v.mileage || v.km || 0,
        city: v.city || v.location || '',
        fuelType: v.fuelType || v.fuel || 'Essence',
        transmission: v.transmission || 'Manuelle',
        condition: v.condition || 'Bon',
        type: v.vehicleType === 'MOTO' || v.type === 'moto' ? 'moto' : 'car',
        bodyStyle: v.bodyStyle || v.bodyType || '',
        color: v.color || '',
      }));
    }
    return vehiclesData;
  }, [apiVehicles]);

  const [typeFilter, setTypeFilter] = useState<VehicleTypeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

  const filteredVehicles = useMemo(() => {
    let list = vehiclesList;

    if (typeFilter !== 'all') list = list.filter((v) => v.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q)
      );
    }
    if (priceMin) list = list.filter((v) => v.price >= parseInt(priceMin));
    if (priceMax) list = list.filter((v) => v.price <= parseInt(priceMax));
    if (selectedFuel) list = list.filter((v) => v.fuelType === selectedFuel);
    if (selectedTransmission) list = list.filter((v) => v.transmission === selectedTransmission);
    if (selectedCondition) list = list.filter((v) => v.condition === selectedCondition);

    switch (sortBy) {
      case 'price_asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price_desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'mileage': list = [...list].sort((a, b) => a.mileage - b.mileage); break;
      default: list = [...list].sort((a, b) => b.year - a.year); break;
    }
    return list;
  }, [typeFilter, sortBy, search, priceMin, priceMax, selectedFuel, selectedTransmission, selectedCondition]);

  const formatPrice = (price: number) => price.toLocaleString('fr-FR') + ' FCFA';
  const formatMileage = (km: number) => km.toLocaleString('fr-FR') + ' km';

  const clearFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedFuel('');
    setSelectedTransmission('');
    setSelectedCondition('');
  };

  const activeFilterCount = [priceMin, priceMax, selectedFuel, selectedTransmission, selectedCondition].filter(Boolean).length;

  const FilterChip = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterChip, { backgroundColor: selected ? COLORS.primary : colors.background, borderColor: selected ? COLORS.primary : colors.border }]}
    >
      <Text style={[styles.filterChipText, { color: selected ? COLORS.white : colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Véhicules d'occasion</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Search + Filter bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <FeatherIcon name="search" size={18} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.title }]}
            placeholder="Marque, modèle, ville..."
            placeholderTextColor={colors.text}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.controlRow}>
          {/* Type filter */}
          <View style={styles.typeRow}>
            {(['all', 'car', 'moto'] as VehicleTypeFilter[]).map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setTypeFilter(t)}
                style={[styles.typeBtn, { backgroundColor: typeFilter === t ? COLORS.primary : colors.background }]}
              >
                <FeatherIcon name={t === 'moto' ? 'zap' : t === 'car' ? 'truck' : 'grid'} size={13} color={typeFilter === t ? COLORS.white : colors.text} />
                <Text style={[styles.typeBtnText, { color: typeFilter === t ? COLORS.white : colors.text }]}>
                  {t === 'all' ? 'Tous' : t === 'car' ? 'Voitures' : 'Motos'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sort + Filter buttons */}
          <View style={styles.sortFilterRow}>
            <TouchableOpacity
              onPress={() => {
                const opts: SortOption[] = ['newest', 'price_asc', 'price_desc', 'mileage'];
                const idx = opts.indexOf(sortBy);
                setSortBy(opts[(idx + 1) % opts.length]);
              }}
              style={[styles.sortBtn, { backgroundColor: colors.background, borderColor: colors.border }]}
            >
              <FeatherIcon name="bar-chart-2" size={14} color={colors.text} />
              <Text style={[styles.sortBtnText, { color: colors.text }]}>
                {sortBy === 'newest' ? 'Récent' : sortBy === 'price_asc' ? 'Prix ↑' : sortBy === 'price_desc' ? 'Prix ↓' : 'Km'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowFilters(true)}
              style={[styles.sortBtn, { backgroundColor: activeFilterCount > 0 ? COLORS.primaryLight : colors.background, borderColor: activeFilterCount > 0 ? COLORS.primary : colors.border }]}
            >
              <FeatherIcon name="sliders" size={14} color={activeFilterCount > 0 ? COLORS.primary : colors.text} />
              <Text style={[styles.sortBtnText, { color: activeFilterCount > 0 ? COLORS.primary : colors.text }]}>
                Filtres{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Results count */}
      <View style={styles.resultsBar}>
        <Text style={[styles.resultsText, { color: colors.text }]}>
          {filteredVehicles.length} véhicule{filteredVehicles.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Vehicle list */}
      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredVehicles.length === 0 && (
          <View style={styles.emptyState}>
            <FeatherIcon name="search" size={48} color={colors.text} />
            <Text style={[styles.emptyText, { color: colors.text }]}>Aucun véhicule trouvé</Text>
          </View>
        )}

        {filteredVehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[styles.vehicleCard, { backgroundColor: colors.card }]}
            activeOpacity={0.7}
          >
            {/* Image placeholder */}
            <View style={[styles.vehicleImagePlaceholder, { backgroundColor: colors.background }]}>
              <FeatherIcon name={vehicle.type === 'moto' ? 'zap' : 'truck'} size={32} color={colors.text} />
              <View style={[styles.conditionBadge, { backgroundColor: ConditionColors[vehicle.condition] || COLORS.label }]}>
                <Text style={styles.conditionText}>{vehicle.condition}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: vehicle.type === 'moto' ? '#ff9800' : COLORS.primary }]}>
                <Text style={styles.typeBadgeText}>{vehicle.type === 'moto' ? 'Moto' : 'Auto'}</Text>
              </View>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={[styles.vehicleName, { color: colors.title }]}>
                {vehicle.brand} {vehicle.model}
              </Text>
              <Text style={[styles.vehicleYear, { color: colors.text }]}>{vehicle.year}</Text>

              <View style={styles.vehicleDetailsRow}>
                <View style={styles.vehicleDetailItem}>
                  <FeatherIcon name="activity" size={12} color={colors.text} />
                  <Text style={[styles.vehicleDetailText, { color: colors.text }]}>{formatMileage(vehicle.mileage)}</Text>
                </View>
                <View style={styles.vehicleDetailItem}>
                  <FeatherIcon name="droplet" size={12} color={colors.text} />
                  <Text style={[styles.vehicleDetailText, { color: colors.text }]}>{vehicle.fuelType}</Text>
                </View>
                <View style={styles.vehicleDetailItem}>
                  <FeatherIcon name="settings" size={12} color={colors.text} />
                  <Text style={[styles.vehicleDetailText, { color: colors.text }]}>{vehicle.transmission}</Text>
                </View>
              </View>

              <View style={styles.vehicleBottomRow}>
                <View style={styles.locationRow}>
                  <FeatherIcon name="map-pin" size={12} color={colors.text} />
                  <Text style={[styles.locationText, { color: colors.text }]}>{vehicle.city}</Text>
                </View>
                <Text style={[styles.vehiclePrice, { color: COLORS.primary }]}>
                  {formatPrice(vehicle.price)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.title }]}>Filtres</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <FeatherIcon name="x" size={22} color={colors.title} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              {/* Price range */}
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
                <Text style={[{ color: colors.text }]}>—</Text>
                <TextInput
                  style={[styles.priceInput, { backgroundColor: colors.background, color: colors.title, borderColor: colors.border }]}
                  placeholder="Max"
                  placeholderTextColor={colors.text}
                  value={priceMax}
                  onChangeText={setPriceMax}
                  keyboardType="numeric"
                />
              </View>

              {/* Fuel type */}
              <Text style={[styles.filterLabel, { color: colors.title }]}>Carburant</Text>
              <View style={styles.chipsRow}>
                {['Essence', 'Diesel', 'Électrique', 'Hybride'].map((f) => (
                  <FilterChip key={f} label={f} selected={selectedFuel === f} onPress={() => setSelectedFuel(selectedFuel === f ? '' : f)} />
                ))}
              </View>

              {/* Transmission */}
              <Text style={[styles.filterLabel, { color: colors.title }]}>Transmission</Text>
              <View style={styles.chipsRow}>
                {['Manuelle', 'Automatique'].map((t) => (
                  <FilterChip key={t} label={t} selected={selectedTransmission === t} onPress={() => setSelectedTransmission(selectedTransmission === t ? '' : t)} />
                ))}
              </View>

              {/* Condition */}
              <Text style={[styles.filterLabel, { color: colors.title }]}>État</Text>
              <View style={styles.chipsRow}>
                {['Excellent', 'Très bon', 'Bon', 'Passable'].map((c) => (
                  <FilterChip key={c} label={c} selected={selectedCondition === c} onPress={() => setSelectedCondition(selectedCondition === c ? '' : c)} />
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={clearFilters} style={[styles.clearBtn, { borderColor: colors.border }]}>
                <Text style={[styles.clearBtnText, { color: colors.title }]}>Effacer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFilters(false)} style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  searchContainer: { padding: 15, paddingBottom: 10 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius_sm,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    marginBottom: 10,
  },
  searchInput: { flex: 1, ...FONTS.fontRegular, fontSize: 14, height: '100%' },
  controlRow: {},
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 5,
  },
  typeBtnText: { ...FONTS.fontMedium, fontSize: 13 },
  sortFilterRow: { flexDirection: 'row', gap: 8 },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  sortBtnText: { ...FONTS.fontMedium, fontSize: 12 },
  resultsBar: { paddingHorizontal: 15, paddingVertical: 6 },
  resultsText: { ...FONTS.fontRegular, fontSize: 13 },
  listContent: { padding: 15, gap: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { ...FONTS.font },
  vehicleCard: { borderRadius: SIZES.radius_sm, overflow: 'hidden' },
  vehicleImagePlaceholder: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  conditionBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  conditionText: { ...FONTS.fontSemiBold, fontSize: 10, color: COLORS.white },
  typeBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  typeBadgeText: { ...FONTS.fontSemiBold, fontSize: 10, color: COLORS.white },
  vehicleInfo: { padding: 14 },
  vehicleName: { ...FONTS.fontSemiBold, fontSize: 16, marginBottom: 2 },
  vehicleYear: { ...FONTS.fontRegular, fontSize: 13, marginBottom: 8 },
  vehicleDetailsRow: { flexDirection: 'row', gap: 14, marginBottom: 10 },
  vehicleDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  vehicleDetailText: { ...FONTS.fontRegular, fontSize: 12 },
  vehicleBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { ...FONTS.fontRegular, fontSize: 12 },
  vehiclePrice: { ...FONTS.fontBold, fontSize: 16 },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  modalTitle: { ...FONTS.h5 },
  modalBody: { padding: 16 },
  filterLabel: { ...FONTS.fontMedium, fontSize: 14, marginBottom: 8, marginTop: 14 },
  priceRangeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  priceInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    ...FONTS.fontRegular,
    fontSize: 14,
  },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: { ...FONTS.fontMedium, fontSize: 13 },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  clearBtn: {
    flex: 1,
    height: 46,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: { ...FONTS.fontMedium, fontSize: 14 },
  applyBtn: {
    flex: 1,
    height: 46,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: { ...FONTS.fontMedium, fontSize: 14, color: COLORS.white },
});

export default UsedVehicles;
