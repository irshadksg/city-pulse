import { useRTL } from '@/hooks/useRTL';
import { TicketmasterEvent } from '@/types/event.types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, MD3Theme, Text, useTheme } from 'react-native-paper';

interface Props {
  event: TicketmasterEvent;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { isRTL } = useRTL();
  const theme = useTheme();
  const styles = createStyles(theme, isRTL);

  const imageUrl = event.images?.[0]?.url;
  const date = new Date(event.dates.start.dateTime).toLocaleString();

  return (
    <Card style={styles.card} elevation={3}>
      {imageUrl && <Card.Cover source={{ uri: imageUrl }} />}
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.type}>{event.type.toUpperCase()}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text
          variant="bodySmall"
          numberOfLines={2}
          ellipsizeMode={isRTL ? 'head' : 'tail'}
          style={[styles.info]}
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
