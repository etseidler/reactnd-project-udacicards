import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { getDeck } from '../utils/helpers'
import { white, red, green } from '../utils/colors'

export default class Quiz extends Component {
  static navigationOptions = () => ({ title: 'Quiz' })
  constructor() {
    super()

    this.state = {
      deck: null,
      currentQuestionIndex: null,
      numCorrectQuestions: 0
    }
  }
  componentDidMount() {
    const { deckName } = this.props.navigation.state.params
    getDeck(deckName).then((deck) => {
      this.setState({ deck, currentQuestionIndex: 0 })
    })
  }
  moveToNextQuestion = (knewCorrectAnswer) => {
    this.setState(prevState => ({
      numCorrectQuestions: prevState.numCorrectQuestions + (knewCorrectAnswer ? 1 : 0),
      currentQuestionIndex: prevState.currentQuestionIndex + 1
    }))
  }
  render() {
    if (!this.state.deck) {
      return null
    }
    const { deck, deck: { questions }, currentQuestionIndex } = this.state
    const currentQuestion = deck.questions[currentQuestionIndex]
    return (
      <View style={styles.container}>
        {questions.length === 0
          ? (
            <Text style={styles.atLeastOneQuestion}>
              You must have at least one question to take the quiz!
            </Text>
          )
          : (
            <React.Fragment>
              <Text style={styles.questionTitle}>{currentQuestion.question}</Text>
              <Button
                title="Correct"
                color={green}
                onPress={() => this.moveToNextQuestion(true)}
              />
              <Button
                title="Incorrect"
                color={red}
                onPress={() => this.moveToNextQuestion(false)}
              />
            </React.Fragment>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  atLeastOneQuestion: {
    fontSize: 28
  },
  questionTitle: {
    fontSize: 36
  }
})