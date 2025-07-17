// components/SearchInput.tsx

import { debounce } from '@/helpers/utils';
import React, { useCallback, useMemo, useState } from 'react';
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
  const [query, setQuery] = useState(inputProps?.value || '');
  const theme = useTheme();

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        onSearch(text);
      }, debounceDelay),
    [onSearch, debounceDelay],
  );

  const handleChange = useCallback(
    (text: string) => {
      setQuery(text);
      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        value={query}
        onChangeText={handleChange}
        mode="outlined"
        placeholder={inputProps?.placeholder || 'Search...'}
        left={<TextInput.Icon icon="magnify" />}
        style={[styles.input, inputProps?.style]}
        theme={{ colors: { primary: theme.colors.primary } }}
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
