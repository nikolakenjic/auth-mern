import ResetPasswordForm from '@/components/ResetPasswordForm';
import { AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const exp = Number(searchParams.get('exp'));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md w-full px-6 py-12 text-center">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-100 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <span>Invalid Link</span>
            </div>
            <p className="text-gray-500">
              The link is either invalid or has expired.
            </p>
            <Link
              to="/password/forgot"
              replace
              className="text-blue-500 underline"
            >
              Request a new password reset link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
