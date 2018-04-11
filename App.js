import React from 'react'
import {
  View
} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import StatusBarWithHeight from './components/StatusBarWithHeight'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBarWithHeight />
      <MainNavigator />
    </View>
  )
}

const Tabs = TabNavigator({
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
}, {
  navigationOptions: {
    header: null
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  }
})