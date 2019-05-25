import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export class Message extends React.Component {
  render() {
    const {
      text,
      date,
      out,
      color,
      username
    } = this.props
    return (
      <View style={[
        styles.wrapper,
        out ? styles.wrapperOut : {}
        ]}>
        <View>
          {username && <Text style={[styles.username, out ? styles.textOut : {}]}>{username}</Text> || null}
          <Text style={[styles.date, out ? styles.textOut : {}]}>{ date.toLocaleString() }</Text>
          <View style={[
            styles.textContainer,
            color ? { backgroundColor: color } :  {}
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
    marginBottom: 10,
  },
  wrapperOut: {
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  date: {
    color: '#ccc',
    fontSize: 10,
    fontFamily: 'open-sans'
  },
  username: {
    color: '#777',
    fontSize: 10,
    fontFamily: 'open-sans-semibold',
  },
  textOut: {
    textAlign: 'right'
  },
  text: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'open-sans'
  },
})