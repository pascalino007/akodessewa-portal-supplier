import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

type Props = StackScreenProps<RootStackParamList, 'AboutUs'>;

const indicators = [
  { icon: 'map-pin', value: '3+', label: 'Pays' },
  { icon: 'box', value: '10K+', label: 'Pièces' },
  { icon: 'users', value: '5K+', label: 'Clients' },
  { icon: 'truck', value: '8K+', label: 'Livraisons' },
];

const teamMembers = [
  { name: 'Pascal K.', role: 'CEO & Fondateur', icon: 'user' },
  { name: 'Équipe Tech', role: 'Développement', icon: 'code' },
  { name: 'Équipe Support', role: 'Service Client', icon: 'headphones' },
];

const AboutUs = ({ navigation }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>À propos</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={[styles.brandName, { color: colors.title }]}>AKODESSEWA</Text>
          <Text style={[styles.tagline, { color: colors.text }]}>
            Auto Parts & Services
          </Text>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Notre Mission</Text>
          <Text style={[styles.description, { color: colors.text }]}>
            Akodessewa est la première plateforme de pièces détachées automobiles et moto en Afrique de l'Ouest. Nous connectons les acheteurs avec les meilleurs fournisseurs pour des pièces de qualité, neuves et d'occasion, livrées rapidement et en toute sécurité.
          </Text>
          <Text style={[styles.description, { color: colors.text, marginTop: 10 }]}>
            Notre objectif est de simplifier l'accès aux pièces automobiles pour tous, que vous soyez un particulier, un garagiste ou un professionnel de l'automobile.
          </Text>
        </View>

        {/* Indicators */}
        <View style={styles.indicatorRow}>
          {indicators.map((item, index) => (
            <View key={index} style={[styles.indicatorCard, { backgroundColor: colors.card }]}>
              <View style={[styles.indicatorIcon, { backgroundColor: COLORS.primaryLight }]}>
                <FeatherIcon name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={[styles.indicatorValue, { color: colors.title }]}>{item.value}</Text>
              <Text style={[styles.indicatorLabel, { color: colors.text }]}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Team */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Notre Équipe</Text>
          {teamMembers.map((member, index) => (
            <View
              key={index}
              style={[
                styles.teamRow,
                index < teamMembers.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={[styles.teamAvatar, { backgroundColor: COLORS.primaryLight }]}>
                <FeatherIcon name={member.icon} size={18} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.teamName, { color: colors.title }]}>{member.name}</Text>
                <Text style={[styles.teamRole, { color: colors.text }]}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Values */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Nos Valeurs</Text>
          {[
            { icon: 'shield', title: 'Qualité', desc: 'Pièces vérifiées et certifiées' },
            { icon: 'zap', title: 'Rapidité', desc: 'Livraison rapide partout en Afrique' },
            { icon: 'heart', title: 'Confiance', desc: 'Satisfaction client garantie' },
            { icon: 'globe', title: 'Accessibilité', desc: 'Plateforme simple et intuitive' },
          ].map((val, idx) => (
            <View key={idx} style={styles.valueRow}>
              <View style={[styles.valueDot, { backgroundColor: COLORS.primary }]}>
                <FeatherIcon name={val.icon} size={14} color={COLORS.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.valueTitle, { color: colors.title }]}>{val.title}</Text>
                <Text style={[styles.valueDesc, { color: colors.text }]}>{val.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Contactez-nous</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/22890171212')}
            style={[styles.contactBtn, { backgroundColor: COLORS.whatsapp }]}
          >
            <FeatherIcon name="message-circle" size={18} color={COLORS.white} />
            <Text style={styles.contactBtnText}>WhatsApp: +228 90 17 12 12</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:contact@akodessewa.com')}
            style={[styles.contactBtn, { backgroundColor: COLORS.primary }]}
          >
            <FeatherIcon name="mail" size={18} color={COLORS.white} />
            <Text style={styles.contactBtnText}>contact@akodessewa.com</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.version, { color: colors.text }]}>Version 1.0.0</Text>
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
  content: { padding: 15, paddingBottom: 30 },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoText: {
    fontSize: 40,
    color: COLORS.white,
    fontFamily: 'Jost-Bold',
  },
  brandName: {
    ...FONTS.h3,
    letterSpacing: 4,
  },
  tagline: {
    ...FONTS.font,
    marginTop: 4,
  },
  card: {
    borderRadius: SIZES.radius_sm,
    padding: 16,
    marginBottom: 15,
  },
  sectionTitle: {
    ...FONTS.h6,
    marginBottom: 12,
  },
  description: {
    ...FONTS.font,
    lineHeight: 22,
  },
  indicatorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  indicatorCard: {
    flex: 1,
    minWidth: '22%',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: SIZES.radius_sm,
  },
  indicatorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  indicatorValue: {
    ...FONTS.h5,
  },
  indicatorLabel: {
    ...FONTS.fontXs,
    marginTop: 2,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  teamAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamName: {
    ...FONTS.fontMedium,
    fontSize: 15,
  },
  teamRole: {
    ...FONTS.fontSm,
    marginTop: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  valueDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  valueTitle: {
    ...FONTS.fontMedium,
    fontSize: 15,
  },
  valueDesc: {
    ...FONTS.fontSm,
    marginTop: 2,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: SIZES.radius_sm,
    gap: 8,
    marginBottom: 10,
  },
  contactBtnText: {
    ...FONTS.fontMedium,
    fontSize: 14,
    color: COLORS.white,
  },
  version: {
    ...FONTS.fontXs,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AboutUs;
