import { AppTheme } from '@/configs/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';
import { useRTL } from '@/hooks/useRTL';
import { useNavigation } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

interface AppHeaderProps {
  title: string;
  editAction?: {
    show: boolean;
    onPress?: () => void;
  };
  logoutAction?: {
    show: boolean;
  };
  searchAction?: {
    show: boolean;
    isSearchOpen: boolean;
    onPress: () => void;
  };
  rtlToggleAction?: {
    show: boolean;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  editAction,
  logoutAction,
  searchAction,
  rtlToggleAction = { show: true },
}) => {
  const theme = useAppTheme();
  const navigation = useNavigation();

  const { logout } = useAuth();
  const { isRTL, toggleRTL } = useRTL();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Appbar.Header dark style={styles.header}>
      {navigation.canGoBack?.() && (
        <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.onPrimary} />
      )}

      <Appbar.Content title={title} titleStyle={styles.title} />

      {editAction?.show && (
        <Appbar.Action icon="pencil" color={theme.colors.onPrimary} onPress={editAction.onPress} />
      )}

      {logoutAction?.show && (
        <Appbar.Action icon="logout" color={theme.colors.onPrimary} onPress={logout} />
      )}

      {searchAction?.show && (
        <Appbar.Action
          icon={searchAction.isSearchOpen ? 'close' : 'magnify'}
          color={theme.colors.onPrimary}
          onPress={searchAction.onPress}
        />
      )}

      {rtlToggleAction && (
        <Appbar.Action
          icon={isRTL ? 'format-textdirection-l-to-r' : 'format-textdirection-r-to-l'}
          color={theme.colors.onPrimary}
          onPress={toggleRTL}
        />
      )}
    </Appbar.Header>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.primary,
      elevation: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onPrimary,
    },
  });
