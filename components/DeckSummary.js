import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native'
import { gray, white } from '../utils/colors'

export default function DeckSummary(props) {
  const {
    deck: { title, questions },
    titleStyle = {},
    numQuestionsStyle = {}
  } = props
  return (
    <View style={[styles.container, { width: Dimensions.get('window').width }]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.numQuestions, numQuestionsStyle]}>
        {questions.length} card{questions.length === 1 ? '' : 's'}
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
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    backgroundColor: white
  },
  title: {
    fontSize: 24
  },
  numQuestions: {
    color: gray,
    fontSize: 16
  }
})