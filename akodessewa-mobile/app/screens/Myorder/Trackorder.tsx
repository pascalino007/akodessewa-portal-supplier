import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text,  ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native'
import Header from '../../layout/Header';
import { COLORS,FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchOrderById, clearCurrentOrder } from '../../redux/slices/ordersSlice';

const TrackorderData = [
    {
        image:IMAGES.item02,
        title:'Girls Blue Solid Pure Cotton Mini Skirt',
        price:"$179",
        delevery:"FREE Delivery",
        offer:"40% OFF",
        btntitle:'Track Order',
        brand:"#22344862"
    },
]

type TrackorderScreenProps = StackScreenProps<RootStackParamList, 'Trackorder'>;

const Trackorder = ({navigation, route} : TrackorderScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    const appDispatch = useAppDispatch();
    const { currentOrder, isLoading } = useAppSelector((state) => state.orders);
    const orderId = (route?.params as any)?.orderId;

    useEffect(() => {
        if (orderId) {
            appDispatch(fetchOrderById(orderId));
        }
        return () => { appDispatch(clearCurrentOrder()); };
    }, [orderId]);

    // Build tracking card data from API order
    const trackCardData = currentOrder ? [{
        image: currentOrder.items?.[0]?.product?.images?.find((i: any) => i.isMain)?.url
            ? { uri: currentOrder.items[0].product.images.find((i: any) => i.isMain).url }
            : IMAGES.item02,
        title: currentOrder.items?.[0]?.product?.name || `Commande #${currentOrder.orderNumber}`,
        price: `${Number(currentOrder.total).toLocaleString('fr-FR')} CFA`,
        delevery: currentOrder.shippingFee === 0 ? 'Livraison GRATUITE' : `Livraison: ${Number(currentOrder.shippingFee).toLocaleString('fr-FR')} CFA`,
        offer: '',
        btntitle: 'Suivre',
        brand: `#${currentOrder.orderNumber}`,
    }] : TrackorderData;

    // Determine which steps are completed based on order status
    const statusOrder = ['PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED'];
    const currentStatusIdx = currentOrder ? statusOrder.indexOf(currentOrder.status) : 1;

    const trackingSteps = [
        { label: 'Commande passée', description: 'Nous avons reçu votre commande' },
        { label: 'Commande confirmée', description: 'Votre commande a été confirmée' },
        { label: 'En préparation', description: 'Nous préparons votre commande' },
        { label: 'Expédiée', description: 'Votre commande est en route' },
        { label: 'Livrée', description: 'Votre commande a été livrée' },
    ];

    return (
        <View style={{backgroundColor:colors.backround,flex:1}}>
            <Header
                title='Suivi de commande'
                leftIcon='back'
                titleLeft
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container,{paddingTop:0,marginVertical:5,paddingBottom:0,backgroundColor:colors.card}]}>
                    <View style={{
                        marginHorizontal: -15
                    }}>
                        {trackCardData.map((data:any, index) => {
                            return (
                                <View key={index}>
                                    <Cardstyle2
                                        key={index}
                                        title={data.title}
                                        price={data.price}
                                        delevery={data.delevery}
                                        image={data.image}
                                        offer={data.offer}
                                        brand={data.brand}
                                        removebottom
                                        onPress={() => navigation.navigate('ProductsDetails')}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingTop:0,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <View style={[styles.TrackCard,{borderBottomColor:colors.background}]}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>Suivi de commande</Text>
                        {isLoading && <ActivityIndicator size="small" color={COLORS.primary} />}
                    </View>
                    {trackingSteps.map((step, idx) => {
                        const done = idx <= currentStatusIdx;
                        const isLast = idx === trackingSteps.length - 1;
                        return (
                            <View key={idx} style={[styles.flex, { marginTop: idx === 0 ? 0 : 30, marginBottom: isLast ? 20 : 0 }]}>
                                {done ? (
                                    <Image style={styles.checkimage} source={IMAGES.check4} />
                                ) : (
                                    <View style={[styles.cricleBackground, { backgroundColor: colors.background }]} />
                                )}
                                <View style={[styles.boxbackground, { backgroundColor: done ? COLORS.primary : colors.background }]}>
                                    <Text style={[styles.boxtitle, { color: done ? COLORS.card : colors.title }]}>
                                        {step.label}
                                    </Text>
                                    <Text style={[styles.boxsubtitle, { color: done ? COLORS.card : colors.title }]}>
                                        {step.description}
                                    </Text>
                                </View>
                                {!isLast && (
                                    <View style={[done ? styles.trackLine2 : styles.trackLine, { height: 63, backgroundColor: done ? COLORS.primary : colors.background }]} />
                                )}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    TrackCard:{
        marginTop: 15, 
        marginBottom: 20,
        borderBottomWidth:1,
        borderBottomColor:COLORS.background,
        marginHorizontal:-15,
        paddingHorizontal:15,
        paddingBottom:15 
    },
    flex:{
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20
    },
    checkimage:{
        height: 24, 
        width: 24, 
        resizeMode: 'contain',
        tintColor:COLORS.primary
    },
    cricleBackground:{
        height: 24, 
        width: 24,
        backgroundColor:COLORS.background, 
        borderRadius: 24 
    },
    boxbackground:{
        padding:10,
        backgroundColor:COLORS.background,
        paddingHorizontal:15,
        borderRadius:4
    },
    boxtitle:{
        ...FONTS.fontMedium, 
        fontSize: 16, 
        color: COLORS.title
    },
    boxsubtitle:{
        ...FONTS.fontRegular, 
        fontSize: 14, 
        color: COLORS.title
    },
    boxDate:{
        ...FONTS.fontRegular, 
        fontSize: 14,
        color:COLORS.primary
    },
    trackLine:{
        height: 60, 
        width: 2, 
        backgroundColor:COLORS.background, 
        position: 'absolute', 
        left: 11,
        top: 47
    },
    trackLine2:{
        width: 2, 
        backgroundColor:COLORS.primary, 
        position: 'absolute', 
        left: 11, 
        top: 43 
    }
})

export default Trackorder