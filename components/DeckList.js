import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { getDecks } from '../utils/helpers'
import DeckListItem from './DeckListItem'
import { white } from '../utils/colors'

export default class DeckList extends Component {
  constructor() {
    super()

    this.state = {
      decks: {},
      isLoading: true
    }
  }
  componentDidMount() {
    // see https://github.com/react-navigation/react-navigation/pull/3345#issuecomment-365281777
    this.subs = [
      this.props.navigation.addListener('willFocus', this.loadDecks)
    ]
  }
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove())
  }
  loadDecks = () => {
    getDecks().then((decks) => {
      this.setState({ decks, isLoading: false })
    })
  }
  render() {
    if (this.state.isLoading) {
      return null
    }
    const { decks } = this.state
    if (!decks || Object.keys(decks).length === 0) {
      return (
        <View style={styles.noDecks}>
          <Text style={{ fontSize: 24 }}>You have not created any decks</Text>
        </View>
      )
    }
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

const styles = StyleSheet.create({
  noDecks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  }
})