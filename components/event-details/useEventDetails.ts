import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import { fetchEventById } from '@/services/ticketmaster.service';
import { TicketmasterEvent } from '@/types/event.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export const useEventDetails = () => {
  const { id: eventId } = useLocalSearchParams();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const router = useRouter();

  const queryEvent: UseQueryResult<TicketmasterEvent> = useQuery({
    queryKey: ['event-details', eventId],
    queryFn: () => fetchEventById(eventId as string),
  });

  // Load favorite IDs on mount
  useEffect(() => {
    const loadFavorites = async () => {
      const saved: string[] = (await StorageService.getItem(STORAGE_KEYS.FAVOURITES)) || [];
      setFavoriteIds(saved);
    };
    loadFavorites();
  }, []);

  // Toggle favorite
  const handleToggleFavorite = useCallback(
    async (eventId: string) => {
      let updated: string[];

      if (favoriteIds.includes(eventId)) {
        updated = favoriteIds.filter((id) => id !== eventId);
      } else {
        updated = [...favoriteIds, eventId];
      }

      setFavoriteIds(updated);
      await StorageService.setItem(STORAGE_KEYS.FAVOURITES, updated);
    },
    [favoriteIds],
  );

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const handleNavigateDetailsPage = (eventId: string) => {
    router.push(`/(tabs)/home/${eventId}`);
  };

  return {
    queryEvent,
    isFavorite,
    handleToggleFavorite,
    handleNavigateDetailsPage,
  };
};
