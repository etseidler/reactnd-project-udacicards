import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Alert
} from 'react-native'
import { getDeck, saveDeckTitle } from '../utils/helpers'

const INPUT_MAX_LENGTH = 40

export default class NewDeck extends Component {
  state = { text: '' }
  onSubmit = () => {
    const deckName = this.state.text.trim()
    getDeck(deckName)
      .then((data) => {
        if (data) {
          Alert.alert('A deck with that name already exists')
          return
        }

        this.setState({ text: '' })
        saveDeckTitle(deckName)
          .then(() => this.props.navigation.navigate('DeckList', { reloadData: true }))
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Deck Title"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          autoFocus
          autoCorrect={false}
          maxLength={INPUT_MAX_LENGTH}
        />
        <Button
          style={{ marginTop: 40 }}
          title="Submit"
          disabled={this.state.text === ''}
          onPress={this.onSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 40
  },
  text: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 50
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 30
  }
})