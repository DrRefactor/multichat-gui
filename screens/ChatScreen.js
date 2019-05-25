import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { History } from '../components/History';
import { InputArea } from '../components/InputArea';
import { Header } from 'react-navigation'
import { MessageService } from '../services/MessageService';
import { delay } from '../utils/delay';
import { SessionService } from '../services/SessionService';

const PAGE_SIZE = 10

export class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('chatRoom') || "Chat",
  })

  constructor(props) {
    super(props)

    this.onMessageSend = this.onMessageSend.bind(this)
    this.fetchMessages = this.fetchMessages.bind(this)

    this.state = {
      messages: [],
      client: {},
      sessionId: '',
      translateMode: true,
      hasMoreMessages: false
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { language: prevLanguage, chatRoom: prevChatRoom, username: prevUserName } = prevProps.navigation.state.params || {}
    const { language, chatRoom, username } = this.props.navigation.state.params || {}
    const { sessionId } = this.state
    if (prevChatRoom !== chatRoom) {
      this.changeChat()
    }
    else {
      if (prevLanguage !== language) {
        this.setLanguage(sessionId).then(({ sessionId }) => this.fetchMessages(sessionId, true))
      }
      if (prevUserName !== username) {
        this.setUsername(sessionId)
      }
    }
  }
  componentDidMount() {
    this.changeChat()
  }
  componentWillUnmount() {
    this.disconnect()
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 20}
        behavior="padding"
        >
        <History
          disabled={!this.state.hasMoreMessages}
          getMessages={() => this.fetchMessages(this.state.sessionId)}
          messages={this.state.messages}
          translateMode={this.state.translateMode}
        />
        <InputArea
          onSend={this.onMessageSend}
          language={this.props.navigation.getParam("language")}
          onLanguageChange={this.setTranslateMode}
        />
      </KeyboardAvoidingView>
    )
  }

  async fetchMessages(sessionId, reset = false) {
    const chatRoom = this.props.navigation.getParam("chatRoom")
    const page = reset ? 0 : Number.parseInt(this.state.messages.length / PAGE_SIZE)
    try {
      const response = await MessageService.getMessages(sessionId, chatRoom, page, PAGE_SIZE);
      const { content: messages, totalPages } = response
      console.log('messages', messages)
      this.setState(prevState => {
        return {
          hasMoreMessages: !!(totalPages - page - 1),
          messages: reset ? 
            [...messages] :
            [...messages, ...prevState.messages].filter((m, index, arr) => !arr.slice(index + 1, arr.length).find(mm => mm.id === m.id))
        }
      })
    }
    catch (e) {
      /// handle error
    }
  }

  changeChat = () => {
    this.disconnect()
    this.connect()
      .then(delay(500))
      .then(({ sessionId }) => this.setUsername(sessionId))
      .then(({ sessionId }) => this.setLanguage(sessionId))
      .then(({ sessionId }) => this.fetchMessages(sessionId))
      .catch((e) => console.log(e))
  }

  connect = () => {
    const chatRoom = this.props.navigation.getParam("chatRoom")
    return MessageService.connect(chatRoom, this.receiveMessage)
      .then(({ client, sessionId }) => { 
        this.setState({ client, sessionId }) 
        return { client, sessionId }
      })
  }

  disconnect = () => {
    const { client } = this.state
    if (client && client.connected) {
      client.disconnect()
      // client.disconnect(() => { this.setState({ client: {}, sessionId: '' }) })
    }
  }

  setLanguage = sessionId => {
    const { chatRoom, language } = this.props.navigation.state.params || {}
    return SessionService.setLanguage(sessionId, chatRoom, language)
      .then(() => ({ sessionId }))
  }

  setUsername = sessionId => {
    const username = this.props.navigation.getParam("username")
    return SessionService.setUsername(sessionId, username)
      .then(() => ({ sessionId }))
  }

  setTranslateMode = language => {
    this.setState({
      translateMode: this.props.navigation.getParam("language") === language
    })
  }

  receiveMessage = ({ body }) => {
    const message = JSON.parse(body)
    this.setState(prevState => {
      const { messages } = prevState || []
      return {
        messages: [...messages, message]
      }})
  }

  onMessageSend(text) {
    const chatRoom = this.props.navigation.getParam("chatRoom")
    this.state.client.send("/app/chat/" + chatRoom, JSON.stringify({
      text,
      timestamp: Date.now()
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
})