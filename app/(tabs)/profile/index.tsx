import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

function Profile() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

export default Profile;
