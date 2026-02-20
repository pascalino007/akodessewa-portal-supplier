import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Image, StyleSheet, ActivityIndicator} from 'react-native'
import Header from '../../layout/Header';
import { COLORS, SIZES ,FONTS} from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchOrders } from '../../redux/slices/ordersSlice';

const MyorderData = [
    {
        image:IMAGES.item02,
        title:'ChicCraze Fashionable Attire Emporium',
        price:"$179",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Apple",
        trackorder:true,
        status : "ongoing",
    },
    {
        image:IMAGES.item03,
        title:"Class Act Bluetooth Head phones Wireless",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true,
        completed:true,
        status : "completed",
    },
    {
        image:IMAGES.item05,
        title:'Trend Traverse Chic Clothing Collection Hub',
        price:"$199",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"OLG",
        EditReview:true,
        completed:true,
        status : "completed",
    },
    {
        image:IMAGES.item07,
        title:'Electra Ease Tech and Gadgets Haven',
        price:"$149",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Sony",
        completed:true,
        status : "completed",
    },
    {
        image:IMAGES.item12,
        title:'Zen Dash Active Flex Shoes',
        price:"$299",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Deslar",
        trackorder:true,
        status : "ongoing",
    },
    {
        image:IMAGES.item13,
        title:'Nova Stride Street Stompers',
        price:"$99",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"Apple",
        trackorder:true,
        status : "ongoing",
    },
]

type MyorderScreenProps = StackScreenProps<RootStackParamList, 'Myorder'>;

