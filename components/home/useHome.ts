import { fetchEvents } from '@/services/ticketmaster.service';
import { GetEventApiParams, TicketmasterEvent } from '@/types/event.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

const initialApiParams: GetEventApiParams = {
  keyword: '',
  city: '',
};

export const useHome = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [apiParams, setApiParams] = useState<GetEventApiParams>(initialApiParams);

  const queryEvents: UseQueryResult<TicketmasterEvent[]> = useQuery({
    queryKey: ['events', apiParams],
    queryFn: () => fetchEvents(apiParams),
  });

  return {
    isSearchOpen,
    setIsSearchOpen,
    queryEvents,
    apiParams,
    setApiParams,
  };
};
