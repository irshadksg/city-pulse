import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import { fetchEvents } from '@/services/ticketmaster.service';
import { GetEventApiParams } from '@/types/event.types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export const useHome = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [apiParams, setApiParams] = useState<GetEventApiParams>({
    keyword: '',
    city: '',
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const queryEvents = useQuery({
    queryKey: ['events', apiParams],
    queryFn: () => fetchEvents(apiParams),
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

  return {
    isSearchOpen,
    setIsSearchOpen,
    queryEvents,
    apiParams,
    setApiParams,
    isFavorite,
    handleToggleFavorite,
  };
};
