import { Tab, Tabs } from '@mui/material';
import type { CategoryNode } from '@types';
import { categoryBarStyles } from './CategoryBar.styles';

interface CategoryBarProps {
  categories: CategoryNode[];
  activeId: string | undefined;
  onChange: (id: string | undefined) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, activeId, onChange }: CategoryBarProps) => {
  const value = activeId ?? 'all';

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    onChange(newValue === 'all' ? undefined : newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      sx={categoryBarStyles.tabs}
      variant="scrollable"
      scrollButtons="auto"
      textColor="secondary"
      indicatorColor="secondary"
    >
      <Tab label="All" value="all" />
      {categories.map(cat => (
        <Tab key={cat.id} label={cat.name} value={cat.id} />
      ))}
    </Tabs>
  );
};

export { CategoryBar };
