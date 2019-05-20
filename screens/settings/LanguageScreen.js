import React from 'react';
import { withNavigation } from 'react-navigation'
import { Section, SectionContentText } from '../../components/Section/Section';
import { ActionsSection, ActionButton } from '../../components/Section/ActionSection';
import { SettingsView } from '../../components/UI/SettingsView/SettingsView';
import { Text, TouchableOpacity } from 'react-native'

class LanguageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: (
      <TouchableOpacity           
        onPress={() => navigation.navigate('Settings')}      
        style={{ marginLeft: 15 }}>
          <Text style={{ 
            color: '#fff', 
            fontSize: 24,         
            fontWeight: '600',
            fontFamily: 'gill-sans',
          }}>
            Back
          </Text>
      </TouchableOpacity>
    )
  })

  render() {
    const { navigation } = this.props

    return (
      <SettingsView>
          <Section title="Language">
            <SectionContentText>
              Polish
            </SectionContentText>
          </Section>
          <ActionsSection>
            <ActionButton
              title="Next"
              image="next"
              onPress={() => { navigation.navigate('Chat') }}
            />
          </ActionsSection>
      </SettingsView>
    )
  }
}

export default withNavigation(LanguageScreen)