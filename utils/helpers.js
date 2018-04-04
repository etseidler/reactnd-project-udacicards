import { AsyncStorage } from 'react-native'

const ALL_DECKS = 'ALL_DECKS'

export function setDefaultDecks() {
  return AsyncStorage.setItem(ALL_DECKS, JSON.stringify(defaultDeckData))
}

export function getDecks() {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
}

const defaultDeckData = {
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
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Udacity: {
    title: 'Udacity',
    questions: []
  }
}