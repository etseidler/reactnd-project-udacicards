import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default function CustomTextInput(props) {
  return (
    <TextInput
      {...props}
      style={styles.textInput}
      autoCorrect={false}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 30
  }
})