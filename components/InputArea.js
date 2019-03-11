import React from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native'
import Colors from '../constants/Colors';
import { IconButton } from './IconButton';
import { MessageService } from '../services/MessageService';

export class InputArea extends React.Component {
  constructor(props) {
    super(props)
    this.onSend = this.onSend.bind(this)
    this.state = {
      text: '',
      inputFocused: false,
      sending: false
    }
  }
  
  render() {
    const submitDisabled = !this.state.text || this.state.sending

    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            multiline={true} 
            style={styles.textInput}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            onFocus={() => this.setState({ inputFocused: true })}
            onBlur={() => this.setState({ inputFocused: false })}
            // editable={!this.state.sending}
          />
          <IconButton
            icon={ Platform.OS === 'ios' ? 'ios-send' : 'md-send' }
            onPress={this.onSend}
            focused={!submitDisabled}
            disabled={submitDisabled}
            style={styles.sendButton}
          />
        </View>
      </View>
    )
  }
  async onSend(e) {
    const { text } = this.state
    this.setState({ sending: true, text: '' })
    await MessageService.postMessage(text)
    if (this.props.onSend) {
      this.props.onSend(text)
    }
    this.setState({ sending: false })
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.toolTint,
    padding: 15
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    borderRadius: 15,
    backgroundColor: Colors.toolTint,
    padding: 15,
    maxHeight: 100,
    flex: 1
  },
  sendButton: {
    marginLeft: 15
  }
})