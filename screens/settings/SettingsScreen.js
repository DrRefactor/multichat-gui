import React from 'react';
import { withNavigation } from 'react-navigation'
import { Section, TextField } from '../../components/Section/Section';
import { ActionsSection, ActionButton } from '../../components/Section/ActionSection';
import { SettingsView } from '../../components/UI/SettingsView/SettingsView';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerLeft: null,
  };

  render() {
    const { navigation } = this.props
    return (
      <SettingsView>
          <Section title="Choose chat room">
            <TextField />
          </Section>
          <Section title="Type your name">
            <TextField />
          </Section>
          <ActionsSection>
            <ActionButton
              title="Next"
              image="next"
              onPress={() => { navigation.navigate('Language') }}
            />
          </ActionsSection>
      </SettingsView>
    )
  }
}

export default withNavigation(SettingsScreen)