import React, { Component } from 'react'
import {
  Text,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Button,
  Alert
} from 'react-native'
import CustomTextInput from './CustomTextInput'
import { getDeck, saveDeckTitle } from '../utils/helpers'
import { white } from '../utils/colors'

const INPUT_MAX_LENGTH = 40

export default class NewDeck extends Component {
  state = { text: '' }
  onSubmit = () => {
    Keyboard.dismiss()
    const deckName = this.state.text.trim()
    getDeck(deckName)
      .then((data) => {
        if (data) {
          Alert.alert('A deck with that name already exists')
          return
        }

        this.setState({ text: '' })
        saveDeckTitle(deckName)
          .then(() => this.props.navigation.navigate('Deck', { entryId: deckName }))
      })
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <CustomTextInput
          placeholder="Deck Title"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={() => this.state.text.trim() !== '' && this.onSubmit()}
          maxLength={INPUT_MAX_LENGTH}
        />
        <Button
          title="Submit"
          disabled={this.state.text.trim() === ''}
          onPress={this.onSubmit}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 40,
    backgroundColor: white
  },
  text: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 50
  }
})