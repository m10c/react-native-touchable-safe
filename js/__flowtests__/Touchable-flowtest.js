// @flow

import React from 'react'
import { Text, View } from 'react-native'
import Touchable from '../Touchable'

const Inner = () =>
  <View>
    <Text>Touchable</Text>
  </View>

const Correct = (
  <Touchable android="opacity">
    <Inner />
  </Touchable>
)
const CorrectIOS = (
  <Touchable ios="opacity">
    <Inner />
  </Touchable>
)

// $FlowExpectedError
const BadType = (
  <Touchable android="foo">
    <Inner />
  </Touchable>
)
// $FlowExpectedError
const BadTypeIOS = (
  <Touchable ios="foo">
    <Inner />
  </Touchable>
)
