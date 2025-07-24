import { useAppTheme } from '@/hooks/useAppTheme';
import { useRTL } from '@/hooks/useRTL';
import React from 'react';
import { View, ViewProps } from 'react-native';

export const AppView: React.FC<ViewProps> = ({ style, children, ...rest }) => {
  const { isRTL } = useRTL();
  const theme = useAppTheme();

  // Extract user-supplied flexDirection
  const flattenStyle = Array.isArray(style) ? Object.assign({}, ...style) : style || {};
  const flexDirection = flattenStyle?.flexDirection;

  // Only override row/row-reverse if user used "row"
  const resolvedFlexDirection =
    flexDirection === 'row' ? (isRTL ? 'row-reverse' : 'row') : flexDirection;

  return (
    <View
      {...rest}
      style={[
        { backgroundColor: theme.colors.background },
        style,
        flexDirection === 'row' ? { flexDirection: resolvedFlexDirection } : undefined,
      ]}
    >
      {children}
    </View>
  );
};
