// Librerie e react
import React from 'react';
import { Image } from 'react-native';
import {Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Pagine app
import HomeScreen from '../screens/Home/HomeScreen';
import WaterScreen from '../screens/Water/WaterScreen';
import NutritionScreen from '../screens/Nutrition/NutritionScreen';
import ConsigliScreen from '../screens/Consigli/ConsigliScreen';
import UserScreen from '../screens/User/UserScreen';
import MapScreen from '../screens/Map/MapScreen';
import CosmeticScreen from '../screens/Cosmetic/CosmeticScreen'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const ConsigliStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {backgroundColor: "#ECECEC"},
      }}
    >
    <Stack.Screen name="Consigli" component={ConsigliScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Water" component={WaterScreen}/>
    <Stack.Screen name="Nutrition" component={NutritionScreen}/>
    <Stack.Screen name="Cosmetic" component={CosmeticScreen}/>
  </Stack.Navigator>
  );
};

const tabs = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
          style={{ backgroundColor: 'tomato' }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: "#01579b",
              tabBarIcon: ({ color }) => (
                <Image source={require('../../assets/icons/home.png')}
                      style={{width:25,height:25,tintColor:'white'}}/>
              ),
            }}
          />
          <Tab.Screen
            name="Mappa"
            component={MapScreen}
            options={{
              tabBarLabel: 'Mappa',
              tabBarColor: "#311b92",
              tabBarIcon: ({ color }) => (
                <Image source={require('../../assets/icons/safari.png')}
                      style={{width:22,height:22,tintColor:'white'}}/>
              ),
            }}
          />
          <Tab.Screen
            name="Consigli"
            component={ConsigliStack}
            options={{
              tabBarLabel: 'Consigli',
              tabBarColor: "rgb(46,100,77)",
              tabBarIcon: ({ color }) => (
                <Image source={require('../../assets/icons/consigli.png')}
                      style={{width:25,height:25,tintColor:'white'}}/>
              ),
            }}
          />
          <Tab.Screen
            name="Utente"
            component={UserScreen}
            options={{
              tabBarLabel: 'Utente',
              tabBarColor: "goldenrod",
              tabBarIcon: ({ color }) => (
                <Image source={require('../../assets/icons/user.png')}
                      style={{width:22,height:22,tintColor:'white'}}/>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default tabs;