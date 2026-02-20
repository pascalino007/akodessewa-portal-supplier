import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCategories } from '../../redux/slices/categoriesSlice';

interface SubItem {
    id: string;
    title: string;
    icon: string;
}

interface CategoryItem {
    icon: string;
    title: string;
    subcategories: { title: string; data: SubItem[] }[];
}

const categoryData: CategoryItem[] = [
    {
        icon: 'grid',
        title: 'Tout',
        subcategories: [
            {
                title: 'Catégories Principales',
                data: [
                    { id: '1', title: 'Moteur', icon: 'settings' },
                    { id: '2', title: 'Freinage', icon: 'disc' },
                    { id: '3', title: 'Filtration', icon: 'filter' },
                    { id: '4', title: 'Suspension', icon: 'trending-up' },
                    { id: '5', title: 'Électricité', icon: 'zap' },
                    { id: '6', title: 'Carrosserie', icon: 'shield' },
                    { id: '7', title: 'Transmission', icon: 'link' },
                    { id: '8', title: 'Échappement', icon: 'wind' },
                    { id: '9', title: 'Climatisation', icon: 'thermometer' },
                ],
            },
        ],
    },
    {
        icon: 'settings',
        title: 'Moteur',
        subcategories: [
            {
                title: 'Pièces Moteur',
                data: [
                    { id: '1', title: 'Huile moteur', icon: 'droplet' },
                    { id: '2', title: 'Bougies', icon: 'zap' },
                    { id: '3', title: 'Joints', icon: 'circle' },
                    { id: '4', title: 'Pistons', icon: 'target' },
                    { id: '5', title: 'Soupapes', icon: 'chevrons-up' },
                    { id: '6', title: 'Pompe à eau', icon: 'droplet' },
                ],
            },
            {
                title: 'Distribution',
                data: [
                    { id: '7', title: 'Courroie', icon: 'link' },
                    { id: '8', title: 'Chaîne', icon: 'link-2' },
                    { id: '9', title: 'Tendeur', icon: 'maximize-2' },
                ],
            },
        ],
    },
    {
        icon: 'disc',
        title: 'Freinage',
        subcategories: [
            {
                title: 'Freins',
                data: [
                    { id: '1', title: 'Plaquettes', icon: 'square' },
                    { id: '2', title: 'Disques', icon: 'disc' },
                    { id: '3', title: 'Étriers', icon: 'tool' },
                    { id: '4', title: 'Liquide frein', icon: 'droplet' },
                    { id: '5', title: 'Tambours', icon: 'circle' },
                    { id: '6', title: 'Flexibles', icon: 'minus' },
                ],
            },
        ],
    },
    {
        icon: 'filter',
        title: 'Filtration',
        subcategories: [
            {
                title: 'Filtres',
                data: [
                    { id: '1', title: 'Filtre huile', icon: 'droplet' },
                    { id: '2', title: 'Filtre air', icon: 'wind' },
                    { id: '3', title: 'Filtre carburant', icon: 'battery' },
                    { id: '4', title: 'Filtre habitacle', icon: 'home' },
                ],
            },
        ],
    },
    {
        icon: 'trending-up',
        title: 'Suspension',
        subcategories: [
            {
                title: 'Amortissement',
                data: [
                    { id: '1', title: 'Amortisseurs', icon: 'trending-up' },
                    { id: '2', title: 'Ressorts', icon: 'activity' },
                    { id: '3', title: 'Silent-blocs', icon: 'octagon' },
                    { id: '4', title: 'Biellettes', icon: 'minus' },
                    { id: '5', title: 'Rotules', icon: 'circle' },
                ],
            },
            {
                title: 'Direction',
                data: [
                    { id: '6', title: 'Crémaillère', icon: 'navigation' },
                    { id: '7', title: 'Pompe DA', icon: 'droplet' },
                    { id: '8', title: 'Biellette dir.', icon: 'minus' },
                ],
            },
        ],
    },
    {
        icon: 'zap',
        title: 'Électricité',
        subcategories: [
            {
                title: 'Système Électrique',
                data: [
                    { id: '1', title: 'Batterie', icon: 'battery-charging' },
                    { id: '2', title: 'Alternateur', icon: 'refresh-cw' },
                    { id: '3', title: 'Démarreur', icon: 'play' },
                    { id: '4', title: 'Ampoules', icon: 'sun' },
                    { id: '5', title: 'Capteurs', icon: 'radio' },
                    { id: '6', title: 'Faisceaux', icon: 'git-branch' },
                ],
            },
        ],
    },
    {
        icon: 'shield',
        title: 'Carrosserie',
        subcategories: [
            {
                title: 'Pièces Carrosserie',
                data: [
                    { id: '1', title: 'Pare-chocs', icon: 'shield' },
                    { id: '2', title: 'Rétroviseurs', icon: 'eye' },
                    { id: '3', title: 'Phares', icon: 'sun' },
                    { id: '4', title: 'Ailes', icon: 'corner-up-right' },
                    { id: '5', title: 'Capot', icon: 'maximize' },
                    { id: '6', title: 'Portières', icon: 'sidebar' },
                ],
            },
        ],
    },
    {
        icon: 'link',
        title: 'Transmis.',
        subcategories: [
            {
                title: 'Transmission',
                data: [
                    { id: '1', title: 'Embrayage', icon: 'disc' },
                    { id: '2', title: 'Boîte vitesses', icon: 'layers' },
                    { id: '3', title: 'Cardan', icon: 'link' },
                    { id: '4', title: 'Roulement', icon: 'circle' },
                ],
            },
        ],
    },
];

