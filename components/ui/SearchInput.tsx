// components/SearchInput.tsx

import { useDebounce } from '@/hooks/useDebounce';
import { useRTL } from '@/hooks/useRTL';
import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

type SearchInputProps = {
  onSearch: (text: string) => void;
  inputProps?: TextInputProps;
  debounceDelay?: number;
  containerStyle?: ViewStyle;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  inputProps = {},
  debounceDelay = 300,
  containerStyle = {},
}) => {
  const theme = useTheme();

  const { isRTL } = useRTL();

  const debouncedSearch = useDebounce(onSearch, debounceDelay);

  const handleChange = useCallback(
    (text: string) => {
      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        onChangeText={handleChange}
        mode="outlined"
        placeholder={inputProps?.placeholder || 'Search...'}
        left={!isRTL && <TextInput.Icon icon="magnify" />}
        right={isRTL && <TextInput.Icon icon="magnify" />}
        style={[styles.input, inputProps?.style]}
        theme={{ colors: { primary: theme.colors.primary } }}
        contentStyle={{
          writingDirection: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          paddingRight: isRTL ? 20 : 0,
        }}
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    backgroundColor: '#fff',
    height: 44,
  },
});
