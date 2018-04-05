import React from 'react'
import {
  View
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import StatusBarWithHeight from './components/StatusBarWithHeight'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBarWithHeight />
      <MainNavigator />
    </View>
  )
}

const MainNavigator = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-list" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add" size={30} color={tintColor} />
    }
  }
})
