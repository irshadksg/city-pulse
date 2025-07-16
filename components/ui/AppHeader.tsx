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
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, editAction, logoutAction }) => {
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
