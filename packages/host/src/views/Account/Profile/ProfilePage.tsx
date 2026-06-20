import { LoadingScreen } from '@components/LoadingScreen';
import { useGetProfile } from '@api/hooks/users/useGetProfile';
import { ProfileForm } from './ProfileForm';

const ProfilePage: React.FC = () => {
  const { profile, loading } = useGetProfile();

  if (loading || !profile) {
    return <LoadingScreen />;
  }

  return <ProfileForm canChangePassword={profile.canChangePassword} />;
};

export { ProfilePage };
