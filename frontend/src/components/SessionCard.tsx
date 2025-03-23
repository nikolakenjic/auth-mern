import useDeleteSession from '@/hooks/useDeleteSession';
import { Session } from '@/hooks/useSessions';

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const { _id, createdAt, userAgent, isCurrent } = session;

  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <div className="flex p-3 border border-gray-300 rounded-md">
      <div className="flex-1">
        <p className="font-bold text-sm mb-1">
          {new Date(createdAt).toLocaleString('en-US')}
          {isCurrent && ' (current session)'}
        </p>
        <p className="text-gray-500 text-xs">{userAgent}</p>
      </div>
      {!isCurrent && (
        <button
          className="ml-4 text-red-400 text-xl self-center"
          title="Delete Session"
          onClick={() => deleteSession()}
          disabled={isPending}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SessionCard;
