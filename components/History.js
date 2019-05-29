import React from 'react';
import { ScrollView, StyleSheet, Keyboard, Platform } from 'react-native';
import { Message } from './Message';
import { delay } from '../utils/delay';
import { TextButton } from './TextButton';
import Colors from '../constants/Colors';

const log = (...xs) => console.log('[History]', ...xs)

export class History extends React.Component {
  constructor(props) {
    super(props)

    this.scrollDown = this.scrollDown.bind(this)
    this.onKeyboardShow = this.onKeyboardShow.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.scrollTo = this.scrollTo.bind(this)
    this.scrollBy = this.scrollBy.bind(this)
    
    this._initialized = false
    
    Keyboard.addListener('keyboardDidShow', this.onKeyboardShow)
    Keyboard.addListener('keyboardDidHide', this.onKeyboardShow)

    this.state = {
      scrollY: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this._initialized) {
      this._initialized = true
    }
    const messagesChanged = prevProps.messages !== this.props.messages
    const chatRoomChanged = prevProps.chatRoom !== this.props.chatRoom
    const pageChanged = prevProps.page !== this.props.page
    if (messagesChanged && (!pageChanged || chatRoomChanged)) {
      this.scrollDown()
    }
  }

  componentDidMount() {
    this.scrollDown()
  }
  
  render() {
    const { messages = [], translateMode = true, getMessages, disabled } = this.props
    return (
      <ScrollView
        contentInset={{ bottom: 0 }}
        style={styles.container}
        ref={component => this.scrollViewRef = component}
        // onScroll={this.handleScroll}
        // onScrollEndDrag={this.handleScroll}
        // scrollEventThrottle={100}
      >
        <TextButton 
          disabled={!messages.length || disabled}
          disabledStyle={styles.disabledButton}
          text="More messages" 
          textStyle={styles.buttonText} 
          style={styles.button} 
          onPress={getMessages}
        />
        { messages.map(message => <Message 
                                    key={message.id} 
                                    text={translateMode ? message.translatedText : message.text} 
                                    date={new Date(message.timestamp)} 
                                    out={message.out} 
                                    color={message.color}
                                    username={message.username}
                                  />) }
      </ScrollView>
    )
  }

  handleScroll(event) {
    this.setState({
      scrollY: event.nativeEvent.contentOffset.y,
      contentHeight: event.nativeEvent.contentSize.height,
      layoutHeight: event.nativeEvent.layoutMeasurement.height
    })
  }

  onKeyboardShow(e) {
    // const endCoordinates = e.endCoordinates ? e.endCoordinates : e.end
    // const startCoordinates = e.startCoordinates ? e.startCoordinates : e.start
    // const delta = endCoordinates.screenY - startCoordinates.screenY

    this.scrollDown()
  }

  scrollBy(delta) {
    const { scrollY, contentHeight, layoutHeight } = this.state
    const desiredY = scrollY + delta
    if (desiredY + layoutHeight > contentHeight) {
      return this.scrollDown()
    }
    if (desiredY < 0) {
      return this.scrollTo({ y: 0 })
    }
    return this.scrollTo({ y: desiredY })
  }

  async scrollTo({ y, animated }) {
    if (this.scrollViewRef) {
      await delay(0)()
      this.scrollViewRef.scrollTo({ y, animated })
    }
  }

  // Consider generic onMessageSent / onMessagesFetch mechanism
  async scrollDown(options) {
    if (this.scrollViewRef) {
      console.log('[History] scrolling down..')
      // scrolling must be done asynchronously - otherwise it simply doesn't work
      await delay(0)();

      this.scrollViewRef.scrollToEnd(options)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: Colors.tintColor, 
    borderRadius: 15, 
    marginTop: 15
  },
  disabledButton: {
    backgroundColor: '#76929B'
  },
  buttonText: { 
    textAlign: 'center', 
    padding: 15, 
    color: '#fff', 
    fontFamily: 'open-sans-semibold'
  }
})