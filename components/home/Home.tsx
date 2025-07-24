import { ErrorScreen, LoaderScreen, SearchInput } from '@/components/ui';
import { AppTheme } from '@/configs/theme';
import { generateErrorMessage } from '@/helpers/http.helper';
import { useAppTheme } from '@/hooks/useAppTheme';
import { TicketmasterEvent } from '@/types/event.types';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppFlatList, AppHeader, AppText, AppView } from '../ui';
import EventCard from './EventCard';
import { useHome } from './useHome';

const Home = () => {
  const {
    queryEvents: { data, isFetching, error, refetch },
    isSearchOpen,
    setIsSearchOpen,
    isFavorite,
    handleToggleFavorite,
    handleSearchByKeyword,
    handleSearchByCity,
    handleNavigateDetailsPage,
  } = useHome();

  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // ERROR HANDLING
  if (error) {
    return (
      <ErrorScreen
        header={{ title: 'Home' }}
        message={generateErrorMessage(error)}
        onRetryPress={refetch}
      />
    );
  }

  // DATA RENDERING
  return (
    <AppView style={{ flex: 1 }}>
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
        <AppView style={styles.searchContainer}>
          <SearchInput
            placeholder="Search by keyword..."
            onSearch={handleSearchByKeyword}
            containerStyle={{ marginBottom: 16 }}
          />
          <SearchInput placeholder="Search by city..." onSearch={handleSearchByCity} />
        </AppView>
      )}

      {isFetching && <LoaderScreen header={{ title: 'Home', show: false }} />}

      {/* EVENT LIST */}
      {!isFetching && (data?.length || 0) > 0 && (
        <AppFlatList<TicketmasterEvent>
          contentContainerStyle={styles.listContainer}
          data={data}
          keyExtractor={(item) => item.id}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
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

      {/* NO DATA */}
      {!isFetching && (!data || data.length === 0) && (
        <AppView style={styles.notFound}>
          <AppText style={styles.notFoundText}>No events found. </AppText>
          <AppText style={styles.tryChangeText}>Try changing your keyword</AppText>
        </AppView>
      )}
    </AppView>
  );
};

export default Home;

const createStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    listContainer: {
      paddingHorizontal: 12,
      paddingBottom: 16,
    },
    searchContainer: {
      padding: 16,
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
