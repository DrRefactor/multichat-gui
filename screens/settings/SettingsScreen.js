import React from 'react';
import { withNavigation } from 'react-navigation'
import { Section, TextField } from '../../components/Section/Section';
import { ActionsSection, ActionButton } from '../../components/Section/ActionSection';
import { SettingsView } from '../../components/UI/SettingsView/SettingsView';
import { NavigationHeaderStyles } from '../../components/UI/Navigation/NavigationHeader/NavigationHeaderStyles';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerLeft: null,
    headerStyle: {
      ...NavigationHeaderStyles.headerStyle,
      shadowColor: 'transparent'
    }
  }

  state = {
    chatRoom: '',
    username: ''
  }

  handleTextChange = (key, text) => {
    this.setState({ [key]: text })
  }
  render() {
    const { navigation } = this.props
    const { chatRoom, username } = this.state
    return (
      <SettingsView>
          <Section title="Choose chat room">
            <TextField 
              value={chatRoom}
              placeholder="Chat" 
              placeholderTextColor="#c7c7c7" 
              onChangeText={text => this.handleTextChange("chatRoom", text)}/>
          </Section>
          <Section title="Type your name">
            <TextField 
              value={username}
              placeholder="Name" 
              placeholderTextColor="#c7c7c7" 
              onChangeText={text => this.handleTextChange("username", text)}/>
          </Section>
          <ActionsSection>
            <ActionButton
              disabled={!chatRoom}
              title="Next"
              image="next"
              onPress={() => { navigation.push('Language', { chatRoom, username }) }}
            />
          </ActionsSection>
      </SettingsView>
    )
  }
}

export default withNavigation(SettingsScreen)