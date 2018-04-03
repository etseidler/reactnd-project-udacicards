import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import StatusBarWithHeight from './components/StatusBarWithHeight'
import DeckListItem from './components/DeckListItem'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBarWithHeight />
      <FlatList
        data={Object.keys(tempCardData).map(name => tempCardData[name])}
        keyExtractor={item => item.title}
        renderItem={({ item }) => <DeckListItem item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const tempCardData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
    ],
  },
}