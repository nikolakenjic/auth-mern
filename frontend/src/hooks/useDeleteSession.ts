import { deleteSession } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SESSIONS, Session } from './useSessions';
import { AxiosResponse } from 'axios';

const useDeleteSession = (
  sessionId: string
): { deleteSession: () => void; isPending: boolean } => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<AxiosResponse, Error, void>({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.setQueryData<Session[]>([SESSIONS], (cache) =>
        cache ? cache.filter((session) => session.id !== sessionId) : []
      );
    },
  });

  return { deleteSession: mutate, isPending };
};

export default useDeleteSession;
