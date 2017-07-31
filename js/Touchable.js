// @flow

import React from 'react'
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

type Style = Object | number

type Props = {
  ios?: 'opacity' | 'highlight' | 'without',
  android?: 'native' | 'opacity' | 'highlight' | 'without',
  onPress?: () => void,
  outerStyle?: Style | Array<Style>,
  outerProps?: Object,
  disabled?: boolean,
  children?: any,

  // Specific options for the ripple TouchableNativeFeedback, available as
  // props as a convenience so the caller doesn't need to call
  // TouchableNativeFeedback.Ripple.
  nativeBorderless?: boolean,
  nativePressColor?: string,

  // Props to pass on to a specific view type
  nativeProps?: Object,
  opacityProps?: Object,
  highlightProps?: Object,
  withoutProps?: Object,
}

export default ({
  ios = 'opacity',
  android = 'native',
  onPress = () => {},
  outerStyle,
  outerProps = {},
  disabled = false,
  children,

  nativeBorderless = false,
  nativePressColor = 'rgba(0, 0, 0, .1)',

  nativeProps = {},
  opacityProps = {},
  highlightProps = {},
  withoutProps = {},

  ...rest
}: Props) => {
  const type = Platform.OS === 'ios' ? ios : android

  // Merge outerProps into outerStyle
  outerProps = {
    ...outerProps,
    ...(outerStyle ? { style: outerStyle } : {}),
  }

  if (disabled) {
    return <View {...outerProps} children={children} />
  } else if (type === 'opacity') {
    return (
      <TouchableOpacity
        {...outerProps}
        activeOpacity={0.5}
        {...opacityProps}
        {...rest}
        onPress={onPress}
        children={children}
      />
    )
  } else if (type === 'native') {
    // Only on Android Lollipop and above
    if (Platform.Version >= 21) {
      return (
        <View {...outerProps}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              nativePressColor,
              nativeBorderless
            )}
            {...nativeProps}
            {...rest}
            onPress={onPress}
            children={children}
          />
        </View>
      )
    }
    return (
      <View {...outerProps}>
        <TouchableNativeFeedback
          {...nativeProps}
          {...rest}
          onPress={onPress}
          children={children}
        />
      </View>
    )
  } else if (type === 'highlight') {
    return (
      <TouchableHighlight
        {...outerProps}
        accessibilityTraits="button"
        underlayColor="#3C5EAE"
        {...highlightProps}
        {...rest}
        onPress={onPress}
        children={children}
      />
    )
  } else if (type === 'without') {
    return (
      <View {...outerProps}>
        <TouchableWithoutFeedback
          {...withoutProps}
          {...rest}
          onPress={onPress}
          children={children}
        />
      </View>
    )
  } else {
    ;(type: empty)
    throw new Error(`Unknown Touchable type: ${type}`)
  }
}
