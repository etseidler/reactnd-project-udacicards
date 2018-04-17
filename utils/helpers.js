import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const ALL_DECKS = 'udacicards:ALL_DECKS'
const NOTIFICATION_KEY = 'udacicards:NOTIFICATIONS'

export function getDecks() {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
}

export function getDeck(deckName) {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
    .then(data => data && data[deckName])
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

export function addCardToDeck(deckName, { question, answer }) {
  return AsyncStorage.getItem(ALL_DECKS)
    .then(JSON.parse)
    .then((data) => {
      const updatedData = {
        ...data,
        [deckName]: {
          ...data[deckName],
          questions: [...data[deckName].questions, { question, answer }]
        }
      }
      return AsyncStorage.setItem(ALL_DECKS, JSON.stringify(updatedData))
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
          questions: []
        }
      }
      return AsyncStorage.setItem(ALL_DECKS, JSON.stringify(updatedData))
    })
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Reminder',
    body: "Don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              const tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function setDefaultDecks() {
  return AsyncStorage.setItem(ALL_DECKS, JSON.stringify(defaultDeckData))
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