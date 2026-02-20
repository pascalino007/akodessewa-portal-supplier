import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text,Image, TouchableOpacity, Share, SectionList, StyleSheet, ActivityIndicator } from 'react-native'
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { ScrollView } from 'react-native-gesture-handler';
import Cardstyle1 from '../../components/Card/Cardstyle1';
import { useDispatch } from 'react-redux';
import { addTowishList } from '../../redux/reducer/wishListReducer';
import { addToCart } from '../../redux/reducer/cartReducer';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchProductBySlug, fetchProductById, fetchRelatedProducts, clearCurrentProduct } from '../../redux/slices/productsSlice';

const offerData = [
    {
        image:IMAGES.deliverytruck,
        title:"Livraison Rapide",
        text:"Partout en Afrique",
    },
    {
        image:IMAGES.check3,
        title:"Pièce Certifiée",
        text:"Qualité OEM garantie",
    },
    {
        image:IMAGES.savemoney,
        title:"Garantie Retour",
        text:"Retour sous 14 jours",
    },
    {
        image:IMAGES.technicalsupport,
        title:"Support WhatsApp",
        text:"Assistance 7j/7",
    },
    {
        image:IMAGES.wallet2,
        title:"Paiement Flexible",
        text:"Mobile Money & Carte",
    },
]

type ProductsDetailsScreenProps = StackScreenProps<RootStackParamList, 'ProductsDetails'>;

