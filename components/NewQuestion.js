import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class NewQuestion extends Component {
  static navigationOptions = () => ({
    title: 'Add Card'
  })
  render() {
    return (
      <View><Text>Here is the NewQuestion view</Text></View>
    )
  }
}