import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { History } from '../components/History';
import { InputArea } from '../components/InputArea';
import { Header } from 'react-navigation'
import { MessageService } from '../services/MessageService';
import { delay } from '../utils/delay';
import { SessionService } from '../services/SessionService';
import { NotificationService } from '../services/NotificationService';
import { LoadingBoundary } from '../components/LoadingBoundary';
import Colors from '../constants/Colors';

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
      hasMoreMessages: false,
      isLoading: true,
      chatRoom: this.props.navigation.getParam("chatRoom"),
      page: 0
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
        this.setLanguage(sessionId).then(delay(200)).then(({ sessionId }) => this.fetchMessages(sessionId, true))
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
    const { page, chatRoom } = this.state
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 20}
        behavior="padding"
        >
        <LoadingBoundary isLoading={this.state.isLoading} color={Colors.tintColor}>
          <History
            disabled={!this.state.hasMoreMessages || this.state.isLoading}
            getMessages={() => this.fetchMessages(this.state.sessionId)}
            messages={this.state.messages}
            translateMode={this.state.translateMode}
            page={page}
            chatRoom={chatRoom}
          />
        </LoadingBoundary>
        <InputArea
          onSend={this.onMessageSend}
          language={this.props.navigation.getParam("language")}
          onLanguageChange={this.setTranslateMode}
        />
      </KeyboardAvoidingView>
    )
  }

  async fetchMessages(sessionId, reset = false) {
    this.setState({ isLoading: reset })
    const chatRoom = this.props.navigation.getParam("chatRoom")
    const page = reset ? 0 : Number.parseInt(this.state.messages.length / PAGE_SIZE)
    try {
      const response = await MessageService.getMessages(sessionId, chatRoom, page, PAGE_SIZE);
      const { content: messages, totalPages } = response
      this.setState(prevState => {
        return {
          hasMoreMessages: !!(totalPages - page - 1),
          messages: reset ? 
            [...messages] :
            [...messages, ...prevState.messages].filter((m, index, arr) => !arr.slice(index + 1, arr.length).find(mm => mm.id === m.id)),
          isLoading: false,
          chatRoom,
          page
        }
      })
    }
    catch (e) {
      /// handle error
    }
  }

  changeChat = () => {
    this.setState({ messages: [], isLoading: true })
    this.disconnect()
    this.connect()
      .then(delay(200))
      .then(({ sessionId }) => this.registerToken(sessionId))
      .then(({ sessionId }) => this.setUsername(sessionId))
      .then(({ sessionId }) => this.setLanguage(sessionId))
      .then(({ sessionId }) => this.fetchMessages(sessionId, true))
      .catch((e) => console.log(e))
  }

  registerToken = sessionId => {
    return NotificationService.registerForPushNotificationsAsync().then(token => 
      {
        if(sessionId) {
          SessionService.setToken(sessionId, token)
        }
        return { sessionId }
      })
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