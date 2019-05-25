import React from 'react'
import { Platform } from 'react-native'
import { IconButton } from '../../../IconButton';

export const SettingsIcon = ({ navigation }) => (
  <IconButton
    icon={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    onPress={navigation ? () => navigation.push('Settings', navigation.state.params) : () => {}}
    iconColor="#fff"
    iconStyle={{ marginLeft: 15, marginBottom: -3 }}
  />
)