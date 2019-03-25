import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { IconButton } from './IconButton';
import { TextButton } from './TextButton';

const LANGUAGE_CODES = {
  POLISH: 'polish',
  ENGLISH: 'english'
}

const LANGUAGES = [
  {
    name: LANGUAGE_CODES.POLISH,
    label: "Polish",
  },
  {
    name: LANGUAGE_CODES.ENGLISH,
    label: "English"
  }
]

export class ActionArea extends React.Component {
  constructor() {
    super()

    this.renderActions = this.renderActions.bind(this)

    this.state = {
      hidden: true,
      language: LANGUAGE_CODES.POLISH
    }
  }
  render() {
    const { hidden } = this.state
    return (
      <View style={[styles.container, this.props.style]}>
        {!hidden && this.renderActions()}
        <TextButton
          focused={!hidden}
          onPress={() => this.setState({ hidden: !this.state.hidden })}
          text="···"
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
  renderActions() {
    return [
      <LanguageSelect
        languages={LANGUAGES}
        value={this.state.language}
        onChange={language => this.setState({ language })}
        key={0}
      />
    ]
  }
}

function LanguageSelect({ languages = [], value, onChange = () => {} }) {
  const stylez = languageStyles
  return (
    <View style={stylez.container}>
      {languages.map(lang =>
        <TextButton
          focused={value === lang.name}
          onPress={() => onChange(lang.name)}
          style={stylez.button}
          key={lang.name}
          text={lang.label.toUpperCase()}
        />
      )}
    </View>
  )
}

const languageStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  button: {
    padding: 10
  }
})

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 5
  },
  buttonText: {
    fontSize: 24
  }
})