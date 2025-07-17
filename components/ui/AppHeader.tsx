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
    onPress?: () => void;
  };
  searchAction?: {
    show: boolean;
    isSearchOpen: boolean;
    onPress: () => void;
  };
  directionToggleAction?: {
    show: boolean;
    isRTL: boolean;
    onPress: () => void;
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

  return (
    <Appbar.Header dark style={styles.header}>
      <Appbar.Content title={title} titleStyle={styles.title} />

      {editAction?.show && (
        <Appbar.Action color={theme.colors.onPrimary} icon="pencil" onPress={editAction?.onPress} />
      )}

      {logoutAction?.show && (
        <Appbar.Action
          iconColor={theme.colors.onPrimary}
          icon="logout"
          onPress={logoutAction?.onPress}
        />
      )}

      {searchAction?.show && (
        <Appbar.Action
          icon={searchAction.isSearchOpen ? 'close' : 'magnify'}
          iconColor={theme.colors.onPrimary}
          onPress={searchAction.onPress}
        />
      )}

      {directionToggleAction?.show && (
        <Appbar.Action
          icon={
            directionToggleAction.isRTL
              ? 'format-textdirection-l-to-r'
              : 'format-textdirection-r-to-l'
          }
          iconColor={theme.colors.onPrimary}
          onPress={directionToggleAction.onPress}
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
