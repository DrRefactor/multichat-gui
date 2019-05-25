import React from 'react';
import { withNavigation } from 'react-navigation'
import { Section, SectionContentText } from '../../components/Section/Section';
import { ActionsSection, ActionButton } from '../../components/Section/ActionSection';
import { SettingsView } from '../../components/UI/SettingsView/SettingsView';
import { Text, TouchableOpacity, Picker, Platform } from 'react-native'
import { NavigationHeaderStyles } from '../../components/UI/Navigation/NavigationHeader/NavigationHeaderStyles';
import styled from 'styled-components/native'
import { IconButton } from '../../components/IconButton';
import { SessionService } from '../../services/SessionService';

class LanguageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: <BackIcon navigation={navigation}/>,
    headerStyle: {
      ...NavigationHeaderStyles.headerStyle,
      shadowColor: 'transparent'
    }
  })
  
  state = {
    language: '',
    supportedLanguages: []
  }

  componentDidMount() {
    SessionService.getLanguages()
      .then(languages => this.setState({ 
        supportedLanguages: languages,
        language: (languages.find(l => l.code === "en") || languages[0]).code
       }))
  }

  navigateToChat = () => {
    const { language } = this.state
    const { navigation } = this.props
    const params = navigation.state.params || {}
    navigation.navigate('Chat', { ...params, language })
  }
  renderSupportedLanguages = () => {
    return this.state.supportedLanguages.map(({ name, code }) => (
      <PickerItem key={code} label={name} value={code} color="#fff"/>
    ))
  }
  render() {
    const { language } = this.state

    return (
      <SettingsView>
          <Section title="Pick language">
            <PickerContainer           
              selectedValue={language}
              onValueChange={code => this.setState({ language: code })}>
                {this.renderSupportedLanguages()}
            </PickerContainer>
          </Section>
          <ActionsSection>
            <ActionButton
              disabled={!language}
              title="Next"
              image="next"
              onPress={this.navigateToChat}
            />
          </ActionsSection>
      </SettingsView>
    )
  }
}

const PickerItem = styled(Picker.Item)`
  color: #fff;
`

const PickerContainer = styled.Picker`

`

const BackButton = ({ navigation }) => (
  <TouchableOpacity           
    onPress={() => navigation.navigate('Settings')}      
    style={{ marginLeft: 15 }}>
      <Text style={{ 
        color: '#fff', 
        fontSize: 18,         
        fontFamily: 'open-sans',
      }}>
        Back
      </Text>
  </TouchableOpacity>
)

const BackIcon = ({ navigation }) => (
  <IconButton
    icon={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
    onPress={navigation ? () => navigation.push('Settings') : () => {}}
    iconColor="#fff"
    iconStyle={{ marginLeft: 15, marginBottom: -3 }}
  />)  

export default withNavigation(LanguageScreen)