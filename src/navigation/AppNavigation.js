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
import StepsScreen from '../screens/Steps/StepsScreen';
import PremiumScreen from '../screens/Premium/PremiumScreen';
import MapScreen from '../screens/Map/MapScreen';

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

const HomeStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {backgroundColor: "#ECECEC"},
      }}
    >
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Water" component={WaterScreen}/>
    <Stack.Screen name="Nutrition" component={NutritionScreen}/>
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
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: "#0d47a1",
              tabBarIcon: ({ color }) => (
                <Image source={require('../../assets/icons/menuHome.png')}
                      style={{width:22,height:22,tintColor:'white'}}/>
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
            name="Assorbimento"
            component={StepsScreen}
            options={{
              tabBarLabel: 'Assorbimento',
              tabBarColor: "#004d40",
              tabBarIcon: ({ color }) => (
                <Image source={require('../../assets/icons/menuWorld.png')}
                      style={{width:22,height:22,tintColor:'white'}}/>
              ),
            }}
          />
          <Tab.Screen
            name="Utente"
            component={PremiumScreen}
            options={{
              tabBarLabel: 'Utente',
              tabBarColor: "#1a237e",
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