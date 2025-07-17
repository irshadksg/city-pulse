import { generateErrorMessage } from '@/helpers/http.helper';
import { useRTL } from '@/hooks/useRTL';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import AppHeader from '../ui/AppHeader';
import EventCard from './EventCard';
import { useHome } from './useHome';

const Home = () => {
  const { data, isLoading, error } = useHome();
  const theme = useTheme();
  const styles = createStyles(theme);

  const { toggleRTL } = useRTL();

  // LOADER
  if (isLoading)
    return (
      <Container>
        <View style={styles.loader}>
          <ActivityIndicator animating={true} />
        </View>
      </Container>
    );

  // ERROR HANDLING
  if (error) {
    return (
      <Container>
        <View style={styles.loader}>
          <Text>Error: {generateErrorMessage(error)}</Text>
        </View>
      </Container>
    );
  }

  // DATA RENDERING
  return (
    <Container>
      <Button onPress={toggleRTL}>Toggle Directions</Button>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </Container>
  );
};

export default Home;

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Home" />
      {children}
    </View>
  );
};

const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContainer: {
      paddingHorizontal: 12,
      paddingBottom: 16,
    },
  });
};
