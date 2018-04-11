import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params
    return {
      title: entryId
    }
  }
  render() {
    return (
      <View><Text>Here in the deck view</Text></View>
    )
  }
}

export default Deck