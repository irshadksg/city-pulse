import { useAuth } from '@/hooks/useAuth';
import { useRTL } from '@/hooks/useRTL';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, MD3Theme, useTheme } from 'react-native-paper';

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
  directionToggleAction?: {
    show: boolean;
  };
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  editAction,
  logoutAction,
  searchAction,
  directionToggleAction,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const { logout } = useAuth();
  const { isRTL, toggleRTL } = useRTL();

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

      {directionToggleAction?.show !== false && (
        <Appbar.Action
          icon={isRTL ? 'format-textdirection-l-to-r' : 'format-textdirection-r-to-l'}
          color={theme.colors.onPrimary}
          onPress={toggleRTL}
        />
      )}
    </Appbar.Header>
  );
};

const createStyles = (theme: MD3Theme) =>
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

export default AppHeader;
