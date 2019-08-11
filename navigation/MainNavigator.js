import React from 'react'
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { ChatScreen } from '../screens/ChatScreen';
import LanguageScreen from '../screens/settings/LanguageScreen';
import { SettingsIcon } from '../components/UI/Navigation/SettingsIcon/SettingsIcon';
import { NavigationHeaderStyles } from '../components/UI/Navigation/NavigationHeader/NavigationHeaderStyles';

export const MainNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    Language: LanguageScreen,
    Chat: ChatScreen
  },   
  {
    initialRouteName: 'Settings',
    defaultNavigationOptions: ({ navigation }) => ({
      ...NavigationHeaderStyles,
      headerLeft: (
        <SettingsIcon navigation={navigation}/>
      ),
      gesturesEnabled: false,
    }),
  }
)