import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { IconButton } from './IconButton';
import { TextButton } from './TextButton';

export class ActionArea extends React.Component {
  constructor(props) {
    super(props)

    this.renderActions = this.renderActions.bind(this)

    this.state = {
      hidden: true,
      language: this.props.language
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { language: prevLanguage } = prevProps
    const { language } = this.props
    if(prevLanguage !== language) {
      this.setState({ language })
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
        languages={[ "origin", this.props.language ]}
        value={this.state.language}
        onChange={language => {
          this.setState({ language })
          this.props.onLanguageChange(language)
        }}
        key={0}
      />
    ]
  }
}

function LanguageSelect({ languages = [], value, onChange = () => {} }) {
  const stylez = languageStyles
  return (
    <View style={stylez.container}>
      {languages.map(lang => {
        return <TextButton
          focused={value === lang}
          onPress={() => onChange(lang)}
          style={stylez.button}
          key={lang}
          text={lang.toUpperCase()}
        />
      }
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