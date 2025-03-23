import { getSessions } from '@/lib/api';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const SESSIONS = 'sessions';

export interface Session {
  id: string;
  name: string;
  createdAt: string;
  [key: string]: any;
}
const useSessions = (opts = {}): UseQueryResult<Session[], Error> => {
  const query = useQuery({
    queryKey: [SESSIONS],
    queryFn: async (): Promise<Session[]> => {
      const response = await getSessions();
      return response.data;
    },
    ...opts,
  });

  return query;
};

export default useSessions;
