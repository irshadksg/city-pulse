import { AppTheme } from '@/configs/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useRTL } from '@/hooks/useRTL';
import React from 'react';
import { Text, TextProps } from 'react-native-paper';

type AppTextTheme = TextProps<AppTheme>;

export const AppText: React.FC<AppTextTheme> = ({
  style,
  numberOfLines,
  ellipsizeMode,
  ...rest
}) => {
  const { isRTL } = useRTL();
  const theme = useAppTheme();

  return (
    <Text
      {...rest}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode ?? (isRTL ? 'head' : 'tail')}
      style={[
        {
          textAlign: isRTL ? 'right' : 'left',
          writingDirection: isRTL ? 'rtl' : 'ltr',
          color: theme.colors.onSurface,
        },
        style,
      ]}
    />
  );
};
