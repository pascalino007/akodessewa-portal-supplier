import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { View, Text,TouchableOpacity,Image,ScrollView, StyleSheet, TextInput, Platform, ActivityIndicator } from 'react-native'
import { COLORS,FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Cardstyle1 from '../../components/Card/Cardstyle1';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import BottomSheet2 from '../Components/BottomSheet2';
import Header from '../../layout/Header';
import { useDispatch } from 'react-redux';
import { addTowishList } from '../../redux/reducer/wishListReducer';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/productsSlice';
import { fetchCategories } from '../../redux/slices/categoriesSlice';

const sliderData = [
    {
        title: "Toutes",
        value:"Toutes"
    },
    {
        title: "Freinage",
        value:"Freinage"
    },
    {
        title: "Moteur",
        value:"Moteur"
    },
    {
        title: "Filtration",
        value:"Filtration"
    },
    {
        title: "Suspension",
        value: "Suspension",
    },
    {
        title: "Électricité",
        value: "Électricité",
    },
    {
        title: "Carrosserie",
        value: "Carrosserie",
    },

]

const cardgridData =[
    {
        id:"30",
        image:IMAGES.item03,
        title:"Plaquettes de frein avant - Toyota Corolla",
        price:"15 000 CFA",
        discount:"22 000 CFA",
        offer:"-32%",
        hascolor:true,
        status:"Freinage"
    },
    {
        id:"31",
        image:IMAGES.item04,
        title:"Disques de frein ventilés - Peugeot 206",
        price:"25 000 CFA",
        discount:"35 000 CFA",
        offer:"-29%",
        hascolor:true,
        status:"Freinage"
    },
    {
        id:"32",
        image:IMAGES.item012,
        title:"Filtre à huile - Mercedes C200",
        price:"5 500 CFA",
        discount:"8 000 CFA",
        offer:"-31%",
        color:false,
        hascolor:true,
        status:"Filtration"
    },
    {
        id:"33",
        image:IMAGES.item011,
        title:"Courroie de distribution - Renault Clio",
        price:"18 000 CFA",
        discount:"28 000 CFA",
        offer:"-36%",
        hascolor:true,
        status:"Moteur"
    },
    {
        id:"34",
        image:IMAGES.item010,
        title:"Amortisseur avant gauche - Honda Civic",
        price:"35 000 CFA",
        discount:"50 000 CFA",
        offer:"-30%",
        hascolor:true,
        status:"Suspension",
    },
    {
        id:"35",
        image:IMAGES.item06,
        title:"Alternateur reconditionné - BMW E90",
        price:"75 000 CFA",
        discount:"120 000 CFA",
        offer:"-38%",
        hascolor:true,
        status:"Électricité",
    },
    {
        id:"36",
        image:IMAGES.item05,
        title:"Pare-chocs avant - Volkswagen Golf 7",
        price:"45 000 CFA",
        discount:"65 000 CFA",
        offer:"-31%",
        hascolor:true,
        status:"Carrosserie",
    },
    {
        id:"37",
        image:IMAGES.item02,
        title:"Kit d'embrayage complet - Peugeot 307",
        price:"55 000 CFA",
        discount:"80 000 CFA",
        offer:"-31%",
        hascolor:true,
        status:"Moteur"
    },
    {
        id:"38",
        image:IMAGES.item01,
        title:"Filtre à air sport - Toyota Hilux",
        price:"12 000 CFA",
        discount:"18 000 CFA",
        offer:"-33%",
        hascolor:true,
        status:"Filtration"
    },
    {
        id:"39",
        image:IMAGES.item09,
        title:"Batterie 12V 70Ah - Universel",
        price:"45 000 CFA",
        discount:"60 000 CFA",
        offer:"-25%",
        hascolor:true,
        status:"Électricité"
    },
    {
        id:"40",
        image:IMAGES.item010,
        title:"Phare avant droit - Mercedes W204",
        price:"85 000 CFA",
        discount:"120 000 CFA",
        offer:"-29%",
        hascolor:true,
        status:"Carrosserie"
    },
]


type ProductsScreenProps = StackScreenProps<RootStackParamList, 'Products'>;

const Products = ({navigation} : ProductsScreenProps)=> {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    const appDispatch = useAppDispatch();
    const { items: apiProducts, isLoading } = useAppSelector((state) => state.products);
    const { items: apiCategories } = useAppSelector((state) => state.categories);

    useEffect(() => {
        appDispatch(fetchProducts({}));
        appDispatch(fetchCategories(undefined));
    }, []);

    // Build product data from API or fallback
    const productData = useMemo(() => {
        if (apiProducts.length > 0) {
            return apiProducts.map((p: any) => {
                const mainImg = p.images?.find((i: any) => i.isMain);
                const discount = p.compareAtPrice && p.compareAtPrice > p.price
                    ? `${Number(p.compareAtPrice).toLocaleString('fr-FR')} CFA`
                    : undefined;
                const offer = p.compareAtPrice && p.compareAtPrice > p.price
                    ? `-${Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)}%`
                    : undefined;
                return {
                    id: String(p.id),
                    image: mainImg?.url ? { uri: mainImg.url } : IMAGES.item03,
                    title: p.name,
                    price: `${Number(p.price).toLocaleString('fr-FR')} CFA`,
                    discount,
                    offer,
                    hascolor: true,
                    status: p.category?.name || 'Toutes',
                    slug: p.slug,
                };
            });
        }
        return cardgridData;
    }, [apiProducts]);

    // Build filter tabs from API categories or fallback
    const filterTabs = useMemo(() => {
        if (apiCategories.length > 0) {
            const tabs = [{ title: 'Toutes', value: 'Toutes' }];
            apiCategories.forEach((c: any) => {
                tabs.push({ title: c.name, value: c.name });
            });
            return tabs;
        }
        return sliderData;
    }, [apiCategories]);

    const [show, setshow] = useState(true);

    const [orderData , setOrderData] = useState(productData);
    const [activeFilter, setActiveFilter] = useState('Toutes');

    useEffect(() => {
        setOrderData(productData);
        setActiveFilter('Toutes');
    }, [productData]);

    const filterData = (val:any) => {
        setActiveFilter(val);
        if(val === 'Toutes'){
            setOrderData(productData);
        } else {
            const newArry = productData.filter((e: any) => e.status === val);
            setOrderData(newArry);
        }
    }

    const sheetRef = useRef<any>(null);

    const dispatch = useDispatch();

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
        }

    return (
       <View style={{backgroundColor:colors.background, flex:1}}>
            <Header
                title='Pièces Auto'
                leftIcon='back'
                titleLeft
                rightIcon1={'search'}
                rightIcon2={'cart'}
            />
            <View 
                style={[
                    {   padding: 0,
                        //paddingHorizontal:15,
                        backgroundColor:COLORS.title,
                        height:40,
                        width:'100%',
                    }
                 ]}
            >
                <View style={GlobalStyleSheet.flex}>
                    <TouchableOpacity activeOpacity={0.5}  onPress={() => sheetRef.current.openSheet('short')} style={styles.HeaderBox}>
                        <Image
                            style={styles.HearderImage}
                            source={IMAGES.list2}
                        />
                        <Text style={styles.HeaderTitle}>SORT</Text>
                    </TouchableOpacity>
                    <View style={[styles.HeaderLine,{backgroundColor:colors.card,}]}/>
                    <TouchableOpacity activeOpacity={0.5}  onPress={() => sheetRef.current.openSheet('filter')}  style={styles.HeaderBox}>
                        <Image
                            style={styles.HearderImage}
                            source={IMAGES.filter3}
                        />
                        <Text style={styles.HeaderTitle}>FILTER</Text>
                    </TouchableOpacity>
                    <View style={[styles.HeaderLine,{backgroundColor:colors.card,}]}/>
                    <TouchableOpacity onPress={() => {setshow(!show) }} style={styles.HearderBox2}>
                        <Image
                            style={{height:22,width:22,resizeMode:'contain',tintColor:show ? COLORS.card : COLORS.primary}}
                            source={IMAGES.list}
                        />
                    </TouchableOpacity>
                    <View style={[styles.HeaderLine,{backgroundColor:colors.card,}]}/>
                    <TouchableOpacity onPress={() => {setshow(!show) }} style={styles.HearderBox2}>
                        <Image
                            style={{height:22,width:22,resizeMode:'contain',tintColor:show ? COLORS.primary : COLORS.card}}
                            source={IMAGES.grid}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:0}}>
                <View style={[GlobalStyleSheet.container,{paddingVertical:0,paddingHorizontal:0,}]}>
                    <View style={[{ paddingTop:5,paddingBottom:0 ,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginBottom:10}]}>
                        <View style={{ marginHorizontal: -15, marginBottom: 10,paddingHorizontal:15 }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15}}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                                    {filterTabs.map((data:any, index) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => filterData(data.value)}
                                                activeOpacity={0.5}
                                                key={index}
                                                style={[styles.sliderData,{
                                                    backgroundColor:activeFilter === data.value ? colors.title : colors.background,

                                                }]}>
                                                <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:activeFilter === data.value ? theme.dark ? COLORS.title :colors.card : colors.title }}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{backgroundColor:colors.card}}>
                        {show ?
                            <View style={{paddingTop:10,padding:10}}>
                                <View style={[GlobalStyleSheet.row]}>
                                    {orderData.map((data:any, index) => {
                                        if(index == 4){
                                            return(
                                                <View key={index} style={{marginHorizontal:-10,marginTop:-10}}>
                                                    <Image
                                                        style={{width:'100%',height:undefined,aspectRatio:1/.3,resizeMode:'contain'}}
                                                        source={IMAGES.ads4}
                                                    />
                                                </View>
                                            )
                                        }else{
                                            return (
                                                <View key={index} style={[GlobalStyleSheet.col50, { marginBottom:0}]}>
                                                    <Cardstyle1
                                                        id={data.id}
                                                        title={data.title}
                                                        image={data.image}
                                                        price={data.price}
                                                        color={data.color}
                                                        offer={data.offer}
                                                        discount={data.discount}
                                                        onPress={() => navigation.navigate('ProductsDetails', { slug: data.slug || undefined })}
                                                        onPress3={() => addItemToWishList(data)}
                                                    />
                                                </View>
                                            )
                                        }
                                    })}   
                                </View>
                            </View>
                        :
                            <View style={[{}]}>
                                {orderData.map((data:any, index) => {
                                    if(index === 2){
                                        return(
                                            <View key={index} style={{paddingVertical:0,marginTop:-10,marginBottom:0}}>
                                                <Image
                                                    style={{width:'100%',height:undefined,aspectRatio:1/.3,resizeMode:'contain'}}
                                                    source={IMAGES.ads4}
                                                />
                                            </View>
                                        )
                                    }else{
                                        return (
                                            <View key={index} style={{marginBottom:10}}>
                                                <Cardstyle2
                                                    title={data.title}
                                                    price={data.price}
                                                    delevery={data.delevery}
                                                    image={data.image}
                                                    offer={data.offer}
                                                    removebottom
                                                    discount={data.discount}
                                                    brand={data.brand}
                                                    onPress={() => navigation.navigate('ProductsDetails', { slug: data.slug || undefined })}
                                                    onPress3={() => addItemToWishList(data)}
                                                />
                                            </View>
                                        )
                                    }
                                })}
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
            <BottomSheet2
                ref={sheetRef}
            />
       </View>
    )
}


const styles = StyleSheet.create({
    HearderImage:{
        height:16,
        width:16,
        resizeMode:'contain',
        tintColor:COLORS.primary
    },
    HeaderLine:{
        width:1,
        height:40,
        backgroundColor:COLORS.card,
        opacity:.2
    },
    HeaderTitle:{
        ...FONTS.fontRegular,
        fontSize:15,
        color:COLORS.card
    },
    HeaderBox:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        width:'35%',
        justifyContent:'center'
    },
    HearderBox2:{
        width:'15%',
        justifyContent:'center',
        alignItems:'center'
    },
    sliderData:{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:6,
        marginTop: 5,
        paddingHorizontal: 15,
        paddingVertical: 5
    }
})

export default Products