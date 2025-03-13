import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full py-12 px-6 text-center">
        <h1>Sign to your account</h1>

        <div className="rounded-lg bg-gray-800 shadow-lg p-8">
          {/* Add error */}
          <div className="p-4">
            <form className="space-y-8">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 mb-1 "
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <Button onClick={handleSubmit}>Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
