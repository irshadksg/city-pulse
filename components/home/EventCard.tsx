import { formatDate } from '@/helpers/utils';
import { useRTL } from '@/hooks/useRTL';
import { TicketmasterEvent } from '@/types/event.types';
import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, MD3Theme, Text, useTheme } from 'react-native-paper';

interface Props {
  event: TicketmasterEvent;
  isFavorite: boolean;
  onToggleFavorite: (eventId: string) => void;
  onPress?: () => void;
}

const EventCard: React.FC<Props> = ({ event, isFavorite, onToggleFavorite, onPress }) => {
  const { isRTL } = useRTL();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme, isRTL), [theme, isRTL]);

  const imageUrl = event?.images?.[0]?.url;
  const date = formatDate(event?.dates?.start?.dateTime);

  return (
    <Card style={styles.card} elevation={3} onPress={onPress}>
      {imageUrl && (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.coverImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.favoriteIconContainer}>
            <IconButton
              style={{ margin: 0 }}
              icon={isFavorite ? 'heart' : 'heart-outline'}
              iconColor={theme.colors.onPrimary}
              containerColor={theme.colors.primary}
              size={24}
              onPress={() => onToggleFavorite(event.id)}
            />
          </View>
        </View>
      )}

      <Card.Content style={styles.content}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.type}>{event.type.toUpperCase()}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text
          variant="bodySmall"
          numberOfLines={2}
          ellipsizeMode={isRTL ? 'head' : 'tail'}
          style={styles.info}
        >
          {event.info || 'No additional info available.'}
        </Text>
      </Card.Content>
    </Card>
  );
};

const createStyles = (theme: MD3Theme, isRTL: boolean) =>
  StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 12,
      overflow: 'hidden',
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
    content: {
      alignItems: isRTL ? 'flex-end' : 'flex-start',
    },
    title: {
      fontSize: 18,
      marginVertical: 12,
      fontWeight: '600',
      textAlign: isRTL ? 'right' : 'left',
    },
    type: {
      fontSize: 13,
      marginBottom: 4,
      textAlign: isRTL ? 'right' : 'left',
    },
    date: {
      fontSize: 14,
      marginBottom: 6,
      textAlign: isRTL ? 'right' : 'left',
    },
    info: {
      fontSize: 13,
      marginTop: 8,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
  });

export default EventCard;
