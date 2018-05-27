# react-native-touchable-safe

[![npm version](https://img.shields.io/npm/v/react-native-touchable-safe.svg)](https://www.npmjs.com/package/react-native-touchable-safe)
[![Circle CI Status](https://circleci.com/gh/jamesisaac/react-native-touchable-safe.svg?style=shield)](https://circleci.com/gh/jamesisaac/react-native-touchable-safe)
[![license](https://img.shields.io/github/license/jamesisaac/react-native-touchable-safe.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/react-native-touchable-safe.svg)](https://www.npmjs.com/package/react-native-touchable-safe)

A single easy-to-use `<Touchable>` component, which harnesses the power of all React Native's `Touchable*` components.

* Simple API that bridges the differences between RN's various `Touchable*` types.
* A consistent `View` hierarchy, to avoid tricky layout issues when switching between `Touchable*` types.
* Handling the incompatability of ripple customisation on Android API level < 21.

## Motivation

As it stands, `TouchableOpacity` and `TouchableHighlight` wrap their children in a `View`, whereas `TouchableNativeFeedback` and `TouchableWithoutFeedback`
do not.
This can lead to headaches and platform-specific bugs when trying to create advanced Flexbox layouts with different touchable styles on Android/iOS.
An example of this is available here: https://snack.expo.io/ry6kXjX8W

This library makes the situation consistent and easy to reason about:

* `<Touchable>` **always** introduces another view in the hierarchy, which can have its layout customised with `outerStyle`.
* `<Touchable>` **always** must only have one child, which it applies its effect (e.g. opacity) to natively.

## Installation

```bash
$ npm install --save react-native-touchable-safe

# Or, with Yarn
$ yarn add react-native-touchable-safe
```

## Getting started

This component provides a simple API, where alternating the component used per platform is as simple as:

```js
return (
  <Touchable android="native" ios="opacity">
    <MyButton />
  </Touchable>
)
```

In fact, these are the default behaviours, so simply `<Touchable>` is enough to achieve this effect.
The android/ios props only need to be used when deviating from the defaults.

## Props

If you don't want to use the defaults (`TouchableNativeFeedback` on Android and `TouchableOpacity` on iOS), you can specify another type.
Use `all` to set all platforms to the same effect, or `ios` and `android` to differentiate it per platform.

* **`all?`**: `'opacity' | 'highlight' | 'without'`
* **`ios?`**: `'opacity' | 'highlight' | 'without'` - (default: `'opacity'`)
* **`android?`**: `'native' | 'opacity' | 'highlight' | 'without'` - (default: `'native'`)

Some very common behaviours used by all touchable types:

* **`onPress?`**: `() => void`
* **`outerStyle?`**: `Object | number` - Style to pass to the outer `View`
  component which wraps every type of touchable component. Typically used to
  specify things like `<Touchable outerStyle={{ flex: 1 }}>`.
* **`outerProps?`**: `Object` - Similar to `outerStyle`, but lets you set any
  props (although `style` is the main use case).
* **`disabled?`**: `boolean` - Remove any touch functionality and feedback.

Seeing as setting a custom native ripple requires calling `TouchableNativeFeedback.Ripple`, the following top-level convenience props can be used to quickly customise the ripple:

* **`nativeBorderless?`**: `boolean` - For `android="native"`, should the
  ripple effect be borderless.
* **`nativePressColor?`**: `string` - (default: `'rgba(0, 0, 0, .1)'`) - For `android="native"`, what color should the ripple be.

Any props which you only want passed to one type of touchable component can be controlled with the following props.

* **`nativeProps?`**: `Object` - Any props to pass on to a
  `TouchableNativeFeedback` component.
* **`opacityProps?`**: `Object` - Any props to pass on to a
  `TouchableOpacity` component.
* **`highlightProps?`**: `Object` - Any props to pass on to a
  `TouchableHighlight` component.
* **`withoutProps?`**: `Object` - Any props to pass on to a
  `TouchableWithoutFeedback` component.

And finally, anything else will be passed down to all touchable components.

## Examples

### Defaults

NativeFeedback on Android, Opacity on iOS

```js
import React from 'react'
import Touchable from 'react-native-touchable-safe'
import MyLabel from './MyLabel'

export default () => (
  <Touchable
    onPress={() => {
      console.log('Pressed')
    }}
  >
    <MyLabel />
  </Touchable>
)
```

### Mixed

A row of different styled buttons, which all behave consistently

```js
import React from 'react'
import { StyleSheet } from 'react-native'
import Touchable from 'react-native-touchable-safe'
import MyButton from './MyButton'

export default ({ disabled }) => (
  <View style={styles.row}>
    {/* Android: native, iOS: highlight */}
    <Touchable
      ios="highlight"
      onPress={() => {
        console.log('Pressed A')
      }}
      outerStyle={styles.touchWrap}
      nativeBorderless
      nativePressColor="rgba(0, 0, 255, .5)"
    >
      <MyButton title="A" />
    </Touchable>

    {/* Both: opacity (50% opacity) */}
    <Touchable
      all="opacity"
      onPress={() => {
        console.log('Pressed B')
      }}
      outerStyle={styles.touchWrap}
      opacityProps={{ activeOpacity: 0.5 }}
    >
      <MyButton title="B" />
    </Touchable>

    {/* Both: no feedback */}
    <Touchable
      all="without"
      onPress={() => {
        console.log('Pressed C')
      }}
      outerStyle={styles.touchWrap}
    >
      <MyButton title="C" />
    </Touchable>

    {/* Both: defaults, disabled based on prop */}
    <Touchable
      onPress={() => {
        console.log('Pressed D')
      }}
      outerStyle={styles.touchWrap}
      disabled={disabled}
    >
      {/* Visual styling of disabled elements handled manually */}
      <MyButton title="D" greyedOut={disabled} />
    </Touchable>
  </View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'top',
    height: 200,
  },
  touchWrap: {
    flex: 1,
    height: 100,
  },
})
```
