import { AppHeader, AppScrollView, AppText, AppView } from '@/components/ui';
import { AppTheme } from '@/configs/theme';
import { formatDate } from '@/helpers/utils';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEventDetails } from './useEventDetails';

const EventDetails = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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

  const mainImage = images?.[0]?.url;
  const genre = classifications?.[0]?.genre?.name;
  const subGenre = classifications?.[0]?.subGenre?.name;
  const segment = classifications?.[0]?.segment?.name;

  const legalAge = ageRestrictions?.legalAgeEnforced ? '18+ only' : 'All ages';

  if (queryEvent.isLoading) {
    return (
      <AppView style={{ flex: 1 }}>
        <AppHeader title="Event Details" />
        <AppView style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </AppView>
      </AppView>
    );
  }

  return (
    <AppView style={{ flex: 1, paddingBottom: bottom }}>
      <AppHeader title={name || 'Event Details'} />

      <AppScrollView contentContainerStyle={styles.container}>
        {mainImage && (
          <AppView style={styles.imageWrapper}>
            <Image source={{ uri: mainImage }} style={styles.bannerImage} transition={300} />
            <AppView style={styles.favoriteIcon}>
              <IconButton
                icon={isFavorite?.(id || '') ? 'heart' : 'heart-outline'}
                iconColor={theme.colors.onPrimary}
                containerColor={theme.colors.primary}
                onPress={() => handleToggleFavorite?.(id || '')}
              />
            </AppView>
          </AppView>
        )}

        <AppView style={styles.content}>
          <AppText style={styles.title}>{name || ''}</AppText>
          <AppView style={styles.metaContainer}>
            <AppText style={styles.date}>📅 {formatDate(dates?.start?.dateTime)}</AppText>
            <AppText style={styles.meta}>
              🎭 {segment} - {genre} / {subGenre}
            </AppText>
            <AppText style={styles.meta}>🔞 {legalAge}</AppText>
            <AppText style={styles.meta}>
              💲 All Inclusive Pricing: {ticketing?.allInclusivePricing?.enabled ? 'Yes' : 'No'}
            </AppText>
          </AppView>

          <AppText style={styles.sectionTitle}>About</AppText>
          <AppText style={styles.sectionText}>{info || 'No event info available.'}</AppText>

          {pleaseNote ? (
            <>
              <AppText style={styles.sectionTitle}>Please Note</AppText>
              <AppText style={styles.sectionText}>{pleaseNote}</AppText>
            </>
          ) : null}

          {seatmap?.staticUrl && (
            <>
              <AppText style={styles.sectionTitle}>Seatmap</AppText>
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
        </AppView>
      </AppScrollView>
    </AppView>
  );
};
const createStyles = (theme: AppTheme) =>
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
    },
    date: {
      fontSize: 16,
      marginBottom: 6,
    },
    metaContainer: {
      marginBottom: 12,
      gap: 14,
    },
    meta: {
      fontSize: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 4,
    },
    sectionText: {
      fontSize: 14,
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

export default EventDetails;
