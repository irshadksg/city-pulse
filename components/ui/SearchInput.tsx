// components/SearchInput.tsx

import { useDebounce } from '@/hooks/useDebounce';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TextInputProps } from 'react-native-paper';
import { AppInput } from './AppInput';
import { AppView } from './AppView';

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
  const debouncedSearch = useDebounce(onSearch, debounceDelay);

  return (
    <AppView style={[styles.container, containerStyle]}>
      <AppInput
        onChangeText={debouncedSearch}
        placeholder={inputProps?.placeholder || 'Search...'}
        style={inputProps?.style}
        clearButtonMode="while-editing"
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
