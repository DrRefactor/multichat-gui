import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export class Message extends React.Component {
  render() {
    const {
      text,
      date,
      out
    } = this.props
    return (
      <View style={[
        styles.wrapper,
        out ? styles.wrapperOut : {}
        ]}>
        <View>
          <Text style={styles.date}>{ date.toLocaleDateString() }</Text>
          <View style={[
            styles.textContainer,
            out ? styles.textContainerOut : {}
            ]}>
            <Text style={styles.text}>{ text }</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  wrapperOut: {
    justifyContent: 'flex-end'
  },
  textContainer: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'red'
  },
  textContainerOut: {
    backgroundColor: 'green'
  },
  date: {
    color: '#ccc',
    fontSize: 8,
  },
  text: {
    color: 'rgba(255,255,255,0.8)'
  },
  textOut: {}
})