const Myorder = ({navigation} : MyorderScreenProps) => {
    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    const appDispatch = useAppDispatch();
    const { items: apiOrders, isLoading } = useAppSelector((state) => state.orders);

    useEffect(() => {
        appDispatch(fetchOrders(undefined));
    }, []);

    // Map API orders to display format
    const apiOrderData = apiOrders.length > 0
        ? apiOrders.map((o: any) => {
            const ongoing = ['PENDING','CONFIRMED','PROCESSING','SHIPPED','IN_TRANSIT'].includes(o.status);
            const completed = ['DELIVERED'].includes(o.status);
            const firstItem = o.items?.[0];
            return {
                image: firstItem?.product?.images?.find((i: any) => i.isMain)?.url
                    ? { uri: firstItem.product.images.find((i: any) => i.isMain).url }
                    : IMAGES.item02,
                title: firstItem?.product?.name || `Commande #${o.orderNumber}`,
                price: `${Number(o.total).toLocaleString('fr-FR')} CFA`,
                delevery: o.shippingFee === 0 ? 'Livraison GRATUITE' : `Livraison: ${Number(o.shippingFee).toLocaleString('fr-FR')} CFA`,
                offer: o.discount > 0 ? `-${Math.round((o.discount / o.subtotal) * 100)}%` : undefined,
                btntitle: ongoing ? 'Suivre' : undefined,
                brand: o.shop?.name || '',
                trackorder: ongoing,
                completed: completed,
                EditReview: completed,
                status: ongoing ? 'ongoing' : 'completed',
                orderId: o.id,
            };
        })
        : MyorderData;

    const [orderData , setOrderData] = useState(apiOrderData);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        setOrderData(apiOrderData);
        setActiveFilter('all');
    }, [apiOrders]);

    const filterData = (val:any) => {
        setActiveFilter(val);
        if(val === 'all'){
            setOrderData(apiOrderData);
        } else {
            const newArry = apiOrderData.filter((e: any) => e.status === val);
            setOrderData(newArry);
        }
    }


    const removeItem = (indexToRemove: number) => {
        setOrderData(prevItems => prevItems.filter((item, index) => index !== indexToRemove));
      };

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='My Order'
                leftIcon='back'
                titleLeft
            />
            <View 
                style={[
                    {   padding: 0,
                        backgroundColor:COLORS.title,
                    }
                    ]}
            >
                <View style={GlobalStyleSheet.flex}>
                    <TouchableOpacity
                        onPress={() => filterData('all')} 
                        style={{width:'20%',justifyContent:'center',alignItems:'center'}}
                    >
                        <Text style={[
                            FONTS.fontMedium,{fontSize:15,color: activeFilter === 'all' ?orderData.length === 0 ? COLORS.card : COLORS.primary : COLORS.card },
                        ]}>All</Text>
                    </TouchableOpacity>
                    <View style={{width:1,height:40,backgroundColor:COLORS.card,opacity:.2}}/>
                    <TouchableOpacity
                        onPress={() => filterData('ongoing')}
                        activeOpacity={0.5}  style={styles.TopbarCenterLine}>
                        <Image
                            style={{height:16,width:16,resizeMode:'contain',tintColor: activeFilter === 'ongoing' ?orderData.length === 0 ? COLORS.card : COLORS.primary : COLORS.card }}
                            source={IMAGES.deliverytruck2}
                        />
                        <Text style={[
                            FONTS.fontMedium,{fontSize:15,color: activeFilter === 'ongoing' ?orderData.length === 0 ? COLORS.card : COLORS.primary : COLORS.card },
                        ]}>Ongoing</Text>
                    </TouchableOpacity>
                    <View style={{width:1,height:40,backgroundColor:COLORS.card,opacity:.2}}/>
                    <TouchableOpacity
                        onPress={() => filterData('completed')} 
                        activeOpacity={0.5}  style={styles.TopbarCenterLine}>
                        <Image
                            style={{height:16,width:16,resizeMode:'contain',tintColor: activeFilter === 'completed' ?orderData.length === 0 ? COLORS.card : COLORS.primary : COLORS.card }}
                            source={IMAGES.savecheck}
                        />
                         <Text style={[
                            FONTS.fontMedium,{fontSize:15,color: activeFilter === 'completed' ?orderData.length === 0 ? COLORS.card : COLORS.primary : COLORS.card },
                        ]}>Completed</Text>
                    </TouchableOpacity>
                </View>
            </View>
           <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:orderData.length === 0 ? 'center':'flex-start' }}>
                <View style={[GlobalStyleSheet.container, { paddingTop: 10, }]}>
                    <View style={{ marginHorizontal: -15, }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View>
                                {orderData.map((data:any, index) => {
                                    return (
                                        <View   key={index} style={{marginBottom:10}}>
                                            <Cardstyle2
                                                title={data.title}
                                                price={data.price}
                                                delevery={data.delevery}
                                                image={data.image}
                                                offer={data.offer}
                                                brand={data.brand}
                                                btntitle={data.btntitle}
                                                trackorder={data.trackorder}
                                                completed={data.completed}
                                                EditReview={data.EditReview}
                                                onPress={() => navigation.navigate('ProductsDetails')}
                                                onPress2={() => navigation.navigate('Trackorder')}
                                                onPress3={() => navigation.navigate('Writereview')}
                                                onPress4={() => removeItem(index)}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                        {orderData.length === 0 &&
                            <View style={[GlobalStyleSheet.container,{padding:0,left:0,right:0,bottom:0,top:0,}]}>
                                <View
                                    style={{
                                        flex:1,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            height:60,
                                            width:60,
                                            borderRadius:60,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            backgroundColor:COLORS.primaryLight,
                                            marginBottom:20,
                                        }}
                                    >
                                        <FeatherIcon color={COLORS.primary} size={24} name='shopping-cart'/>
                                    </View>
                                    <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Your My Order is Empty!</Text>    
                                    <Text
                                        style={{
                                            ...FONTS.fontSm,
                                            color:colors.text,
                                            textAlign:'center',
                                            paddingHorizontal:40,
                                            //marginBottom:30,
                                        }}
                                    >Add Product to you addcart and shop now.</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
       </View>
    )
}


const styles = StyleSheet.create({
    TopbarCenterLine:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        width:'40%',
        justifyContent:'center'
    }
})

export default Myorder