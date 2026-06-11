import { Navigate } from 'react-router-dom';
import { useUserContext } from '@contexts/user';
import { LoadingScreen } from '@components/LoadingScreen';

const Home = () => {
  const { user, isInitializing } = useUserContext();

  if (isInitializing) return <LoadingScreen />;

  return <Navigate to={user ? '/catalog' : '/login'} replace />;
};

export { Home };
