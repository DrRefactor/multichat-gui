import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

export class LoadingBoundary extends React.Component {
  render() {
    const { isLoading, children, color } = this.props
    return isLoading ?
      <LoadingIndicator color={color} />
      : children
  } 
}

class LoadingIndicator extends React.Component {
  state = {
    opacity: new Animated.Value(1),
    radius: new Animated.Value(0),
    margin: new Animated.Value(0)
  }

  componentDidMount() {
    const { opacity, radius, margin } = this.state
    
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
          }),
          Animated.timing(radius, {
            toValue: 30,
            duration: 1000,
          }),
          Animated.timing(margin, {
            toValue: -15,
            duration: 1000,
          }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 0,
          }),
          Animated.timing(radius, {
            toValue: 0,
            duration: 0,
          }),
          Animated.timing(margin, {
            toValue: 0,
            duration: 0,
          }),
        ])
      ])
    ).start()
  }

  render() {
    const { color } = this.props
    const { opacity, radius, margin } = this.state
    return (
      <Container>
        <AnimatedView color={color} style={{ opacity, width: radius, height: radius, marginTop: margin }} /> 
      </Container>
    )
  }
}

const Container = styled.View`
  display: flex;
  flex-grow: 1;
  align-content: center;
  align-items: center;
  margin-top: 100;
`
  
const AnimatedContainer = styled.View`
  border-radius: 30;
  background-color: ${props => props.color ? props.color : 'white'};
`

const AnimatedView = Animated.createAnimatedComponent(AnimatedContainer)