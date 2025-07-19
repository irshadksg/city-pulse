import { AppText, AppView } from '@/components/ui';
import { AppTheme } from '@/configs/theme';
import { formatDate } from '@/helpers/utils';
import { useAppTheme } from '@/hooks/useAppTheme';
import { TicketmasterEvent } from '@/types/event.types';
import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

interface Props {
  event: TicketmasterEvent;
  isFavorite: boolean;
  onToggleFavorite: (eventId: string) => void;
  onPress?: () => void;
}

const EventCard: React.FC<Props> = ({ event, isFavorite, onToggleFavorite, onPress }) => {
  const theme = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const imageUrl = event?.images?.[0]?.url;
  const date = formatDate(event?.dates?.start?.dateTime);

  return (
    <Card style={styles.card} elevation={3} onPress={onPress}>
      {imageUrl && (
        <AppView style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.coverImage}
            contentFit="cover"
            transition={300}
          />
          <AppView style={styles.favoriteIconContainer}>
            <IconButton
              style={{ margin: 0 }}
              icon={isFavorite ? 'heart' : 'heart-outline'}
              iconColor={theme.colors.onPrimary}
              containerColor={theme.colors.primary}
              size={24}
              onPress={() => onToggleFavorite(event.id)}
            />
          </AppView>
        </AppView>
      )}

      <Card.Content>
        <AppText style={styles.title}>{event.name}</AppText>
        <AppText style={styles.type}>{event.type.toUpperCase()}</AppText>
        <AppText style={styles.date}>{date}</AppText>
        <AppText variant="bodySmall" numberOfLines={2} style={styles.info}>
          {event.info || 'No additional info available.'}
        </AppText>
      </Card.Content>
    </Card>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 12,
    },
    imageWrapper: {
      position: 'relative',
    },
    coverImage: {
      width: '100%',
      height: 180,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    favoriteIconContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
    },
    title: {
      fontSize: 18,
      marginVertical: 12,
      fontWeight: '600',
    },
    type: {
      fontSize: 13,
      marginBottom: 4,
    },
    date: {
      fontSize: 14,
      marginBottom: 6,
    },
    info: {
      fontSize: 13,
      marginTop: 8,
    },
  });

export default EventCard;
