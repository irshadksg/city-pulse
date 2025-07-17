import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import { useCallback, useEffect, useState } from 'react';

export const useFavoriteEvents = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const saved: string[] = (await StorageService.getItem(STORAGE_KEYS.FAVOURITES)) || [];
      setFavoriteIds(saved);
    };
    loadFavorites();
  }, [favoriteIds]);

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
    favoriteIds,
    isFavorite,
    handleToggleFavorite,
  };
};
