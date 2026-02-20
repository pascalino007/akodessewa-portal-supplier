import 'react-native-gesture-handler';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Route from './app/navigation/Route';
import store from './app/redux/store';

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            //paddingTop: Platform.OS === 'android' ? 25 : 0,
            //backgroundColor:COLORS.primary ,
          }}>
            <StatusBar style="dark" />
              <Provider store={store}>
                <Route/>
              </Provider>
        </SafeAreaView>
    </SafeAreaProvider>
    );
  }

};