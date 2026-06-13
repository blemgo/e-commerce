import { useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { CategoryNode } from "@types";
import { categorySelectStyles } from "./CategorySelect.styles";

interface CategorySelectProps {
  categories: CategoryNode[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

interface CategoryOption {
  id: string;
  name: string;
  path: string[];
}

const flattenWithPath = (nodes: CategoryNode[], ancestors: string[] = []): CategoryOption[] =>
  nodes.flatMap(node => [
    { id: node.id, name: node.name, path: ancestors },
    ...flattenWithPath(node.children, [...ancestors, node.name]),
  ]);

const formatPath = (option: CategoryOption): string =>
  [...option.path, option.name].join(" › ");

const CategorySelect : React.FC<CategorySelectProps> = ({ categories, selectedIds, onChange }) => {
  const options = useMemo(() => flattenWithPath(categories), [categories]);

  const value = useMemo(
    () => options.filter(option => selectedIds.includes(option.id)),
    [options, selectedIds],
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      value={value}
      onChange={(_, selected) => onChange(selected.map(option => option.id))}
      getOptionLabel={formatPath}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Box component="li" key={key} {...optionProps}>
            <Box sx={categorySelectStyles.option}>
              <Typography sx={categorySelectStyles.optionName}>{option.name}</Typography>
              {option.path.length > 0 && (
                <Typography sx={categorySelectStyles.optionPath}>
                  {option.path.join(" › ")}
                </Typography>
              )}
            </Box>
          </Box>
        );
      }}
      renderValue={(selected, getItemProps) =>
        selected.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });

          return <Chip key={key} {...itemProps} label={formatPath(option)} size="small" />;
        })
      }
      renderInput={params => (
        <TextField {...params} placeholder={value.length ? "" : "Select categories"} />
      )}
    />
  );
};

export { CategorySelect };
