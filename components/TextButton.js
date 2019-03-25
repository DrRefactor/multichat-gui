import React from 'react'

import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/Colors';

export class TextButton extends React.Component {
  render() {
    const {
      focused,
      onPress = () => {},
      disabled,
      style = {},
      textStyle,
      textFocusedStyle,
      text = ""
    } = this.props

    const Container = disabled ?
      View :
      TouchableOpacity 

    return (
      <Container
        onPress={disabled ? (() => {}) : onPress}
        style={[styles.container, style]}>
        <Text style={[
          styles.text,
          focused && styles.textFocused,
          textStyle,
          focused && textFocusedStyle
        ]}>{text}</Text>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: Colors.tabIconDefault
  },
  textFocused: {
    color: Colors.tabIconSelected
  }
})