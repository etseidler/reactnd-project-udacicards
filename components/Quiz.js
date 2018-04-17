import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getDeck } from '../utils/helpers'
import { white } from '../utils/colors'

export default class Quiz extends Component {
  static navigationOptions = () => ({ title: 'Quiz' })
  constructor() {
    super()

    this.state = {
      deck: null
    }
  }
  componentDidMount() {
    const { deckName } = this.props.navigation.state.params
    getDeck(deckName).then((deck) => {
      this.setState({ deck })
    })
  }
  render() {
    if (!this.state.deck) {
      return null
    }
    const { questions } = this.state.deck
    return (
      <View style={styles.container}>
        {questions.length === 0
          ? <Text style={styles.atLeastOneQuestion}>You must have at least one question to take the quiz!</Text>
          : <Text>Start questions here</Text>
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
  }
})