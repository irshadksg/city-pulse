import { AppTheme } from '@/configs/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AppHeader, AppText, AppView } from '../ui';

const Profile = () => {
  const { user } = useAuth();
  const theme = useAppTheme();

  const styles = createStyles(theme);

  return (
    <AppView style={styles.container}>
      <AppHeader title="Profile" logoutAction={{ show: true }} />
      <AppView style={styles.content}>
        <AppView style={styles.infoBlock}>
          <AppText style={styles.label}>Name</AppText>
          <AppText style={styles.value}>{user?.name || '-'}</AppText>
        </AppView>

        <AppView style={styles.infoBlock}>
          <AppText style={styles.label}>Email</AppText>
          <AppText style={styles.value}>{user?.email || '-'}</AppText>
        </AppView>
      </AppView>
    </AppView>
  );
};

export default Profile;

const createStyles = (theme: AppTheme) =>
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
