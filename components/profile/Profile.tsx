import { useAuth } from '@/hooks/useAuth';
import { useRTL } from '@/hooks/useRTL';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import AppHeader from '../ui/AppHeader';

const Profile = () => {
  const { user } = useAuth();
  const { isRTL } = useRTL();

  const theme = useTheme();
  const styles = createStyles(theme, isRTL);

  return (
    <View style={styles.container}>
      <AppHeader title="Profile" logoutAction={{ show: true }} />
      <View style={styles.content}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user?.name || '-'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || '-'}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const createStyles = (theme: MD3Theme, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 20,
    },
    infoBlock: {
      marginBottom: 24,
      alignItems: isRTL ? 'flex-end' : 'flex-start',
    },
    label: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 4,
    },
    value: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
  });
