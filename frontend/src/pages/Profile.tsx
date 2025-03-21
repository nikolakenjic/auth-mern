import useAuth from '@/hooks/useAuth';

type User = {
  email: string;
  verified: boolean;
  createdAt: string;
};

const Profile = () => {
  const { user } = useAuth() as { user: User | undefined };

  console.log(user);

  if (!user) {
    return <p className="text-white">Loading user data...</p>;
  }

  const { email, verified, createdAt } = user;

  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-3xl mb-4">My Account</h1>
      {!verified && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-3">
          Please verify your email
        </div>
      )}
      <p className="text-white mb-2">
        Email: <span className="text-gray-300">{email}</span>
      </p>
      <p className="text-white">
        Created on:{' '}
        <span className="text-gray-300">
          {new Date(createdAt).toLocaleDateString('en-US')}
        </span>
      </p>
    </div>
  );
};

export default Profile;
