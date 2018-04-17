import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { getDeck, setLocalNotification, clearLocalNotifications } from '../utils/helpers'
import { white, red, green, blue } from '../utils/colors'

export default class Quiz extends Component {
  static navigationOptions = () => ({ title: 'Quiz' })
  constructor() {
    super()

    this.state = {
      deck: null,
      currentQuestionIndex: null,
      numCorrectQuestions: 0,
      showingQuestion: true
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
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      showingQuestion: true
    }))
  }
  toggleQuestionAnswer = () => {
    this.setState(prevState => ({
      showingQuestion: !prevState.showingQuestion
    }))
  }
  restartQuiz = () => {
    this.setState({
      currentQuestionIndex: 0,
      numCorrectQuestions: 0,
      showingQuestion: true
    })
  }
  disableNotificationForToday = () => {
    clearLocalNotifications().then(setLocalNotification)
  }
  render() {
    if (!this.state.deck) {
      return null
    }
    const {
      deck,
      deck: { questions },
      currentQuestionIndex,
      showingQuestion,
      numCorrectQuestions
    } = this.state
    const currentQuestion = deck.questions[currentQuestionIndex]
    const currentQuestionNumber = currentQuestionIndex + 1
    const numQuestions = questions.length
    let innerContent;
    if (numQuestions === 0) {
      innerContent = (
        <Text style={styles.atLeastOneQuestion}>
          You must have at least one question to take the quiz!
        </Text>
      )
    }
    else if (currentQuestionIndex === numQuestions) {
      this.disableNotificationForToday()
      const scorePercentage = Math.round((numCorrectQuestions / numQuestions) * 100)
      innerContent = (
        <React.Fragment>
          <Text>You completed the quiz!</Text>
          <Text>{`Your score is ${scorePercentage}%`}</Text>
          <Button
            title="Restart Quiz"
            color={blue}
            onPress={this.restartQuiz}
          />
          <Button
            title="Back to Deck"
            onPress={() => this.props.navigation.goBack()}
          />
        </React.Fragment>
      )
    }
    else {
      innerContent = (
        <React.Fragment>
          <Text style={styles.progress}>
            {`${currentQuestionNumber} / ${numQuestions}`}
          </Text>
          <Text style={styles.qaText}>
            {showingQuestion ? currentQuestion.question : currentQuestion.answer}
          </Text>
          <Button
            title={showingQuestion ? 'Show Answer' : 'Show Question'}
            onPress={() => this.toggleQuestionAnswer()}
          />
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

    return (
      <View style={styles.container}>
        {innerContent}
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
  qaText: {
    fontSize: 36
  },
  progress: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 18
  }
})