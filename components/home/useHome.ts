import { useFavoriteEvents } from '@/hooks/useFavouriteEvents';
import { fetchEvents } from '@/services/ticketmaster.service';
import { GetEventApiParams } from '@/types/event.types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

export const useHome = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [apiParams, setApiParams] = useState<GetEventApiParams>({
    keyword: '',
    city: '',
  });

  const { isFavorite, handleToggleFavorite } = useFavoriteEvents();

  const router = useRouter();

  const queryEvents = useQuery({
    queryKey: ['events', apiParams],
    queryFn: () => fetchEvents(apiParams),
  });

  const handleSearchByKeyword = useCallback((text: string) => {
    setApiParams((prev) => ({ ...prev, keyword: text }));
  }, []);

  const handleSearchByCity = useCallback((text: string) => {
    setApiParams((prev) => ({ ...prev, city: text }));
  }, []);

  const handleNavigateDetailsPage = (eventId: string) => {
    router.push(`/(tabs)/home/${eventId}`);
  };

  return {
    isSearchOpen,
    setIsSearchOpen,
    queryEvents,
    isFavorite,
    handleToggleFavorite,
    handleSearchByKeyword,
    handleSearchByCity,
    handleNavigateDetailsPage,
  };
};
