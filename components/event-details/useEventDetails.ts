import { useFavoriteEvents } from '@/hooks/useFavouriteEvents';
import { fetchEventById } from '@/services/ticketmaster.service';
import { TicketmasterEvent } from '@/types/event.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

export const useEventDetails = () => {
  const { id: eventId } = useLocalSearchParams();

  const { isFavorite, handleToggleFavorite } = useFavoriteEvents();

  const queryEvent: UseQueryResult<TicketmasterEvent> = useQuery({
    queryKey: ['event-details', eventId],
    queryFn: () => fetchEventById(eventId as string),
  });

  return {
    queryEvent,
    isFavorite,
    handleToggleFavorite,
  };
};
