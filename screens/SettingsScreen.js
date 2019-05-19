import React from 'react';
import styled from 'styled-components/native'
import Colors from '../constants/Colors';
import { withNavigation } from 'react-navigation'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const { navigation } = this.props
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return (
      <SettingsContainer>
        <Section title="Chat">
          <TextField />
        </Section>
        <Section title="Nick">
          <TextField />
        </Section>
        <Section title="Language">
          <SectionContentText>
            Polish
          </SectionContentText>
        </Section>
        <ActionsSection>
          <ActionButton
            title="Done"
            onPress={() => { navigation.navigate('Chat') }}
          />
          {/* <ActionButton title="Cancel" onPress={() => {}} /> */}
        </ActionsSection>
      </SettingsContainer>
    )
  }
}

function Section({ title, children }) {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionHeaderText>
          {title}
        </SectionHeaderText>
      </SectionHeader>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  )
}
const SettingsContainer = styled.View`
  flex-grow: 1;
`


const SectionContainer = styled.View`
`

const SectionContent = styled.View``

const SectionHeader = styled.View`
  background-color: #fbfbfb;
  padding-top: 8px;
  padding-bottom: 8px;
  border-width: 1px;
  border-color: #ededed;
`

const SectionHeaderText = styled.Text`
  font-size: 14px;
`

const SectionContentText = styled.Text`
  font-size: 14px;
  padding: 8px;
  background-color: #fdfdfd;
`

const TextField = styled.TextInput`
  padding: 16px;
  background-color: ${Colors.mainAccent};
`

const ActionsSection = styled.View`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
`

function ActionButton(props) {
  return (
    <ActionButtonContainer>
      <ActionButtonContent {...props} />
    </ActionButtonContainer>
  )
}

const ActionButtonContainer = styled.View`
  margin-left: auto;
`

const ActionButtonContent = styled.Button`
`

export default withNavigation(SettingsScreen)