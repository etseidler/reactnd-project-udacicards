import React, { Component } from 'react'
import {
  Text,
  View,
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
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <CustomTextInput
          placeholder="Deck Title"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          autoFocus
          onSubmitEditing={() => this.state.text.trim() !== '' && this.onSubmit()}
          maxLength={INPUT_MAX_LENGTH}
        />
        <Button
          style={{ marginTop: 40 }}
          title="Submit"
          disabled={this.state.text.trim() === ''}
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
    padding: 40,
    backgroundColor: white
  },
  text: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 50
  }
})