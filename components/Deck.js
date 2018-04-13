import React, { Component } from 'react'
import { View, Button } from 'react-native'
import DeckSummary from './DeckSummary'
import { getDeck } from '../utils/helpers'
import { white, blue, red } from '../utils/colors'

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
      <View style={{ backgroundColor: white, flex: 1, justifyContent: 'space-around' }}>
        <DeckSummary
          deck={this.state.deck}
          containerStyle={{ flex: 2, borderBottomWidth: 0 }}
          titleStyle={{ fontSize: 36, marginBottom: 5 }}
          numQuestionsStyle={{ fontSize: 24 }}
        />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Button
            title="Add Card"
            color={blue}
            onPress={() => {}}
          />
          <Button
            title="Start Quiz"
            onPress={() => {}}
          />
          <Button
            title="Delete Deck"
            onPress={() => {}}
            color={red}
          />
          <View />
        </View>
      </View>
    )
  }
}

export default Deck