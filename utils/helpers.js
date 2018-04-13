import { AsyncStorage } from 'react-native'

const ALL_DECKS = 'udacicards:ALL_DECKS'

export function setDefaultDecks() {
  return AsyncStorage.setItem(ALL_DECKS, JSON.stringify(defaultDeckData))
}

export function getDecks() {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
}

export function getDeck(deckName) {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
    .then(data => data[deckName])
}

export function removeDeck(deckName) {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
    .then((data) => {
      const updatedData = data
      delete updatedData[deckName]
      AsyncStorage.setItem(ALL_DECKS, JSON.stringify(updatedData))
    })
}

export function saveDeckTitle(deckName) {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
    .then((data) => {
      const updatedData = {
        ...data,
        [deckName]: {
          title: deckName,
          questions: [],
          answers: []
        }
      }
      return AsyncStorage.setItem(ALL_DECKS, JSON.stringify(updatedData))
    })
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