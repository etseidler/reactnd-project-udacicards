import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { getDecks } from '../utils/helpers'
import DeckListItem from './DeckListItem'
import { white } from '../utils/colors'

export default class DeckList extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    this.loadDecks()
  }
  componentWillReceiveProps({ navigation: { state: { params: { reloadData = false } = {} } = {} } = {} }) { // eslint-disable-line max-len
    if (reloadData) {
      this.loadDecks()
    }
  }
  loadDecks = () => {
    getDecks().then((decks) => {
      this.setState({ decks, isLoading: false })
    })
  }
  render() {
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>
    }
    const { decks } = this.state
    const { navigation } = this.props
    return (
      <FlatList
        style={{ backgroundColor: white }}
        data={Object.keys(decks).map(name => decks[name])}
        keyExtractor={item => item.title}
        renderItem={({ item }) => <DeckListItem item={item} navigation={navigation} />}
      />
    )
  }
}