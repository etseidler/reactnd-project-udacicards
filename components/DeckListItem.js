import React from 'react'
import { TouchableOpacity } from 'react-native'
import DeckSummary from './DeckSummary'

export default function DeckListItem({ item, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Deck', { entryId: item.title })}
    >
      <DeckSummary deck={item} />
    </TouchableOpacity>
  )
}