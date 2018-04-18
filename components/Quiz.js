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
    let mainContent
    let buttonContent = null
    if (numQuestions === 0) {
      mainContent = (
        <Text style={styles.atLeastOneQuestion}>
          You must have at least one question to take the quiz!
        </Text>
      )
    }
    else if (currentQuestionIndex === numQuestions) {
      this.disableNotificationForToday()
      const scorePercentage = Math.round((numCorrectQuestions / numQuestions) * 100)
      mainContent = (
        <React.Fragment>
          <Text style={styles.quizCompletion}>You completed the quiz!</Text>
          <Text style={styles.quizCompletion}>{`Your score is ${scorePercentage}%`}</Text>
        </React.Fragment>
      )
      buttonContent = (
        <React.Fragment>
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
      mainContent = (
        <React.Fragment>
          <Text style={styles.progress}>
            {`${currentQuestionNumber} / ${numQuestions}`}
          </Text>
          <Text style={styles.qaText}>
            {showingQuestion ? currentQuestion.question : currentQuestion.answer}
          </Text>
          <View style={{ height: 30 }} />
          <Button
            title={showingQuestion ? 'Show Answer' : 'Show Question'}
            onPress={() => this.toggleQuestionAnswer()}
          />
        </React.Fragment>
      )
      buttonContent = (
        <React.Fragment>
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
      <React.Fragment>
        <View style={styles.container}>
          {mainContent}
        </View>
        <View style={styles.buttonContainer}>
          {buttonContent}
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  atLeastOneQuestion: {
    fontSize: 28,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center'
  },
  qaText: {
    fontSize: 36
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: white
  },
  progress: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 18
  },
  quizCompletion: {
    fontSize: 28
  }
})