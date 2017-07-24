# react-native-touchable-safe

Consistent view hierarchy and API for React Native `Touchable*` components.

As it stands, `TouchableOpacity` and `TouchableHighlight` wrap their children
in a `View`, whereas `TouchableNativeFeedback` and `TouchableWithoutFeedback`
do not.  This can lead to headaches and platform-specific bugs when trying to
create advanced Flexbox layouts with different touchable styles on Android/iOS.
An example of this is available here: https://snack.expo.io/ry6kXjX8W

This component also provides a simpler API, where alternating the component
used per platform is as simple as:

```js
return (
  <Touchable android="native" ios="opacity">
    <MyButton />
  </Touchable>
)
```

In fact, these are the default behaviours, so simply `<Touchable>` is enough to
achieve this effect.  The android/ios props only need to be used when deviating
from the defaults.

This component also handles the incompatability of ripple customisation on
Android API level < 21.

## Installation

```bash
$ npm install --save react-native-touchable-safe
```

## Props

The following props should be enough to control all aspects of any type of
touchable feedback:

* **`ios?`**: `'opacity' | 'highlight' | 'without'` - (default: `'opacity'`) -
  Which of RN's `Touchable*` components to use on iOS devices.
* **`android?`**: `'native' | 'opacity' | 'highlight' | 'without'` - (default: `'native'`) -
  Which of RN's `Touchable*` components to use on Android devices.
* **`onPress?`**: `() => void`
* **`outerStyle?`**: `Object | number` - Style to pass to the outer `View`
  component which wraps every type of touchable component.  Typically used to
  specify things like `<Touchable outerStyle={{ flex: 1 }}>`.
* **`outerProps?`**: `Object` - Similar to `outerStyle`, but lets you set any
  props (although `style` is the main use case).
* **`disabled?`**: `boolean` - Remove any touch functionality and feedback.
* **`nativeBorderless?`**: `boolean` - For `android="native"`, should the
  ripple effect be borderless.
* **`nativePressColor?`**: `string` - (default: `'rgba(0, 0, 0, .1)'`) - For `android="native"`, what color should the ripple be.
* **`nativeProps?`**: `Object` - Any props to pass on to a
  `TouchableNativeFeedback` component.
* **`opacityProps?`**: `Object` - Any props to pass on to a
  `TouchableOpacity` component.
* **`highlightProps?`**: `Object` - Any props to pass on to a
  `TouchableHighlight` component.
* **`withoutProps?`**: `Object` - Any props to pass on to a
  `TouchableWithoutFeedback` component.
  
## Examples

### Defaults

NativeFeedback on Android, Opacity on iOS

```js
import React from 'react'
import Touchable from 'react-native-touchable-safe'
import MyLabel from './MyLabel'

export default () => (
  <Touchable onPress={() => { console.log('Pressed') }}>
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
import MyLabel from './MyLabel'

export default ({ disableD }) => (
  <View style={styles.row}>
    {/* Android: native, iOS: highlight */}
    <Touchable
      ios="highlight"
      onPress={() => { console.log('Pressed A') }}
      outerStyle={styles.buttonOuter}
      nativeBorderless
      nativePressColor="rgba(0, 0, 255, .5)"
    >
      <MyLabel title="A" />
    </Touchable>
    
    {/* Both: opacity (50% opacity) */}
    <Touchable
      android="opacity"
      onPress={() => { console.log('Pressed B') }}
      outerStyle={styles.buttonOuter}
      opacityProps={{ activeOpacity: .5 }}
    >
      <MyLabel title="B" />
    </Touchable>
    
    {/* Both: no feedback */}
    <Touchable
      ios="without"
      android="without"
      onPress={() => { console.log('Pressed C') }}
      outerStyle={styles.buttonOuter}
    >
      <MyLabel title="C" />
    </Touchable>
    
    {/* Both: defaults, disabled based on prop */}
    <Touchable
      onPress={() => { console.log('Pressed D') }}
      outerStyle={styles.buttonOuter}
      disabled={disableD}
    >
      {/* Visual styling of disabled elements handled manually */}
      <MyLabel title="D" greyedOut={disableD} />
    </Touchable>
  </View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'top',
    height: 200,
  },
  buttonOuter: {
    flex: 1,
    height: 100,
  },
})
```