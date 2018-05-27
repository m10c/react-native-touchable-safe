// @flow

import React from 'react'
import { Text, View } from 'react-native'
import Touchable from '../Touchable'

const Inner = () => (
  <View>
    <Text>Touchable</Text>
  </View>
)

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

const BadType = (
  // $FlowExpectedError
  <Touchable android="foo">
    <Inner />
  </Touchable>
)
const BadTypeIOS = (
  // $FlowExpectedError
  <Touchable ios="foo">
    <Inner />
  </Touchable>
)
