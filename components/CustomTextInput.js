import React from 'react'
import { TextInput } from 'react-native'

export default function CustomTextInput(props) {
  const { style, placeholder, onChangeText, value, maxLength, autoFocus = false } = props
  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoFocus={autoFocus}
      autoCorrect={false}
      maxLength={maxLength}
    />
  )
}