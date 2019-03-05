import React from 'react'

import { TouchableOpacity, StyleSheet, View } from 'react-native'
import TabBarIcon from './TabBarIcon';

export class IconButton extends React.Component {
  render() {
    const {
      icon: name,
      focused,
      onPress = () => {},
      disabled,
      style = {}
    } = this.props

    const Container = disabled ?
      View :
      TouchableOpacity 

    return (
      <Container
        onPress={disabled ? (() => {}) : onPress}
        style={[styles.container, style]}>
        <TabBarIcon name={name} focused={focused} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
})