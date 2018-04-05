import React from 'react'
import { FlatList } from 'react-native'
import DeckListItem from './DeckListItem'


export default function DeckList({ decks }) {
  return (
    <FlatList
      data={Object.keys(decks).map(name => decks[name])}
      keyExtractor={item => item.title}
      renderItem={({ item }) => <DeckListItem item={item} />}
    />
  )
}