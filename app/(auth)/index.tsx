import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        Login
      </Text>

      <Button mode="contained" style={{ marginTop: 20 }}>
        Login
      </Button>

      <Button mode="text" onPress={() => router.push('/(auth)/signup')} style={{ marginTop: 10 }}>
        Don't have an account? Sign Up
      </Button>
    </View>
  );
}
