import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

export default class Quiz extends Component {
  static navigationOptions = () => ({ title: 'Quiz' })
  render() {
    return (
      <View style={styles.container}><Text>Here is the Quiz View!</Text></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1
  }
})