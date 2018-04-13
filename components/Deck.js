import React, { Component } from 'react'
import DeckSummary from './DeckSummary'
import { getDeck } from '../utils/helpers'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params
    return {
      title: entryId
    }
  }
  constructor() {
    super()

    this.state = {
      deck: null
    }
  }
  componentDidMount() {
    const deckName = this.props.navigation.state.params.entryId;
    getDeck(deckName).then((deck) => {
      this.setState({ deck })
    })
  }
  render() {
    if (!this.state.deck) {
      return null
    }
    return (
      <DeckSummary
        deck={this.state.deck}
        titleStyle={{ fontSize: 36 }}
        numQuestionsStyle={{ fontSize: 24 }}
      />
    )
  }
}

export default Deck