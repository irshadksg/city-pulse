import React, { isValidElement } from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { AppView } from './AppView';

export function AppFlatList<ItemT>(props: FlatListProps<ItemT>) {
  const {
    contentContainerStyle,
    ListHeaderComponent,
    ListFooterComponent,
    ListEmptyComponent,
    ...rest
  } = props;

  // Wrap only if it's a JSX element
  const wrapInAppView = (component: any) => {
    if (!component) return undefined;
    if (typeof component === 'function' || typeof component === 'object') {
      return component; // Function or component class, pass as-is
    }
    if (isValidElement(component)) {
      return () => <AppView>{component}</AppView>; // JSX element — wrap
    }
    return undefined;
  };

  return (
    <FlatList
      {...rest}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.defaultContent, contentContainerStyle]}
      ListHeaderComponent={wrapInAppView(ListHeaderComponent)}
      ListFooterComponent={wrapInAppView(ListFooterComponent)}
      ListEmptyComponent={wrapInAppView(ListEmptyComponent)}
    />
  );
}

const styles = StyleSheet.create({
  defaultContent: {
    flexGrow: 1,
  },
});
