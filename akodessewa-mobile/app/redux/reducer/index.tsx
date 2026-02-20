import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';
import authReducer from '../slices/authSlice';
import productsReducer from '../slices/productsSlice';
import categoriesReducer from '../slices/categoriesSlice';
import brandsReducer from '../slices/brandsSlice';
import carsReducer from '../slices/carsSlice';
import searchReducer from '../slices/searchSlice';
import ordersReducer from '../slices/ordersSlice';
import shopsReducer from '../slices/shopsSlice';
import marketplaceReducer from '../slices/marketplaceSlice';
import mechanicsReducer from '../slices/mechanicsSlice';
import slidesReducer from '../slices/slidesSlice';
import reviewsReducer from '../slices/reviewsSlice';
import notificationsReducer from '../slices/notificationsSlice';
import promotionsReducer from '../slices/promotionsSlice';
import garageReducer from '../slices/garageSlice';

const rootReducer = combineReducers({
    drawer: drawerReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    cars: carsReducer,
    search: searchReducer,
    orders: ordersReducer,
    shops: shopsReducer,
    marketplace: marketplaceReducer,
    mechanics: mechanicsReducer,
    slides: slidesReducer,
    reviews: reviewsReducer,
    notifications: notificationsReducer,
    promotions: promotionsReducer,
    garage: garageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;