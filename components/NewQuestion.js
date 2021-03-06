import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  StyleSheet,
  Button,
  Text
} from 'react-native'
import CustomTextInput from './CustomTextInput'
import { white, green } from '../utils/colors'
import { addCardToDeck } from '../utils/helpers'

const QUESTION_MAX_LENGTH = 100
const ANSWER_MAX_LENGTH = 100
const SUCCESS_DISPLAY_TIME = 3000

export default class NewQuestion extends Component {
  static navigationOptions = () => ({
    title: 'Add Card'
  })
  constructor() {
    super()

    this.state = {
      question: '',
      answer: '',
      successVisible: false
    }
    this.timers = []
  }
  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer))
    this.timers = []
  }
  onSubmit = (deckName) => {
    Keyboard.dismiss()
    const { question, answer } = this.state
    addCardToDeck(deckName, { question, answer })
      .then(() => {
        this.setState({
          successVisible: true,
          question: '',
          answer: ''
        })
        this.timers.push(setTimeout(() => {
          this.setState({ successVisible: false })
        }, SUCCESS_DISPLAY_TIME))
      })
  }
  render() {
    const { question, answer, successVisible } = this.state
    const { deckName } = this.props.navigation.state.params
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <Text style={styles.text}>Please enter a question and an answer</Text>
        <CustomTextInput
          placeholder="Question Title"
          onChangeText={questionText => this.setState({ question: questionText })}
          value={question}
          maxLength={QUESTION_MAX_LENGTH}
        />
        <CustomTextInput
          placeholder="Answer"
          onChangeText={answerText => this.setState({ answer: answerText })}
          value={this.state.answer}
          maxLength={ANSWER_MAX_LENGTH}
        />
        <Button
          title="Submit"
          disabled={question.trim() === '' || answer.trim() === ''}
          onPress={() => this.onSubmit(deckName)}
        />
        {successVisible &&
          <View style={styles.cardAddedContainer}>
            <Text style={styles.cardAdded}>
              Card Added
            </Text>
          </View>
        }
      </KeyboardAvoidingView>
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
  text: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 50
  },
  cardAddedContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardAdded: {
    color: green,
    fontSize: 18,
    paddingTop: 10
  }
})