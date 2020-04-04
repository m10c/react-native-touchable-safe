import * as React from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

type TouchableProps = {
  all?: 'opacity' | 'highlight' | 'without';
  ios?: 'opacity' | 'highlight' | 'without';
  android?: 'native' | 'opacity' | 'highlight' | 'without';
  onPress?: () => void;
  outerStyle?: StyleProp<ViewStyle>;
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
