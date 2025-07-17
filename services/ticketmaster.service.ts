import { GetEventApiParams } from '@/types/event.types';
import { HttpService } from './http-service';

export const fetchEvents = async (apiParams: GetEventApiParams) => {
  const response = await HttpService.get('/events.json' + 't', {
    params: {
      ...apiParams,
    },
  });
  return response.data._embedded?.events || [];
};
