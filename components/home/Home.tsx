import AppHeader from '@/components/ui/AppHeader';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const Home = () => {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Home" />

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Button
          onPress={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Home;
