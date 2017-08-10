// @flow

import 'react-native'
import { Text, View } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Touchable from '../Touchable'

const Inner = () => (
  <View>
    <Text>Touchable</Text>
  </View>
)

it('renders correctly', () => {
  const tree = renderer.create(
    <Touchable>
      <Inner />
    </Touchable>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
