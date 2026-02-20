import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchMechanicShops } from '../../redux/slices/mechanicsSlice';

type Props = StackScreenProps<RootStackParamList, 'Garages'>;

interface Garage {
  id: string;
  name: string;
  city: string;
  country: string;
  specialties: string[];
  rating: number;
  reviews: number;
  phone: string;
  whatsapp: string;
  hours: string;
  isVip: boolean;
  image: string;
}

const garagesData: Garage[] = [
  {
    id: '1',
    name: 'Garage Excellence Auto',
    city: 'Lomé',
    country: 'Togo',
    specialties: ['Mécanique générale', 'Électricité auto', 'Climatisation'],
    rating: 4.8,
    reviews: 124,
    phone: '+228 90 17 12 12',
    whatsapp: '22890171212',
    hours: 'Lun-Sam: 8h-18h',
    isVip: true,
    image: '',
  },
  {
    id: '2',
    name: 'Moto Pro Services',
    city: 'Lomé',
    country: 'Togo',
    specialties: ['Motos', 'Scooters', 'Pièces détachées'],
    rating: 4.5,
    reviews: 89,
    phone: '+228 91 00 00 00',
    whatsapp: '22891000000',
    hours: 'Lun-Sam: 7h30-17h30',
    isVip: true,
    image: '',
  },
  {
    id: '3',
    name: 'Auto Diag Center',
    city: 'Cotonou',
    country: 'Bénin',
    specialties: ['Diagnostic', 'Injection', 'Boîte auto'],
    rating: 4.6,
    reviews: 67,
    phone: '+229 97 00 00 00',
    whatsapp: '22997000000',
    hours: 'Lun-Ven: 8h-17h',
    isVip: false,
    image: '',
  },
  {
    id: '4',
    name: 'Garage Prestige',
    city: 'Abidjan',
    country: "Côte d'Ivoire",
    specialties: ['Carrosserie', 'Peinture', 'Mécanique'],
    rating: 4.3,
    reviews: 45,
    phone: '+225 07 00 00 00',
    whatsapp: '2250700000',
    hours: 'Lun-Sam: 8h-18h',
    isVip: false,
    image: '',
  },
  {
    id: '5',
    name: 'TechAuto Garage',
    city: 'Accra',
    country: 'Ghana',
    specialties: ['Mécanique', 'Vidange', 'Freinage'],
    rating: 4.1,
    reviews: 33,
    phone: '+233 20 000 0000',
    whatsapp: '233200000000',
    hours: 'Mon-Sat: 8am-6pm',
    isVip: false,
    image: '',
  },
  {
    id: '6',
    name: 'Garage du Port',
    city: 'Lomé',
    country: 'Togo',
    specialties: ['Poids lourds', 'Utilitaires', 'Mécanique'],
    rating: 4.4,
    reviews: 58,
    phone: '+228 92 00 00 00',
    whatsapp: '22892000000',
    hours: 'Lun-Sam: 7h-18h',
    isVip: true,
    image: '',
  },
];

type FilterType = 'all' | 'vip' | 'standard';

