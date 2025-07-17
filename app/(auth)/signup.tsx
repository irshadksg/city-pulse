import Signup from '@/components/signup/Signup';
import React from 'react';
import { View } from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Signup />
    </View>
  );
};

export default SignUpScreen;
