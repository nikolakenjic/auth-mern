import { sendPasswordResetEmail } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const {
    mutate: sendPasswordReset,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md mx-auto py-12 px-6 text-center">
        <h1 className="text-4xl mb-8 font-bold">Reset your password</h1>
        <div className="rounded-lg bg-gray-800 shadow-lg p-8">
          {isError && (
            <div className="mb-3 text-red-400">
              {error?.message || 'An error occurred'}
            </div>
          )}
          <div className="space-y-4">
            {isSuccess ? (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-green-100 text-green-600">
                <CheckCircle />
                Email sent! Check your inbox for further instructions.
              </div>
            ) : (
              <>
                <div className="text-left">
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  disabled={isPending || !email}
                  onClick={() => sendPasswordReset(email)}
                  className={`my-2 px-4 py-2 rounded-md ${
                    isPending || !email
                      ? 'bg-gray-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition duration-200`}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </>
            )}

            <p className="text-sm text-gray-400">
              Go back to{' '}
              <Link to="/login" replace className="text-blue-500 underline">
                Sign in
              </Link>
              &nbsp;or&nbsp;
              <Link to="/register" replace className="text-blue-500 underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
