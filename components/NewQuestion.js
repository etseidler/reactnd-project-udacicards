import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import CustomTextInput from './CustomTextInput'
import { white } from '../utils/colors'
import { addCardToDeck } from '../utils/helpers'

const QUESTION_MAX_LENGTH = 100
const ANSWER_MAX_LENGTH = 100

export default class NewQuestion extends Component {
  static navigationOptions = () => ({
    title: 'Add Card'
  })
  constructor() {
    super()

    this.state = {
      question: '',
      answer: ''
    }
  }
  onSubmit = (deckName) => {
    const { question, answer } = this.state
    addCardToDeck(deckName, { question, answer })
      .then(alert(`added card q: ${question}, a: ${answer} to deck ${deckName}`))
  }
  render() {
    const { question, answer } = this.state
    const { deckName } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <CustomTextInput
          style={styles.textInput}
          placeholder="Question Title"
          onChangeText={questionText => this.setState({ question: questionText })}
          value={question}
          maxLength={QUESTION_MAX_LENGTH}
        />
        <CustomTextInput
          style={styles.textInput}
          placeholder="Answer"
          onChangeText={answerText => this.setState({ answer: answerText })}
          value={this.state.answer}
          maxLength={ANSWER_MAX_LENGTH}
        />
        <Button
          style={{ marginTop: 40 }}
          title="Submit"
          disabled={question.trim() === '' || answer.trim() === ''}
          onPress={() => this.onSubmit(deckName)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 30
  }
})