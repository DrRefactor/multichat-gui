import React from 'react';
import { withNavigation } from 'react-navigation'
import { Section, TextField } from '../../components/Section/Section';
import { ActionsSection, ActionButton } from '../../components/Section/ActionSection';
import { SettingsView } from '../../components/UI/SettingsView/SettingsView';
import { NavigationHeaderStyles } from '../../components/UI/Navigation/NavigationHeader/NavigationHeaderStyles';
import { StorageService } from '../../services/StorageService';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerLeft: null,
    headerStyle: {
      ...NavigationHeaderStyles.headerStyle,
      shadowColor: 'transparent'
    }
  }
  
  // const { chatRoom = "", username = "" } = this.props.navigation.state.params || {}
  state = {
    chatRoom: "",
    username: ""
  }

  componentDidMount() {
    StorageService.getMany(["chatRoom", "username"]).then(res => this.setState({ ...res }))
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
              onPress={async () => { 
                await StorageService.saveMany({ chatRoom, username })
                navigation.push('Language', { ...(navigation.state.params || {}), chatRoom, username }) }}
            />
          </ActionsSection>
      </SettingsView>
    )
  }
}

export default withNavigation(SettingsScreen)