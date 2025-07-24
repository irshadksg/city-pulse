// components/SearchInput.tsx

import { useDebounce } from '@/hooks/useDebounce';
import React from 'react';
import { ViewStyle } from 'react-native';
import { TextInputProps } from 'react-native-paper';
import { AppInput } from './AppInput';

interface SearchInputProps extends TextInputProps {
  onSearch: (text: string) => void;
  debounceDelay?: number;
  containerStyle?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder,
  containerStyle,
  debounceDelay = 300,
  ...rest
}) => {
  const debouncedSearch = useDebounce(onSearch, debounceDelay);

  return (
    <AppInput
      containerStyle={containerStyle}
      onChangeText={debouncedSearch}
      placeholder={placeholder || 'Search...'}
      clearButtonMode="while-editing"
      {...rest}
    />
  );
};
