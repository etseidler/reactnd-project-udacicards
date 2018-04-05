import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import StatusBarWithHeight from './components/StatusBarWithHeight'
import DeckList from './components/DeckList'
import { getDecks } from './utils/helpers'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    getDecks().then((decks) => {
      this.setState({ decks, isLoading: false })
    })
  }
  render() {
    if (this.state.isLoading) {
      return null
    }
    const { decks } = this.state
    return (
      <View style={styles.container}>
        <StatusBarWithHeight />
        <FlatList
          data={Object.keys(decks).map(name => decks[name])}
          keyExtractor={item => item.title}
          renderItem={({ item }) => <DeckListItem item={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
