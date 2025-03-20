import useAuth from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-[90vh]">
        <Loader2 className="animate-spin mb-4" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="p-4 min-h-screen">
        {/* <UserMenu /> */}
        <Outlet />
      </div>
    );
  }

  return (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default AppContainer;
