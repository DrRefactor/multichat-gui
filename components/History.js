import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Message } from './Message';
import { MessageService } from '../services/MessageService';


export class History extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { messages = [] } = this.props
    return (
      <ScrollView style={styles.container}>
        { messages.map(message => <Message key={message.id} text={message.text} date={message.date} out={message.out} />) }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  }
})