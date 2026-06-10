import { useEffect, useState } from 'react';
import { useGetAddresses } from '@api/hooks/addresses/useGetAddresses';
import { useCreateAddress } from '@api/hooks/addresses/useCreateAddress';
import { useSetDefaultAddress } from '@api/hooks/addresses/useSetDefaultAddress';
import type { CreateAddressDTO, UserAddress } from '@types';

export interface UseCheckoutAddressesReturn {
  addresses: UserAddress[];
  loading: boolean;
  selectedAddressId: string | null;
  setSelectedAddressId: (addressId: string) => void;
  handleCreateAddress: (createAddressDTO: CreateAddressDTO) => Promise<void>;
  isCreating: boolean;
  handleSetDefault: (addressId: string) => Promise<void>;
  dialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useCheckoutAddresses = (): UseCheckoutAddressesReturn => {
  const { addresses, setAddresses, loading } = useGetAddresses();
  const { createAddress, isLoading: isCreating } = useCreateAddress();
  const { setDefaultAddress } = useSetDefaultAddress();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedAddressId || addresses.length === 0) {
      return;
    }

    const defaultAddress = addresses.find(address => address.isDefault);

    setSelectedAddressId((defaultAddress ?? addresses[0]).id);
  }, [addresses]);

  const handleCreateAddress = async (createAddressDTO: CreateAddressDTO): Promise<void> => {
    const previousIds = new Set(addresses.map(address => address.id));

    let updated: UserAddress[];

    try {
      updated = await createAddress(createAddressDTO);
    } catch {
      return;
    }

    setAddresses(updated);

    const created = updated.find(address => !previousIds.has(address.id));

    if (created) {
      setSelectedAddressId(created.id);
    }

    setDialogOpen(false);
  };

  const handleSetDefault = async (addressId: string): Promise<void> => {
    try {
      setAddresses(await setDefaultAddress(addressId));
    } catch {
      return;
    }
  };

  return {
    addresses,
    loading,
    selectedAddressId,
    setSelectedAddressId,
    handleCreateAddress,
    isCreating,
    handleSetDefault,
    dialogOpen,
    openDialog: () => setDialogOpen(true),
    closeDialog: () => setDialogOpen(false),
  };
};

export { useCheckoutAddresses };
