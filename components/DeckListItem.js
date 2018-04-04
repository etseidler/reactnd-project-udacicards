import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { gray } from '../utils/colors'

export default function DeckListItem({ item }) {
  return (
    <View style={[styles.container, { width: Dimensions.get('window').width }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text
        style={styles.numQuestions}
      >
        {item.questions.length} card{item.questions.length === 1 ? '' : 's'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 150,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    flex: 1,
  },
  numQuestions: {
    color: gray,
    fontSize: 16,
  },
})