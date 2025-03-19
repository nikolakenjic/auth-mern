import { verifyEmail } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const VerifyEmail = () => {
  const { code } = useParams();
  const { isPending, isError, isSuccess } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code as string),
  });

  return (
    <div className="flex min-h-screen justify-center mt-12">
      <div className="max-w-md mx-auto py-12 px-6 text-center">
        {isPending ? (
          <Loader2 className="animate-spin text-gray-600 w-8 h-8 mx-auto" />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div
              className={`flex items-center gap-2 p-4 rounded-xl ${
                isSuccess
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {isSuccess ? <CheckCircle /> : <XCircle />}
              <span>{isSuccess ? 'Email Verified!' : 'Invalid Link'}</span>
            </div>

            {isError && (
              <p className="text-gray-400">
                The link is either invalid or expired.{' '}
                <Link
                  to="/password/forgot"
                  replace
                  className="text-blue-500 underline"
                >
                  Get a new link
                </Link>
              </p>
            )}

            <Link to="/" replace className="text-blue-500 underline">
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
