import React from 'react'

import { Icon } from 'expo';
import Colors from '../constants/Colors';
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native'

export class IconButton extends React.Component {
  getIconColor = () => {
    const { disabled, iconColor, disabledIconColor } = this.props
    if(disabled) {
      return disabledIconColor ? disabledIconColor : "#c7c7c7"
    }
    return iconColor ? iconColor : Colors.tintColor
  }
  render() {
    const {
      icon: name,
      onPress = () => {},
      disabled = false,
      style,
      iconStyle
    } = this.props

    const Container = disabled ? View : TouchableOpacity

    return (
      <Container onPress={disabled ? (() => {}) : onPress} style={style}>
          <StyledIcon
            name={name}
            size={26}
            style={iconStyle}
            color={this.getIconColor()}
          />
      </Container>
    )
  }
}

const StyledIcon = styled(Icon.Ionicons)`
`