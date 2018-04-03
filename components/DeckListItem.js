import React from 'react'
import { Text, View } from 'react-native'

export default function DeckListItem({ item }) {
  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.questions.length} card{item.questions.length === 1 ? '' : 's'}</Text>
    </View>
  )
}