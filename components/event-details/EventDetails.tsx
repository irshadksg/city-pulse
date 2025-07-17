import { useRTL } from '@/hooks/useRTL';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../ui/AppHeader';
import { useEventDetails } from './useEventDetails';

const EventDetailsScreen = () => {
  const { isRTL } = useRTL();
  const theme = useTheme();
  const styles = createStyles(theme, isRTL);

  const { bottom } = useSafeAreaInsets();
  const { queryEvent, isFavorite, handleToggleFavorite } = useEventDetails();

  const {
    id,
    name,
    images,
    info,
    pleaseNote,
    url,
    dates,
    classifications,
    seatmap,
    ageRestrictions,
    ticketing,
  } = queryEvent.data || {};

  const date = new Date(dates?.start?.dateTime ?? '').toLocaleString();
  const mainImage = images?.[0]?.url;

  const genre = classifications?.[0]?.genre?.name;
  const subGenre = classifications?.[0]?.subGenre?.name;
  const segment = classifications?.[0]?.segment?.name;

  const legalAge = ageRestrictions?.legalAgeEnforced ? '18+ only' : 'All ages';

  if (queryEvent.isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader title="Event Details" />
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <AppHeader title={name || 'Event Details'} />

      <ScrollView contentContainerStyle={styles.container}>
        {mainImage && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: mainImage }} style={styles.bannerImage} />
            <View style={styles.favoriteIcon}>
              <IconButton
                icon={isFavorite?.(id || '') ? 'heart' : 'heart-outline'}
                iconColor={theme.colors.onPrimary}
                containerColor={theme.colors.primary}
                onPress={() => handleToggleFavorite?.(id || '')}
              />
            </View>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{name || ''}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.date}>📅 {date}</Text>
            <Text style={styles.meta}>
              🎭 {segment} - {genre} / {subGenre}
            </Text>
            <Text style={styles.meta}>🔞 {legalAge}</Text>
            <Text style={styles.meta}>
              💲 All Inclusive Pricing: {ticketing?.allInclusivePricing?.enabled ? 'Yes' : 'No'}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>{info || 'No event info available.'}</Text>

          {pleaseNote ? (
            <>
              <Text style={styles.sectionTitle}>Please Note</Text>
              <Text style={styles.sectionText}>{pleaseNote}</Text>
            </>
          ) : null}

          {seatmap?.staticUrl && (
            <>
              <Text style={styles.sectionTitle}>Seatmap</Text>
              <Image
                source={{ uri: seatmap?.staticUrl }}
                style={styles.seatmap}
                resizeMode="contain"
              />
            </>
          )}

          {url && (
            <Button
              mode="contained"
              style={styles.ctaButton}
              onPress={() => Linking.openURL?.(url)}
            >
              Buy Tickets
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const createStyles = (theme: MD3Theme, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      paddingBottom: 40,
    },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageWrapper: {
      position: 'relative',
    },
    bannerImage: {
      width: '100%',
      height: 240,
    },
    favoriteIcon: {
      position: 'absolute',
      top: 12,
      right: 12,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: isRTL ? 'right' : 'left',
    },
    date: {
      fontSize: 16,
      marginBottom: 6,
      textAlign: isRTL ? 'right' : 'left',
    },
    metaContainer: {
      marginBottom: 12,
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      gap: 14,
    },
    meta: {
      fontSize: 16,
      textAlign: isRTL ? 'right' : 'left',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 4,
      textAlign: isRTL ? 'right' : 'left',
    },
    sectionText: {
      fontSize: 14,
      textAlign: isRTL ? 'right' : 'left',
      color: theme.colors.onSurfaceVariant,
    },
    seatmap: {
      width: '100%',
      height: 200,
      marginTop: 8,
    },
    ctaButton: {
      marginTop: 24,
      borderRadius: 8,
    },
  });

export default EventDetailsScreen;
