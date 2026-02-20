import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

type Props = StackScreenProps<RootStackParamList, 'TrackOrder'>;

const TrackOrder = ({ navigation }: Props) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  const handleTrack = () => {
    if (!orderId.trim() || !email.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    // TODO: call API to track order
    Alert.alert('Suivi', `Recherche de la commande ${orderId}...`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suivre ma commande</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Icon */}
        <View style={styles.iconCircle}>
          <FeatherIcon name="package" size={48} color={COLORS.primary} />
        </View>

        <Text style={[styles.title, { color: colors.title }]}>
          Suivez votre commande
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Entrez votre numéro de commande et votre adresse e-mail pour suivre l'état de votre livraison.
        </Text>

        {/* Order ID */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.title }]}>Numéro de commande</Text>
          <View style={[styles.inputRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <FeatherIcon name="hash" size={18} color={colors.text} />
            <TextInput
              style={[styles.input, { color: colors.title }]}
              placeholder="Ex: ORD-20240101-XXXX"
              placeholderTextColor={colors.text}
              value={orderId}
              onChangeText={setOrderId}
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.title }]}>Adresse e-mail</Text>
          <View style={[styles.inputRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <FeatherIcon name="mail" size={18} color={colors.text} />
            <TextInput
              style={[styles.input, { color: colors.title }]}
              placeholder="votre@email.com"
              placeholderTextColor={colors.text}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Track button */}
        <TouchableOpacity
          onPress={handleTrack}
          activeOpacity={0.8}
          style={styles.trackBtn}
        >
          <FeatherIcon name="search" size={18} color={COLORS.white} />
          <Text style={styles.trackBtnText}>Suivre</Text>
        </TouchableOpacity>

        {/* Info box */}
        <View style={[styles.infoBox, { backgroundColor: COLORS.primaryLight }]}>
          <FeatherIcon name="info" size={18} color={COLORS.primary} />
          <Text style={[styles.infoText, { color: COLORS.primary }]}>
            Votre numéro de commande se trouve dans l'e-mail de confirmation que vous avez reçu lors de votre achat.
          </Text>
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
  content: {
    padding: 20,
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    ...FONTS.h4,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.font,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  fieldGroup: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    ...FONTS.fontMedium,
    fontSize: 14,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius_sm,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    ...FONTS.fontRegular,
    fontSize: 15,
    height: '100%',
  },
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius_sm,
    height: 50,
    width: '100%',
    gap: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  trackBtnText: {
    ...FONTS.fontSemiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  infoBox: {
    flexDirection: 'row',
    borderRadius: SIZES.radius_sm,
    padding: 14,
    gap: 10,
    width: '100%',
  },
  infoText: {
    ...FONTS.fontRegular,
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },
});

export default TrackOrder;
