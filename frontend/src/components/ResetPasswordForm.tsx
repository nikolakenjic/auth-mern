import { resetPassword } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ResetPasswordFormProps {
  code: string;
}

const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
  const [password, setPassword] = useState<string>('');

  console.log(password);

  const {
    mutate: resetUserPassword,
    isError,
    isSuccess,
    error,
    isPending,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return (
    <div className="flex min-h-screen justify-center">
      <div className="max-w-md mx-auto py-12 px-6 text-center">
        <h1 className="text-4xl mb-8">Change your password</h1>
        <div className="rounded-lg bg-gray-700 shadow-lg p-8">
          {isError && (
            <div className="mb-3 text-red-400">
              {error.message || 'An error occurred'}
            </div>
          )}
          {isSuccess ? (
            <div>
              <div className="flex items-center gap-2 p-4 rounded-xl bg-green-100 text-green-600 mb-3">
                <CheckCircle />
                <span>Password updated successfully!</span>
              </div>
              <Link to="/login" replace className="text-blue-500 underline">
                Sign in
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="password" className="block text-left mb-2">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  className="w-full p-2 rounded border border-gray-300 text-black"
                />
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
                disabled={isPending || password.length < 6}
                onClick={() =>
                  resetUserPassword({ password, verificationCode: code })
                }
              >
                {isPending ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
