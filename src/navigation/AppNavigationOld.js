/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { createAppNavigator,createBottomTabNavigator, createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React, {Component} from 'react';
import { View,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import LandingScreen from '../screens/Landing/LandingScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import EmailAdressScreen from '../screens/EmailAdress/EmailAdressScreen';
import FingerPrintScreen from '../screens/FingerPrint/FingerPrintScreen';
import PasswordScreen from '../screens/Password/PasswordScreen';
import HelpScreen from '../screens/Help/HelpScreen';
import GenderScreen from '../screens/Gender/GenderScreen';
import InterestsScreen from '../screens/Interests/InterestsScreen';
import ProfilePictureScreen from '../screens/ProfilePicture/ProfilePictureScreen';
import WaterScreen from '../screens/Water/WaterScreen';
import CommuityScreen from '../screens/Community/CommunityScreen';
import CommentScreen from '../screens/Comment/CommentScreen';
import CreatePostScreen from '../screens/CreatePost/CreatePostScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import CreateCommentScreen from '../screens/CreateComment/CreateCommentScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreeen';
import GoalAchievedScreen from '../screens/GoalAchieved/GoalAchievedScreen';
import NutritionScreen from '../screens/Nutrition/NutritionScreen';
import StepsScreen from '../screens/Steps/StepsScreen';
import PremiumScreen from '../screens/Premium/PremiumScreen';
import SuccessScreen from '../screens/Success/SuccessScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
import MapScreen from '../screens/Map/MapScreen';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Water: { screen: WaterScreen },
  Nutrition: {screen: NutritionScreen}
});

const Tab = createBottomTabNavigator({
    Home:  {
      screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor, activeTintColor}) => (
               <Image source={require('../../assets/icons/menuHome.png')}
                      style={{width:24,height:24,tintColor:'white'}}/>
            )
        },
    },
    Map: {
      screen: MapScreen,
        navigationOptions: {
            tabBarLabel: 'Map',
            tabBarIcon: ({tintColor, activeTintColor}) => (
               <Image source={require('../../assets/icons/safari.png')}
                      style={{width:24,height:24,tintColor:'white'}}/>
            )
        },
    },
    Assorbimento: {
      screen: StepsScreen,

        navigationOptions: {
            tabBarLabel: 'Assorbimento',
            tabBarIcon: ({tintColor, activeTintColor}) => (
               <Image source={require('../../assets/icons/menuWorld.png')}
                      style={{width:24,height:24,tintColor:'white'}}/>
            )
        },
    },
    User: {
      screen: PremiumScreen,
        navigationOptions: {
            tabBarLabel: 'Utente',
            tabBarIcon: ({tintColor, activeTintColor}) => (
               <Image source={require('../../assets/icons/user.png')}
                      style={{width:24,height:24,tintColor:'white'}}
                      />
            )
        }
    },
},
{   initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#bdbdbd',
      style: {
        backgroundColor: '#0d47a1',
        height: 55
      }
    }
});
export default createAppContainer(Tab);

/*const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Community: CommuityScreen,
    Water: WaterScreen,
    Comment: CommentScreen,
    CreatePost: CreatePostScreen,
    Settings: SettingsScreen,
    CreateComment: CreateCommentScreen,
    Notifications: NotificationsScreen,
    GoalAchieved: GoalAchievedScreen,
    Nutrition: NutritionScreen,
    Steps: StepsScreen,
    Map: MapScreen,
    Premium: PremiumScreen,
    Success: SuccessScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
      },
      headerRight: <View />
    })
  }
);

const LandingNavigator = createStackNavigator(
  {
    Landing: LandingScreen,
    Email: EmailAdressScreen,
    FingerPrint: FingerPrintScreen,
    Password: PasswordScreen,
    Help: HelpScreen,
    Gender: GenderScreen,
    Interests: InterestsScreen,
    ProfilePicture: ProfilePictureScreen,
    SignIn: SignInScreen
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator,
    Landing: LandingNavigator
  },
  {
    
  }
);

export default AppContainer = createAppContainer(DrawerStack);*/
