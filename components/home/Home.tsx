import { generateErrorMessage } from '@/helpers/http.helper';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import AppHeader from '../ui/AppHeader';
import { SearchInput } from '../ui/SearchInput';
import EventCard from './EventCard';
import { useHome } from './useHome';

const Home = () => {
  const {
    queryEvents: { data, isFetching, error },
    isSearchOpen,
    setIsSearchOpen,
    apiParams,
    setApiParams,
    isFavorite,
    handleToggleFavorite,
    handleNavigateDetailsPage,
  } = useHome();

  const theme = useTheme();
  const styles = createStyles(theme);

  // ERROR HANDLING
  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader title="Home" />
        <View style={styles.loader}>
          <Text style={styles.errorText}>Error: {generateErrorMessage(error)}</Text>
        </View>
      </View>
    );
  }

  // DATA RENDERING
  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        title="Home"
        searchAction={{
          show: true,
          isSearchOpen,
          onPress: () => setIsSearchOpen(!isSearchOpen),
        }}
      />

      {/* SEARCH INPUTS */}
      {isSearchOpen && (
        <View style={styles.searchContainer}>
          <SearchInput
            inputProps={{ placeholder: 'Search by keyword...' }}
            onSearch={(text) => setApiParams((prev) => ({ ...prev, keyword: text }))}
          />
          <SearchInput
            inputProps={{ placeholder: 'Search by city...' }}
            onSearch={(text) => setApiParams((prev) => ({ ...prev, city: text }))}
          />
        </View>
      )}

      {/* LOADER */}
      {isFetching && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" animating={true} />
        </View>
      )}

      {/* EVENT LIST */}
      {!isFetching && (data?.length || 0) > 0 && (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={handleToggleFavorite}
              onPress={() => handleNavigateDetailsPage(item?.id)}
            />
          )}
        />
      )}

      {/* ERROR MESSAGE */}
      {!isFetching && (!data || data.length === 0) && (
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>No events found. </Text>
          <Text style={styles.tryChangeText}>Try changing your keyword</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    listContainer: {
      paddingHorizontal: 12,
      paddingBottom: 16,
    },
    searchContainer: {
      padding: 12,
      backgroundColor: theme.colors.shadow,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    notFound: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    notFoundText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    tryChangeText: {
      fontSize: 16,
      textAlign: 'center',
    },
    errorText: {
      fontSize: 18,
      textAlign: 'center',
      color: theme.colors.error,
    },
  });
};
