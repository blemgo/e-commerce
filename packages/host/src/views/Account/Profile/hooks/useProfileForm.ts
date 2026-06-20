import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateProfile } from '@shared/api/hooks/users/useUpdateProfile';
import { useUserContext } from '@contexts/user';

export interface UseProfileFormReturn {
  fullName: string;
  setFullName: (value: string) => void;
  isDirty: boolean;
  isValid: boolean;
  save: () => Promise<void>;
  isSaving: boolean;
}

const useProfileForm = (): UseProfileFormReturn => {
  const { updateProfile, isLoading: isSaving } = useUpdateProfile();
  const { user, setUser } = useUserContext();
  const [fullName, setFullName] = useState(user?.fullName ?? '');

  const trimmed = fullName.trim();
  const isValid = trimmed.length >= 2;
  const isDirty = trimmed !== user?.fullName;

  const save = async (): Promise<void> => {
    if (!isValid || !isDirty || !user) {
      return;
    }

    const updated = await updateProfile({ fullName: trimmed });

    setUser({ ...user, fullName: updated.fullName });
    setFullName(updated.fullName);
    toast.success('Profile updated.');
  };

  return { fullName, setFullName, isDirty, isValid, save, isSaving };
};

export { useProfileForm };
