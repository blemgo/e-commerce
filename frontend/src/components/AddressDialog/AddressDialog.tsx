import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useGetCountries } from '@api/hooks/countries/useGetCountries';
import { StyledInput } from '@/components/StyledInput';
import type { CreateAddressDTO, UserAddress } from '@types';
import { addressDialogStyles } from './AddressDialog.styles';

interface AddressDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (createAddressDTO: CreateAddressDTO) => Promise<void>;
  isLoading: boolean;
  initialAddress?: UserAddress;
}

const emptyForm = {
  addressLine1: '',
  addressLine2: '',
  streetNumber: '',
  unitNumber: '',
  city: '',
  region: '',
  postalCode: '',
  countryId: '',
  isDefault: false,
};

const fieldsSharedWithForm = (address: UserAddress): Partial<typeof emptyForm> =>
  Object.fromEntries(
    (Object.keys(emptyForm) as (keyof typeof emptyForm)[]).map(key => [
      key,
      address[key as keyof UserAddress] ?? emptyForm[key],
    ]),
  ) as Partial<typeof emptyForm>;

const toForm = (address: UserAddress): typeof emptyForm => ({
  ...emptyForm,
  ...fieldsSharedWithForm(address),
  countryId: address.country.id,
});

const optionalField = (value: string): string | undefined =>
  value.trim() ? value.trim() : undefined;

const AddressDialog: React.FC<AddressDialogProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading,
  initialAddress,
}: AddressDialogProps) => {
  const { countries, loading: countriesLoading } = useGetCountries();
  const [form, setForm] = useState(emptyForm);
  const isEdit = Boolean(initialAddress);

  useEffect(() => {
    if (open) {
      setForm(initialAddress ? toForm(initialAddress) : emptyForm);
    }
  }, [open, initialAddress]);

  const setField = (field: keyof typeof emptyForm) => (value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const isValid =
    form.addressLine1.trim().length > 0 &&
    form.city.trim().length > 0 &&
    form.countryId !== '';

  const handleSubmit = async () => {
    await onSubmit({
      addressLine1: form.addressLine1.trim(),
      addressLine2: optionalField(form.addressLine2),
      streetNumber: optionalField(form.streetNumber),
      unitNumber: optionalField(form.unitNumber),
      city: form.city.trim(),
      region: optionalField(form.region),
      postalCode: optionalField(form.postalCode),
      countryId: form.countryId,
      isDefault: form.isDefault,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit address' : 'Add a new address'}</DialogTitle>
      <DialogContent sx={addressDialogStyles.content}>
        <StyledInput
          type="text"
          placeholder="Address line 1"
          value={form.addressLine1}
          onChange={setField('addressLine1')}
        />
        <StyledInput
          type="text"
          placeholder="Address line 2"
          value={form.addressLine2}
          onChange={setField('addressLine2')}
        />
        <Box sx={addressDialogStyles.fieldRow}>
          <StyledInput
            type="text"
            placeholder="Street number"
            value={form.streetNumber}
            onChange={setField('streetNumber')}
          />
          <StyledInput
            type="text"
            placeholder="Unit number"
            value={form.unitNumber}
            onChange={setField('unitNumber')}
          />
        </Box>
        <Box sx={addressDialogStyles.fieldRow}>
          <StyledInput
            type="text"
            placeholder="City"
            value={form.city}
            onChange={setField('city')}
          />
          <StyledInput
            type="text"
            placeholder="Region"
            value={form.region}
            onChange={setField('region')}
          />
        </Box>
        <Box sx={addressDialogStyles.fieldRow}>
          <StyledInput
            type="text"
            placeholder="Postal code"
            value={form.postalCode}
            onChange={setField('postalCode')}
          />
          <FormControl fullWidth size="small">
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              value={form.countryId}
              onChange={event => setField('countryId')(event.target.value)}
              disabled={countriesLoading}
            >
              {countries.map(country => (
                <MenuItem key={country.id} value={country.id}>
                  {country.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {!isEdit && (
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isDefault}
                onChange={event => setField('isDefault')(event.target.checked)}
                size="small"
              />
            }
            label="Set as default"
          />
        )}
      </DialogContent>
      <DialogActions sx={addressDialogStyles.actions}>
        <Button onClick={onClose} disableRipple>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          disableElevation
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddressDialog };
