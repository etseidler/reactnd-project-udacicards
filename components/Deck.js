import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { white } from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params
    return {
      title: entryId
    }
  }
  render() {
    return (
      <View style={{ backgroundColor: white, flex: 1 }}>
        <Text>Here in the deck view</Text>
      </View>
    )
  }
}

export default Deck