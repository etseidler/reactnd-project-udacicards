import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button
} from 'react-native'

const INPUT_MAX_LENGTH = 40

export default class NewDeck extends Component {
  constructor() {
    super()

    this.state = { text: '' }
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
          onPress={() => alert(this.state.text)}
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