const ProductsDetails = ({navigation, route} : ProductsDetailsScreenProps) => {

    const [Select, setSelect] = useState(offerData[0]);

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const { currentProduct: product, isDetailLoading, relatedProducts } = useAppSelector((state) => state.products);

    useEffect(() => {
        const params = route.params as any;
        if (params?.slug) {
            appDispatch(fetchProductBySlug(params.slug));
        } else if (params?.id) {
            appDispatch(fetchProductById(params.id));
        }
        return () => { appDispatch(clearCurrentProduct()); };
    }, [route.params]);

    useEffect(() => {
        if (product?.id) {
            appDispatch(fetchRelatedProducts({ id: product.id, limit: 6 }));
        }
    }, [product?.id]);

    // Build display data from API product
    const productImages = product?.images?.length
        ? product.images.sort((a, b) => a.order - b.order).map(img => ({ image: { uri: img.url }, smallImage: { uri: img.url } }))
        : [
            {
                image: IMAGES.product1,
                smallImage: IMAGES.product1,
            },
            {
                image: IMAGES.product2,
                smallImage: IMAGES.product2,
            },
            {
                image: IMAGES.product3,
                smallImage: IMAGES.product3,
            },
            {
                image: IMAGES.product4,
                smallImage: IMAGES.product4,
            },
        ];

    const productSpecs = product?.specifications?.length
        ? [{ title: 'INFORMATIONS', data: product.specifications.map(s => ({ title: s.key, text: s.value })) }]
        : [
            {
                title: 'INFORMATIONS GÉNÉRALES',
                data: [
                    {
                        title: "Marque",
                        text: 'Bosch'
                    },
                    {
                        title: "Référence",
                        text: '0986494524'
                    },
                    {
                        title: "Condition",
                        text: 'Neuf'
                    },
                    {
                        title: "Origine",
                        text: 'Allemagne'
                    },
                    {
                        title: "Garantie",
                        text: '12 mois'
                    },
                    {
                        title: "En stock",
                        text: 'Oui - 15 unités'
                    },
                ],
            },
            {
                title: 'COMPATIBILITÉ VÉHICULE',
                data: [
                    {
                        title: "Marque",
                        text: 'Toyota'
                    },
                    {
                        title: "Modèle",
                        text: 'Corolla'
                    },
                    {
                        title: "Années",
                        text: '2015 - 2022'
                    },
                    {
                        title: "Motorisation",
                        text: '1.6L, 1.8L, 2.0L'
                    },
                ],
            },
            {
                title: 'SPÉCIFICATIONS TECHNIQUES',
                data: [
                    {
                        title: "Type",
                        text: 'Plaquettes de frein avant'
                    },
                    {
                        title: "Matériau",
                        text: 'Céramique'
                    },
                    {
                        title: "Dimensions",
                        text: '131.4 x 58.5 x 17.3 mm'
                    },
                    {
                        title: "Poids",
                        text: '0.85 kg'
                    },
                    {
                        title: "Montage",
                        text: 'Essieu avant'
                    },
                    {
                        title: "Usure",
                        text: 'Avec témoin d\'usure'
                    },
                ],
            },
        ];

    const productSelectData = product ? [
        { title: 'Marque', text: product.brand?.name || '-' },
        { title: 'R\u00e9f\u00e9rence OEM', text: product.oemNumber || product.partNumber || '-' },
        { title: 'Condition', text: product.condition === 'NEW' ? 'Neuf' : product.condition === 'USED' ? 'Occasion' : 'Reconditionn\u00e9' },
        { title: 'Origine', text: product.countryOfOrigin || '-' },
    ] : [
        {
            title:"Marque",
            text:"Bosch",
        },
        {
            title:"Référence OEM",
            text:"0986494524",
        },
        {
            title:"Véhicule",
            text:"Toyota Corolla 2015-2022",
        },
        {
            title:"Condition",
            text:"Neuf",
        },
    ];

    const displayRelated = relatedProducts.length > 0
        ? relatedProducts.map(p => ({
            id: p.id,
            image: p.images?.find(i => i.isMain)?.url ? { uri: p.images.find(i => i.isMain)!.url } : IMAGES.product1,
            title: p.name,
            price: `${Number(p.price).toLocaleString('fr-FR')} CFA`,
            discount: p.comparePrice ? `${Number(p.comparePrice).toLocaleString('fr-FR')} CFA` : undefined,
            offer: p.comparePrice ? `-${Math.round((1 - Number(p.price) / Number(p.comparePrice)) * 100)}%` : undefined,
            brand: p.brand?.name || '',
            color: false,
            slug: p.slug,
        }))
        : [
            {
                id:"20",
                image:IMAGES.product1,
                title:"Disques de frein avant - Toyota Corolla",
                price:"25 000 CFA",
                discount:"35 000 CFA",
                offer:"-29%",
                brand:"Bosch",
                color:false,
            },
            {
                id:"21",
                image:IMAGES.product2,
                title:"Kit plaquettes + disques - Toyota Corolla",
                price:"38 000 CFA",
                discount:"52 000 CFA",
                offer:"-27%",
                brand:"TRW",
                color:false,
            },
            {
                id:"22",
                image:IMAGES.item1,
                title:"Liquide de frein DOT4 - 1L",
                price:"4 500 CFA",
                discount:"6 000 CFA",
                offer:"-25%",
                color:false,
                brand:"Bosch",
            },
            {
                id:"23",
                image:IMAGES.item2,
                title:"Étrier de frein avant droit - Toyota",
                price:"45 000 CFA",
                discount:"65 000 CFA",
                offer:"-31%",
                color:true,
                brand:"ATE",
            },
        ];

    const formatPrice = (price: number) => price.toLocaleString('fr-FR') + ' CFA';
    const discountPercent = product?.comparePrice ? Math.round((1 - Number(product.price) / Number(product.comparePrice)) * 100) : 32;

    const onShare = async() => {
        try {
            const result = await Share.share({
                message: product ? `${product.name} - ${formatPrice(Number(product.price))} sur Akodessewa` : 'Share Product link here.',
            });
        } catch (error:any) {
            //alert(error.message);
        }
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
    }
    
    const addItemToCart = () => {
        if (product) {
            dispatch(addToCart({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
                image: product.images?.find(i => i.isMain)?.url || product.images?.[0]?.url,
                quantity: 1,
                stock: product.stock,
                shopId: product.shopId,
                shopName: product.shop?.name,
            }));
        }
    }

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Détails Pièce'
                leftIcon='back'
                titleLeft
                rightIcon2={'cart'}
                rightIcon1={'search'}
            />
            <ScrollView
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{flexGrow:1,paddingBottom:20}}
            >
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <View style={[styles.imagecard,{backgroundColor:colors.card}]}>
                        <Image
                            style={{height:250, width:'100%', resizeMode:'contain'}}
                            source={productImages[currentSlide]?.image}
                        />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 }}>
                            {productImages.map((data:any, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => setCurrentSlide(index)}
                                        key={index}
                                        style={[styles.imageSwiper,{
                                            borderColor: theme.dark ? colors.border : '#DDDDDD',
                                        }, currentSlide === index && {
                                            //borderColor: '#CC0D39',
                                        }]}
                                    >
                                        <Image
                                            style={{
                                                height: 35,
                                                width: 35,
                                                resizeMode:'contain'
                                            }}
                                            source={data.smallImage}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:8}]}>
                    <Text numberOfLines={2} style={[FONTS.fontMedium,{fontSize:18,color:colors.title,}]}>{product?.name || 'Plaquettes de frein avant céramique - Toyota Corolla'}</Text>
                    <View style={styles.flex}>
                        <Image
                            style={{height:14,width:84}}
                            source={IMAGES.star7}
                        />
                        <Text style={[styles.subtitle,{color:colors.title,opacity:.5}]}>({product?.reviewCount ?? 48} Avis)</Text>
                    </View>
                    <View style={[styles.flex,{gap:5}]}>
                        <Text style={[FONTS.fontSemiBold,{fontSize:20,color:COLORS.success}]}>{product ? formatPrice(Number(product.price)) : '15 000 CFA'}</Text>
                        {(product?.comparePrice || !product) && <Text style={[FONTS.fontMedium,{fontSize:20,color:colors.title,textDecorationLine:'line-through',opacity:.6}]}>{product ? formatPrice(Number(product.comparePrice)) : '22 000 CFA'}</Text>}
                        <Text style={[FONTS.fontMedium,{fontSize:14,color:COLORS.danger}]}>  -{discountPercent}%</Text>    
                        <Text style={[FONTS.fontMedium,{fontSize:15,color: (product?.stock ?? 1) > 0 ? COLORS.success : COLORS.danger}]}>  {(product?.stock ?? 1) > 0 ? 'En Stock' : 'Rupture'} </Text>
                    </View>
                    <View style={[styles.flex,{gap:5}]}>
                        <Image
                            style={{height:14,width:14,tintColor:COLORS.primary}}
                            source={IMAGES.leftarrow}
                        />
                        <Text style={[FONTS.fontRegular,{fontSize:15,color:COLORS.primary}]}>Retour sous 14 jours</Text>
                        <Text style={[FONTS.fontSemiBold,{fontSize:15,color:COLORS.success}]}>  Livraison gratuite</Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <View style={{}}>
                        <Text  style={[styles.maintitle,{color:colors.title}]}>Description:</Text>
                        <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.text,lineHeight:20,marginTop:10,opacity:.8}]}>
                        {product?.description || "Plaquettes de frein avant en céramique de haute qualité, fabriquées par Bosch. Compatibles avec Toyota Corolla 2015-2022. Matériau céramique pour un freinage silencieux et efficace avec moins de poussière de frein. Inclut témoin d'usure intégré."}
                        </Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginVertical:8,marginBottom:0}]}>
                    <Text style={[styles.maintitle,{color:colors.title}]}>Fiche Technique Complète</Text>
                </View>
                <View style={[GlobalStyleSheet.container,{flex:1,paddingTop:0}]}>
                    <View style={{ marginHorizontal: -15, marginTop: 0, flex: 1 }}>
                        <SectionList
                            contentContainerStyle={{backgroundColor:colors.card,marginTop:-10}}
                            scrollEnabled={false}
                            sections={productSpecs}
                            keyExtractor={(item:any, index) => item + index}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    //onPress={() => navigation.navigate(item.navigate)}
                                    style={[styles.sectionList,{
                                        backgroundColor:colors.card,
                                    }]}
                                >
                                    <View style={{width:'40%'}}>
                                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,}}>{item.title}</Text>
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.fontRegular,fontSize:14,color:colors.title}}>{item.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            renderSectionHeader={({ section:{ title } }) => (
                                <Text 
                                    style={[styles.sectionTitle,{
                                        color: colors.title,
                                        backgroundColor:colors.background,
                                    }]}
                                >{title}</Text>
                            )}
                        />
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:15,paddingVertical:0,marginTop:5}]}>
                    <View style={GlobalStyleSheet.flex}>
                        <Text style={[FONTS.fontMedium,{fontSize:18,color:colors.title}]}>Pièces Similaires</Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{padding:0}]}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal:10}}
                    >
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            {displayRelated.map((data:any, index) => {
                                return (
                                    <View style={[{ marginBottom: 0, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3,marginHorizontal:5,marginTop:10 }]} key={index}>
                                        <Cardstyle1
                                            id={data.id}
                                            title={data.title}
                                            image={data.image}
                                            price={data.price}
                                            offer={data.offer}
                                            color={data.color}
                                            brand={data.brand}
                                            discount={data.discount}
                                            background
                                            onPress3={() => addItemToWishList(data)}
                                            //onPress={() => navigation.navigate('ProductsDetails')}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{padding:0,}]}>
                <View 
                    style={styles.bottombtn}
                >
                    <View style={{width:'50%'}}>
                        <Button
                            onPress={() => {addItemToCart(); navigation.navigate('MyCart')}}
                            title='Ajouter au panier' 
                            color={COLORS.title}
                            text={COLORS.card}
                            style={{borderRadius:0}}
                        />
                    </View>
                    <View style={{width:'50%'}}>
                        <Button
                            title='Acheter'
                            color={COLORS.primary}
                            text={COLORS.title}
                            onPress={() => navigation.navigate('DeleveryAddress')}
                            style={{borderRadius:0}}
                        />
                    </View>
                </View>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    imagecard:{
        height:undefined,
        width:'100%',
        aspectRatio:1/.85,
        backgroundColor:COLORS.card,
        justifyContent:'center'
    },
    imageSwiper:{
        borderWidth: 2,
        height: 40,
        width: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toparre:{
        position: 'absolute',
        left: 10,
        right: 10,
        top: 0,
        paddingHorizontal: 0,
        paddingLeft:10,
        paddingVertical: 10,
        flexDirection: 'row',
        //alignItems:'center',
        justifyContent:'space-between'
    },
    offerbtn:{
        marginTop:10,
        backgroundColor:COLORS.success,
        paddingHorizontal:5,
        paddingVertical:2,
        borderRadius:4
    },
    likebtn:{
        height: 38,
        width: 38,
        borderRadius: 38,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginTop:2
    },
    subtitle:{
        ...FONTS.fontRegular,
        fontSize:14,
        color:COLORS.title,
    },
    selectData:{
        paddingVertical:10,
        width:'100%',
        borderTopWidth:1,
        borderTopColor:COLORS.background,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    maintitle:{
        ...FONTS.fontMedium,
        fontSize:16,
        color:COLORS.title,
    },
    sectionList:{
        flexDirection: 'row',
        paddingHorizontal:15,
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor:COLORS.card,
    },
    sectionTitle:{
        ...FONTS.fontRegular,
        fontSize: 13,
        color: COLORS.title,
        paddingLeft: 15,
        paddingVertical:5,
        backgroundColor:COLORS.background,
        marginTop:10,
        marginBottom:10
    },
    bottombtn:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ProductsDetails