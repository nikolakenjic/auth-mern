import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { register } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const {
    mutate: createAccount,
    isPending,
    isError,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAccount({ email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full py-12 px-6">
        <h1 className="text-3xl mb-8 text-center font-semibold">
          Sign up here{' '}
        </h1>

        <div className="rounded-lg bg-gray-800 shadow-lg p-8">
          {/* Error message placeholder */}
          {isError && (
            <p className="text-red-500 mb-4">Invalid email or password</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Button
              disabled={
                !email ||
                password.length < 6 ||
                isPending ||
                password !== confirmPassword
              }
              variant="secondary"
              className="w-full py-2 text-lg font-semibold"
            >
              Create Account
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm mt-6">
            You already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