type CategoryScreenProps = StackScreenProps<RootStackParamList, 'Category'>;

const Category = ({ navigation }: CategoryScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const [currentindex, setcurrentindex] = useState(0);
    const appDispatch = useAppDispatch();
    const apiCategories = useAppSelector((state) => state.categories.items);

    useEffect(() => {
        appDispatch(fetchCategories(undefined));
    }, []);

    // Build category sidebar from API data when available
    const displayCategoryData: CategoryItem[] = useMemo(() => {
        if (apiCategories.length === 0) return categoryData;

        // Group: first item is "Tout" showing all top-level categories
        const topLevel = apiCategories.filter(c => !c.parentId);
        const allItem: CategoryItem = {
            icon: 'grid',
            title: 'Tout',
            subcategories: [{
                title: 'Catégories Principales',
                data: topLevel.map(c => ({ id: c.id, title: c.name, icon: 'settings' })),
            }],
        };

        // Each top-level category with its children
        const catItems: CategoryItem[] = topLevel.map(cat => ({
            icon: 'settings',
            title: cat.name.length > 10 ? cat.name.substring(0, 9) + '.' : cat.name,
            subcategories: [{
                title: cat.name,
                data: (cat.children || []).map(child => ({
                    id: child.id,
                    title: child.name,
                    icon: 'chevron-right',
                })),
            }],
        }));

        return [allItem, ...catItems];
    }, [apiCategories]);

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title="Catégories"
                leftIcon="back"
                titleLeft
                rightIcon1={'search'}
            />
            <View style={{ flexGrow: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* Sidebar */}
                    <View style={[styles.sidebar, { backgroundColor: COLORS.primary }]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {displayCategoryData.map((data, index) => (
                                <TouchableOpacity
                                    onPress={() => setcurrentindex(index)}
                                    key={index}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.sideData,
                                        currentindex === index && {
                                            backgroundColor: COLORS.white,
                                        },
                                    ]}
                                >
                                    <FeatherIcon
                                        name={data.icon}
                                        size={20}
                                        color={currentindex === index ? COLORS.primary : COLORS.white}
                                    />
                                    <Text
                                        style={[
                                            styles.sideTitle,
                                            {
                                                color: currentindex === index ? COLORS.primary : COLORS.white,
                                            },
                                        ]}
                                    >
                                        {data.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Content */}
                    <View style={{ width: '75%', backgroundColor: colors.background }}>
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ backgroundColor: colors.background }}>
                                <View
                                    style={[
                                        {
                                            padding: 15,
                                            paddingHorizontal: 0,
                                            backgroundColor: theme.dark
                                                ? 'rgba(255,255,255,.1)'
                                                : colors.card,
                                        },
                                    ]}
                                >
                                    {displayCategoryData[currentindex]?.subcategories.map(
                                        (data, index) => (
                                            <View key={index}>
                                                <View
                                                    style={[
                                                        styles.maincardData,
                                                        { borderBottomColor: colors.background },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            FONTS.fontMedium,
                                                            { fontSize: 14, color: colors.title },
                                                        ]}
                                                    >
                                                        {data.title}
                                                    </Text>
                                                </View>
                                                <View style={styles.cardData}>
                                                    {data.data.map((item, ind) => (
                                                        <TouchableOpacity
                                                            key={ind}
                                                            style={{ alignItems: 'center' }}
                                                            activeOpacity={0.5}
                                                            onPress={() =>
                                                                navigation.navigate(
                                                                    'VehicleSearch',
                                                                    { mode: 'search' }
                                                                )
                                                            }
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.imagecard,
                                                                    {
                                                                        backgroundColor:
                                                                            COLORS.primaryLight,
                                                                    },
                                                                ]}
                                                            >
                                                                <FeatherIcon
                                                                    name={item.icon}
                                                                    size={22}
                                                                    color={COLORS.primary}
                                                                />
                                                            </View>
                                                            <Text
                                                                style={[
                                                                    styles.imageTitle,
                                                                    { color: colors.title },
                                                                ]}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: '25%',
    },
    sideData: {
        padding: 16,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.15)',
    },
    sideTitle: {
        ...FONTS.fontRegular,
        fontSize: 11,
        marginTop: 5,
        textAlign: 'center',
    },
    maincardData: {
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
        paddingBottom: 15,
    },
    cardData: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingTop: 15,
        alignItems: 'flex-start',
        gap: 16,
    },
    imagecard: {
        height: 56,
        width: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageTitle: {
        ...FONTS.fontRegular,
        fontSize: 11,
        color: COLORS.title,
        marginTop: 6,
        textAlign: 'center',
        maxWidth: 64,
    },
});

export default Category;