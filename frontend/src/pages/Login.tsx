import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full py-12 px-6">
        <h1 className="text-3xl mb-8 text-center font-semibold">
          Sign in to your account
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

            {/* Forgot Password Link */}
            <div className="text-right text-sm">
              <Link
                to="/password/forgot"
                className="text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              disabled={!email || password.length < 6 || isPending}
              variant="secondary"
              className="w-full py-2 text-lg font-semibold"
              onClick={() => signIn({ email, password })}
            >
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
