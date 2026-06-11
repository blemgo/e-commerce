import { useGetAddresses } from '@api/hooks/addresses/useGetAddresses';
import { useCreateAddress } from '@api/hooks/addresses/useCreateAddress';
import { useUpdateAddress } from '@api/hooks/addresses/useUpdateAddress';
import { useDeleteAddress } from '@api/hooks/addresses/useDeleteAddress';
import { useSetDefaultAddress } from '@api/hooks/addresses/useSetDefaultAddress';
import type { CreateAddressDTO, UpdateAddressDTO, UserAddress } from '@types';

export interface UseAddressBookReturn {
  addresses: UserAddress[];
  loading: boolean;
  isSubmitting: boolean;
  create: (dto: CreateAddressDTO) => Promise<boolean>;
  update: (addressId: string, dto: UpdateAddressDTO) => Promise<boolean>;
  setDefault: (addressId: string) => Promise<void>;
  remove: (addressId: string) => Promise<void>;
}

const useAddressBook = (): UseAddressBookReturn => {
  const { addresses, setAddresses, loading } = useGetAddresses();
  const { createAddress, isLoading: isCreating } = useCreateAddress();
  const { updateAddress, isLoading: isUpdating } = useUpdateAddress();
  const { deleteAddress } = useDeleteAddress();
  const { setDefaultAddress } = useSetDefaultAddress();

  const create = async (dto: CreateAddressDTO): Promise<boolean> => {
    try {
      setAddresses(await createAddress(dto));

      return true;
    } catch {
      return false;
    }
  };

  const update = async (
    addressId: string,
    dto: UpdateAddressDTO,
  ): Promise<boolean> => {
    try {
      setAddresses(await updateAddress(addressId, dto));

      return true;
    } catch {
      return false;
    }
  };

  const setDefault = async (addressId: string): Promise<void> => {
    try {
      setAddresses(await setDefaultAddress(addressId));
    } catch {
      return;
    }
  };

  const remove = async (addressId: string): Promise<void> => {
    try {
      setAddresses(await deleteAddress(addressId));
    } catch {
      return;
    }
  };

  return {
    addresses,
    loading,
    isSubmitting: isCreating || isUpdating,
    create,
    update,
    setDefault,
    remove,
  };
};

export { useAddressBook };
