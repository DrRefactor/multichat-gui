import React from 'react'
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { ChatScreen } from '../screens/ChatScreen';
import LanguageScreen from '../screens/settings/LanguageScreen';
import Colors from '../constants/Colors';
import { IconButton } from '../components/IconButton';
import { Platform } from 'react-native'

export const MainNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    Language: LanguageScreen,
    Chat: ChatScreen
  },   
  {
    initialRouteName: 'Settings',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: Colors.backgroundColor,
        borderBottomWidth: 0,
        height: 50
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 33,
        fontWeight: '600',
        fontFamily: 'gill-sans',
      },
      headerLeft: (
        <IconButton
          icon={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
          onPress={() => navigation.navigate('Settings')}
          iconColor="#fff"
          iconStyle={{ marginLeft: 15 }}
        />)  
    }),
  }
)