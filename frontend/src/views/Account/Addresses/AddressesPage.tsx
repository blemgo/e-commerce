import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { LoadingScreen } from '@components/LoadingScreen';
import { AddressDialog } from '@components/AddressDialog';
import { AddressCard } from './Components/AddressCard';
import { useAddressBook } from './hooks/useAddressBook';
import type { CreateAddressDTO, UserAddress } from '@types';
import { addressesPageStyles } from './AddressesPage.styles';

const AddressesPage: React.FC = () => {
  const { addresses, loading, isSubmitting, create, update, setDefault, remove } =
    useAddressBook();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);

  const openCreate = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };

  const openEdit = (address: UserAddress) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleSubmit = async (dto: CreateAddressDTO): Promise<void> => {
    const ok = editingAddress ? await update(editingAddress.id, dto) : await create(dto);

    if (ok) {
      setDialogOpen(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={addressesPageStyles.container}>
      <Box sx={addressesPageStyles.header}>
        <Typography variant="h4" sx={addressesPageStyles.title}>
          Addresses
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
          sx={addressesPageStyles.addButton}
          disableElevation
        >
          Add address
        </Button>
      </Box>

      {addresses.length === 0 ? (
        <Typography sx={addressesPageStyles.empty}>
          You have no saved addresses.
        </Typography>
      ) : (
        <Box sx={addressesPageStyles.grid}>
          {addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => openEdit(address)}
              onSetDefault={() => setDefault(address.id)}
              onRemove={() => remove(address.id)}
            />
          ))}
        </Box>
      )}

      <AddressDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        initialAddress={editingAddress ?? undefined}
      />
    </Box>
  );
};

export { AddressesPage };
