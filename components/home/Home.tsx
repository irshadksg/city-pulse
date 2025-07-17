import { generateErrorMessage } from '@/helpers/http.helper';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD3Theme, Text, useTheme } from 'react-native-paper';
import AppHeader from '../ui/AppHeader';
import { useHome } from './useHome';

const Home = () => {
  const { data, isLoading, error } = useHome();
  const theme = useTheme();
  const styles = createStyles(theme);

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
      <View>{data && data.map((item: any) => <Text key={item.id}>{item.name}</Text>)}</View>
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
  });
};
