import { GetEventApiParams } from '@/types/event.types';
import { HttpService } from './http-service';

export const fetchEvents = async (apiParams: GetEventApiParams) => {
  const response = await HttpService.get('/events.json', apiParams);
  return response.data._embedded?.events || [];
};
