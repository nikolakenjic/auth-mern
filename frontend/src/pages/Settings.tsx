import SessionCard from '@/components/SessionCard';
import useSessions from '@/hooks/useSessions';

const Settings = () => {
  const { data: sessions = [], isLoading, isError } = useSessions();

  return (
    <div className="mt-16 p-4">
      <h1 className="mb-6 text-4xl">My Sessions</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <p className="text-red-500">Failed to get sessions.</p>}
      {!isLoading && !isError && (
        <div className="flex flex-col gap-4">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;
