import * as React from 'react';
import { ViewProps, ViewStyle } from 'react-native';

type TouchableProps = {
  all?: 'opacity' | 'highlight' | 'without';
  ios?: 'opacity' | 'highlight' | 'without';
  android?: 'native' | 'opacity' | 'highlight' | 'without';
  onPress?: () => void;
  outerStyle?: ViewStyle;
  outerProps?: ViewProps;
  disabled?: boolean;

  nativeBorderless?: boolean;
  nativePressColor?: string;

  nativeProps?: ViewProps;
  opacityProps?: ViewProps;
  highlightProps?: ViewProps;
  withoutProps?: ViewProps;
};

export default class Touchable extends React.Component<TouchableProps> {}
