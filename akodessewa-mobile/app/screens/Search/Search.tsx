import { useTheme } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchSuggestions, quickSearch } from '../../redux/slices/searchSlice';

const recentSearches = [
    { title: "Plaquettes de frein Toyota Corolla" },
    { title: "Filtre à huile Peugeot 206" },
    { title: "Amortisseur avant Mercedes C200" },
];

const popularSearches = [
    { title: "Plaquettes de frein" },
    { title: "Filtre à huile" },
    { title: "Amortisseurs" },
    { title: "Courroie distribution" },
    { title: "Bougies d'allumage" },
    { title: "Disques de frein" },
    { title: "Batterie" },
    { title: "Alternateur" },
    { title: "Démarreur" },
    { title: "Phares" },
    { title: "Pare-chocs" },
    { title: "Rétroviseur" },
];

const quickCategories = [
    { title: "Moteur", icon: "settings" },
    { title: "Freinage", icon: "disc" },
    { title: "Filtration", icon: "filter" },
    { title: "Suspension", icon: "trending-up" },
    { title: "Électricité", icon: "zap" },
    { title: "Carrosserie", icon: "shield" },
];

const Search = ({ navigation }: any) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const appDispatch = useAppDispatch();
    const { suggestions, isLoading } = useAppSelector((state) => state.search);

    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState(popularSearches);

    // Debounced suggestions
    useEffect(() => {
        if (searchText.trim().length >= 2) {
            const timer = setTimeout(() => {
                appDispatch(fetchSuggestions(searchText.trim()));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [searchText]);

    const removeItem = () => {
        setItems([]);
    };

    const handleSearch = () => {
        if (searchText.trim()) {
            appDispatch(quickSearch({ query: searchText.trim() }));
            navigation.navigate('VehicleSearch', { mode: 'search', query: searchText.trim() });
        }
    };

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            {/* Search Bar */}
            <View style={[GlobalStyleSheet.container, { height: 60, backgroundColor: COLORS.primary, justifyContent: 'center' }]}>
                <View style={[GlobalStyleSheet.row, { alignItems: 'center' }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.searchCard, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                    >
                        <FeatherIcon size={24} color={COLORS.white} name={'chevron-left'} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Rechercher pièces, véhicules, VIN..."
                            placeholderTextColor="rgba(255,255,255,0.6)"
                            value={searchText}
                            onChangeText={setSearchText}
                            onSubmitEditing={handleSearch}
                            returnKeyType="search"
                            style={[styles.searchTextinput, {
                                color: COLORS.white,
                                borderColor: 'rgba(255,255,255,0.3)',
                            }]}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleSearch}
                        style={[styles.searchCard, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                    >
                        <FeatherIcon size={20} color={COLORS.white} name={'search'} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                {/* Quick Categories */}
                <View style={{ backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card, paddingVertical: 15, paddingHorizontal: 15, marginBottom: 8 }}>
                    <Text style={[FONTS.fontMedium, { fontSize: 15, color: colors.title, marginBottom: 12 }]}>Catégories Rapides</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                        {quickCategories.map((cat, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
                                style={styles.quickCat}
                            >
                                <FeatherIcon name={cat.icon} size={16} color={COLORS.primary} />
                                <Text style={[FONTS.fontRegular, { fontSize: 13, color: COLORS.primary, marginLeft: 6 }]}>{cat.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* API Suggestions */}
                {searchText.trim().length >= 2 && suggestions.length > 0 && (
                    <View style={{ backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card, paddingHorizontal: 15, marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
                            <Text style={[FONTS.fontMedium, { fontSize: 15, color: colors.title }]}>Suggestions</Text>
                            {isLoading && <ActivityIndicator size="small" color={COLORS.primary} />}
                        </View>
                        {suggestions.map((item: any, index: number) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSearchText(item.name || item);
                                    navigation.navigate('VehicleSearch', { mode: 'search', query: item.name || item });
                                }}
                                key={index}
                                style={[styles.resentData, { borderBottomColor: colors.background }]}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <FeatherIcon name="search" size={18} color={COLORS.primary} />
                                    <Text style={[FONTS.fontRegular, { fontSize: 15, color: colors.title }]}>{item.name || item}</Text>
                                </View>
                                <FeatherIcon size={20} color={colors.text} name={'arrow-up-right'} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Recent Searches */}
                {searchText.trim().length < 2 && (
                    <View style={{ backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card, paddingHorizontal: 15, marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
                            <Text style={[FONTS.fontMedium, { fontSize: 15, color: colors.title }]}>Recherches Récentes</Text>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Text style={[FONTS.fontRegular, { fontSize: 12, color: COLORS.primary }]}>Effacer</Text>
                            </TouchableOpacity>
                        </View>
                        {recentSearches.map((data, index) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('VehicleSearch', { mode: 'search', query: data.title })}
                                key={index}
                                style={[styles.resentData, { borderBottomColor: colors.background }]}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <FeatherIcon name="clock" size={18} color={COLORS.primary} />
                                    <Text style={[FONTS.fontRegular, { fontSize: 15, color: colors.title }]}>{data.title}</Text>
                                </View>
                                <FeatherIcon size={20} color={colors.text} name={'arrow-up-right'} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Popular Searches */}
                {items.length > 0 && (
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card, paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.background }}>
                            <Text style={[FONTS.fontMedium, { fontSize: 15, color: colors.title }]}>Recherches Populaires</Text>
                            <TouchableOpacity onPress={removeItem} activeOpacity={0.5}>
                                <Text style={[FONTS.fontRegular, { fontSize: 12, color: COLORS.primary }]}>Masquer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.searchData, { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card }]}>
                            {items.map((data: any, index: any) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => navigation.navigate('VehicleSearch', { mode: 'search' })}
                                    style={styles.searchDataTitle}
                                >
                                    <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>{data.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* VIN Search Prompt */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('VehicleSearch', { mode: 'vin' })}
                    style={[styles.vinBanner, { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card }]}
                >
                    <View style={styles.vinIcon}>
                        <FeatherIcon name="hash" size={24} color={COLORS.white} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={[FONTS.fontSemiBold, { fontSize: 15, color: colors.title }]}>Recherche par VIN</Text>
                        <Text style={[FONTS.fontRegular, { fontSize: 12, color: colors.text, marginTop: 2 }]}>Entrez le numéro VIN de votre véhicule pour trouver les pièces compatibles</Text>
                    </View>
                    <FeatherIcon name="chevron-right" size={20} color={colors.text} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    searchCard: {
        height: 35,
        width: 35,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchTextinput: {
        ...FONTS.fontRegular,
        height: 48,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 20,
        fontSize: 15,
    },
    resentData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    searchData: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 8,
    },
    searchDataTitle: {
        paddingVertical: 6,
        borderWidth: 1,
        paddingHorizontal: 14,
        borderColor: COLORS.inputborder,
        borderRadius: 20,
    },
    quickCat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
    },
    vinBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginTop: 8,
    },
    vinIcon: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Search;