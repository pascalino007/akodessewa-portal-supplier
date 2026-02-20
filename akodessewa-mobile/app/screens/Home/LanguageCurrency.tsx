import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import FeatherIcon from 'react-native-vector-icons/Feather';

type Props = StackScreenProps<RootStackParamList, 'LanguageCurrency'>;

const languages = [
  { code: 'fr', name: 'Français', flag: IMAGES.flags3 },
  { code: 'en', name: 'English', flag: IMAGES.flags1 },
  { code: 'de', name: 'Deutsch', flag: IMAGES.flags4 },
  { code: 'it', name: 'Italiano', flag: IMAGES.flags5 },
  { code: 'es', name: 'Español', flag: IMAGES.flags9 },
  { code: 'pt', name: 'Português', flag: IMAGES.flags10 },
  { code: 'ar', name: 'العربية', flag: IMAGES.flags8 },
  { code: 'zh', name: '中文', flag: IMAGES.flags7 },
  { code: 'ja', name: '日本語', flag: IMAGES.flags12 },
  { code: 'tr', name: 'Türkçe', flag: IMAGES.flags14 },
];

const currencies = [
  { code: 'XOF', name: 'Franc CFA (FCFA)', symbol: 'FCFA' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
];

type ActiveTab = 'language' | 'currency';

const LanguageCurrency = ({ navigation }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [activeTab, setActiveTab] = useState<ActiveTab>('language');
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [selectedCurrency, setSelectedCurrency] = useState('XOF');

  const handleSave = () => {
    // TODO: persist language & currency to AsyncStorage / Redux
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={22} color={colors.title} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.title }]}>
          Langue & Devise
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={[styles.saveBtnText, { color: COLORS.primary }]}>Enregistrer</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabRow, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          onPress={() => setActiveTab('language')}
          style={[
            styles.tab,
            activeTab === 'language' && styles.tabActive,
          ]}
        >
          <FeatherIcon
            name="globe"
            size={18}
            color={activeTab === 'language' ? COLORS.primary : colors.text}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'language' ? COLORS.primary : colors.text },
              activeTab === 'language' && styles.tabTextActive,
            ]}
          >
            Langue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('currency')}
          style={[
            styles.tab,
            activeTab === 'currency' && styles.tabActive,
          ]}
        >
          <FeatherIcon
            name="dollar-sign"
            size={18}
            color={activeTab === 'currency' ? COLORS.primary : colors.text}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'currency' ? COLORS.primary : colors.text },
              activeTab === 'currency' && styles.tabTextActive,
            ]}
          >
            Devise
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {activeTab === 'language' &&
          languages.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                onPress={() => setSelectedLanguage(lang.code)}
                style={[
                  styles.listItem,
                  {
                    backgroundColor: colors.card,
                    borderColor: isSelected ? COLORS.primary : colors.border,
                    borderWidth: isSelected ? 1.5 : 1,
                  },
                ]}
              >
                <Image source={lang.flag} style={styles.flagImage} />
                <Text style={[styles.itemName, { color: colors.title }]}>
                  {lang.name}
                </Text>
                {isSelected && (
                  <View style={styles.checkCircle}>
                    <FeatherIcon name="check" size={14} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

        {activeTab === 'currency' &&
          currencies.map((cur) => {
            const isSelected = selectedCurrency === cur.code;
            return (
              <TouchableOpacity
                key={cur.code}
                onPress={() => setSelectedCurrency(cur.code)}
                style={[
                  styles.listItem,
                  {
                    backgroundColor: colors.card,
                    borderColor: isSelected ? COLORS.primary : colors.border,
                    borderWidth: isSelected ? 1.5 : 1,
                  },
                ]}
              >
                <View style={[styles.symbolBadge, { backgroundColor: isSelected ? COLORS.primaryLight : colors.background }]}>
                  <Text style={[styles.symbolText, { color: isSelected ? COLORS.primary : colors.text }]}>
                    {cur.symbol}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemName, { color: colors.title }]}>
                    {cur.code}
                  </Text>
                  <Text style={[styles.itemSub, { color: colors.text }]}>
                    {cur.name}
                  </Text>
                </View>
                {isSelected && (
                  <View style={styles.checkCircle}>
                    <FeatherIcon name="check" size={14} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  backBtn: { padding: 4 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    ...FONTS.h5,
  },
  saveBtn: { padding: 4 },
  saveBtnText: {
    ...FONTS.fontSemiBold,
    fontSize: 15,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.fontMedium,
    fontSize: 15,
  },
  tabTextActive: {
    ...FONTS.fontSemiBold,
  },
  listContainer: {
    padding: 15,
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: SIZES.radius_sm,
    gap: 12,
  },
  flagImage: {
    width: 32,
    height: 22,
    borderRadius: 4,
  },
  symbolBadge: {
    width: 40,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    ...FONTS.fontSemiBold,
    fontSize: 14,
  },
  itemName: {
    ...FONTS.fontMedium,
    fontSize: 15,
  },
  itemSub: {
    ...FONTS.fontRegular,
    fontSize: 12,
    marginTop: 1,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LanguageCurrency;
