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
import { StorageService } from '../../services/StorageService';

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
    language: "",
    supportedLanguages: []
  }
  
  componentDidMount() {
    SessionService.getLanguages()
      .then(async languages => {
        const { language } = await StorageService.getMany(["language"])
        this.setState({ 
          supportedLanguages: languages,
          language: language || (languages.find(l => l.code === "en") || languages[0]).code
        })})
  }

  navigateToChat = async () => {
    const { language } = this.state
    const { navigation } = this.props
    const params = navigation.state.params || {}
    await StorageService.saveMany({ language })
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

const BackIcon = ({ navigation }) => (
  <IconButton
    icon={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
    onPress={navigation ? () => {
      navigation.push('Settings', navigation.state.params) 
     } : () => {}}
    iconColor="#fff"
    iconStyle={{ marginLeft: 15, marginBottom: -3 }}
  />)  

export default withNavigation(LanguageScreen)