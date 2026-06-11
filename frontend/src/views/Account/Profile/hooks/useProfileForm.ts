import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateProfile } from '@api/hooks/users/useUpdateProfile';
import { useUserContext } from '@contexts/user';
import type { UserProfile } from '@types';

export interface UseProfileFormReturn {
  fullName: string;
  setFullName: (value: string) => void;
  isDirty: boolean;
  isValid: boolean;
  save: () => Promise<void>;
  isSaving: boolean;
}

const useProfileForm = (profile: UserProfile): UseProfileFormReturn => {
  const { updateProfile, isLoading: isSaving } = useUpdateProfile();
  const { user, setUser } = useUserContext();
  const [fullName, setFullName] = useState(profile.fullName);

  const trimmed = fullName.trim();
  const isValid = trimmed.length >= 2;
  const isDirty = trimmed !== profile.fullName;

  const save = async (): Promise<void> => {
    if (!isValid || !isDirty) {
      return;
    }

    let updated: UserProfile;

    try {
      updated = await updateProfile({ fullName: trimmed });
    } catch {
      return;
    }

    if (user) {
      setUser({ ...user, fullName: updated.fullName });
    }

    toast.success('Profile updated.');
  };

  return { fullName, setFullName, isDirty, isValid, save, isSaving };
};

export { useProfileForm };
