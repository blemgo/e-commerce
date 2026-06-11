import { LoadingScreen } from '@components/LoadingScreen';
import { useGetProfile } from '@api/hooks/users/useGetProfile';
import { ProfileForm } from './ProfileForm';

const ProfilePage = () => {
  const { profile, loading } = useGetProfile();

  if (loading || !profile) {
    return <LoadingScreen />;
  }

  return <ProfileForm profile={profile} />;
};

export { ProfilePage };