const Garages = ({ navigation }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const appDispatch = useAppDispatch();
  const { items: apiMechanics, isLoading } = useAppSelector((state) => state.mechanics);

  useEffect(() => {
    appDispatch(fetchMechanicShops({}));
  }, []);

  // Map API mechanics to Garage interface or fallback
  const garagesList: Garage[] = useMemo(() => {
    if (apiMechanics.length > 0) {
      return apiMechanics.map((m: any) => ({
        id: String(m.id),
        name: m.name || m.shopName || '',
        city: m.city || '',
        country: m.country || 'Togo',
        specialties: m.specialties || m.services || [],
        rating: m.averageRating || m.rating || 0,
        reviews: m.reviewCount || 0,
        phone: m.phone || '',
        whatsapp: m.whatsapp || m.phone?.replace(/[^0-9]/g, '') || '',
        hours: m.openingHours || 'Lun-Sam: 8h-18h',
        isVip: m.isVip || m.isPremium || false,
        image: m.logo || m.image || '',
      }));
    }
    return garagesData;
  }, [apiMechanics]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredGarages = useMemo(() => {
    let list = garagesList;
    if (filter === 'vip') list = list.filter((g) => g.isVip);
    if (filter === 'standard') list = list.filter((g) => !g.isVip);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.city.toLowerCase().includes(q) ||
          g.specialties.some((s) => s.toLowerCase().includes(q))
      );
    }
    return list;
  }, [search, filter]);

  const vipGarages = filteredGarages.filter((g) => g.isVip);
  const standardGarages = filteredGarages.filter((g) => !g.isVip);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FeatherIcon
          key={i}
          name="star"
          size={12}
          color={i <= Math.round(rating) ? COLORS.gold : COLORS.light}
          style={{ marginRight: 1 }}
        />
      );
    }
    return stars;
  };

  const GarageCard = ({ item }: { item: Garage }) => (
    <View
      style={[
        styles.garageCard,
        {
          backgroundColor: colors.card,
          borderColor: item.isVip ? COLORS.gold : colors.border,
          borderWidth: item.isVip ? 1.5 : 1,
        },
      ]}
    >
      {item.isVip && (
        <View style={styles.vipBadge}>
          <FeatherIcon name="award" size={12} color={COLORS.white} />
          <Text style={styles.vipBadgeText}>VIP</Text>
        </View>
      )}

      {/* Garage icon placeholder */}
      <View style={[styles.garageImagePlaceholder, { backgroundColor: item.isVip ? 'rgba(255,184,0,0.1)' : COLORS.primaryLight }]}>
        <FeatherIcon name="tool" size={28} color={item.isVip ? COLORS.gold : COLORS.primary} />
      </View>

      <Text style={[styles.garageName, { color: colors.title }]} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.locationRow}>
        <FeatherIcon name="map-pin" size={12} color={colors.text} />
        <Text style={[styles.locationText, { color: colors.text }]}>
          {item.city}, {item.country}
        </Text>
      </View>

      <View style={styles.ratingRow}>
        {renderStars(item.rating)}
        <Text style={[styles.ratingText, { color: colors.text }]}>
          {item.rating} ({item.reviews})
        </Text>
      </View>

      <View style={styles.specialtiesWrap}>
        {item.specialties.slice(0, 2).map((s, i) => (
          <View key={i} style={[styles.specialtyTag, { backgroundColor: colors.background }]}>
            <Text style={[styles.specialtyText, { color: colors.text }]} numberOfLines={1}>
              {s}
            </Text>
          </View>
        ))}
        {item.specialties.length > 2 && (
          <View style={[styles.specialtyTag, { backgroundColor: COLORS.primaryLight }]}>
            <Text style={[styles.specialtyText, { color: COLORS.primary }]}>
              +{item.specialties.length - 2}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.hoursRow}>
        <FeatherIcon name="clock" size={12} color={colors.text} />
        <Text style={[styles.hoursText, { color: colors.text }]}>{item.hours}</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
          style={[styles.actionBtn, { backgroundColor: COLORS.primary }]}
        >
          <FeatherIcon name="phone" size={14} color={COLORS.white} />
          <Text style={styles.actionBtnText}>Appeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`https://wa.me/${item.whatsapp}`)}
          style={[styles.actionBtn, { backgroundColor: COLORS.whatsapp }]}
        >
          <FeatherIcon name="message-circle" size={14} color={COLORS.white} />
          <Text style={styles.actionBtnText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nos Garages Partenaires</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <FeatherIcon name="search" size={18} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.title }]}
            placeholder="Rechercher un garage, ville, spécialité..."
            placeholderTextColor={colors.text}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FeatherIcon name="x" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter tabs */}
        <View style={styles.filterRow}>
          {(['all', 'vip', 'standard'] as FilterType[]).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterTab,
                {
                  backgroundColor: filter === f ? COLORS.primary : colors.background,
                  borderColor: filter === f ? COLORS.primary : colors.border,
                },
              ]}
            >
              {f === 'vip' && (
                <FeatherIcon name="award" size={13} color={filter === f ? COLORS.white : COLORS.gold} />
              )}
              <Text
                style={[
                  styles.filterTabText,
                  { color: filter === f ? COLORS.white : colors.text },
                ]}
              >
                {f === 'all' ? 'Tous' : f === 'vip' ? 'VIP' : 'Standard'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredGarages.length === 0 && (
          <View style={styles.emptyState}>
            <FeatherIcon name="search" size={48} color={colors.text} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              Aucun garage trouvé
            </Text>
          </View>
        )}

        {/* VIP Section */}
        {vipGarages.length > 0 && filter !== 'standard' && (
          <>
            <View style={styles.sectionHeader}>
              <FeatherIcon name="award" size={16} color={COLORS.gold} />
              <Text style={[styles.sectionTitle, { color: colors.title }]}>
                Garages VIP ({vipGarages.length})
              </Text>
            </View>
            <View style={styles.garageGrid}>
              {vipGarages.map((g) => (
                <GarageCard key={g.id} item={g} />
              ))}
            </View>
          </>
        )}

        {/* Standard Section */}
        {standardGarages.length > 0 && filter !== 'vip' && (
          <>
            <View style={styles.sectionHeader}>
              <FeatherIcon name="tool" size={16} color={colors.title} />
              <Text style={[styles.sectionTitle, { color: colors.title }]}>
                Garages Standard ({standardGarages.length})
              </Text>
            </View>
            <View style={styles.garageGrid}>
              {standardGarages.map((g) => (
                <GarageCard key={g.id} item={g} />
              ))}
            </View>
          </>
        )}

        {/* CTA Banner */}
        <View style={[styles.ctaBanner, { backgroundColor: COLORS.primary }]}>
          <FeatherIcon name="tool" size={28} color={COLORS.white} />
          <Text style={styles.ctaTitle}>Vous êtes garagiste ?</Text>
          <Text style={styles.ctaSubtitle}>
            Rejoignez notre réseau de garages partenaires et développez votre clientèle.
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/22890171212?text=Bonjour, je souhaite devenir garage partenaire Akodessewa')}
            style={styles.ctaBtn}
          >
            <FeatherIcon name="message-circle" size={16} color={COLORS.primary} />
            <Text style={styles.ctaBtnText}>Devenir Partenaire</Text>
          </TouchableOpacity>
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
  searchContainer: {
    padding: 15,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius_sm,
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    ...FONTS.fontRegular,
    fontSize: 14,
    height: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  filterTabText: {
    ...FONTS.fontMedium,
    fontSize: 13,
  },
  listContent: {
    padding: 15,
    paddingTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    marginTop: 10,
  },
  sectionTitle: {
    ...FONTS.h6,
  },
  garageGrid: {
    gap: 12,
    marginBottom: 10,
  },
  garageCard: {
    borderRadius: SIZES.radius_sm,
    padding: 14,
    position: 'relative',
  },
  vipBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 3,
    zIndex: 1,
  },
  vipBadgeText: {
    ...FONTS.fontSemiBold,
    fontSize: 10,
    color: COLORS.white,
  },
  garageImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  garageName: {
    ...FONTS.fontSemiBold,
    fontSize: 16,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  locationText: {
    ...FONTS.fontRegular,
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    ...FONTS.fontRegular,
    fontSize: 12,
    marginLeft: 2,
  },
  specialtiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  specialtyTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    ...FONTS.fontRegular,
    fontSize: 11,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  hoursText: {
    ...FONTS.fontRegular,
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    borderRadius: SIZES.radius,
    gap: 6,
  },
  actionBtnText: {
    ...FONTS.fontMedium,
    fontSize: 13,
    color: COLORS.white,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    ...FONTS.font,
  },
  ctaBanner: {
    borderRadius: SIZES.radius_sm,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  ctaTitle: {
    ...FONTS.h5,
    color: COLORS.white,
    marginTop: 10,
    marginBottom: 6,
  },
  ctaSubtitle: {
    ...FONTS.font,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  ctaBtnText: {
    ...FONTS.fontSemiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default Garages;
