import { fetchEvents } from '@/services/ticketmaster.service';
import { GetEventApiParams } from '@/types/event.types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const initialApiParams: GetEventApiParams = {
  keyword: '',
  city: '',
};

export const useHome = () => {
  const [apiParams, setApiParams] = useState<GetEventApiParams>(initialApiParams);

  const queryEvents = useQuery({
    queryKey: ['events', apiParams],
    queryFn: () => fetchEvents(apiParams),
  });

  return {
    ...queryEvents,
  };
};
