import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { History } from '../components/History';
import { InputArea } from '../components/InputArea';
import { Header } from 'react-navigation'
import { MessageService } from '../services/MessageService';


export class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "Chat"
  }

  constructor(props) {
    super(props)

    this.onMessageSend = this.onMessageSend.bind(this)
    this.fetchMessages = this.fetchMessages.bind(this)

    this.state = {
      messages: []
    }
  }
  componentDidMount() {
    this.fetchMessages()
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 20}
        behavior="padding"
        >
        <History
          messages={this.state.messages}
        />
        <InputArea
          onSend={this.onMessageSend}
        />
      </KeyboardAvoidingView>
    )
  }

  async fetchMessages() {
    const messages = await MessageService.getMessages();

    this.setState({
      messages
    })
  }

  onMessageSend(text) {
    this.fetchMessages()
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
})