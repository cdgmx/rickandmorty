import { useState } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { boxStyles } from './SortingComponent.styles';
import { SortConfig } from './SortingComponent.types';

interface SortingProps {
  onSortChange: (value: SortConfig) => void;
  filterKey: string;
  sortConfig: SortConfig | null;
}

const SortingComponent: React.FC<SortingProps> = ({
  onSortChange,
  filterKey,
  sortConfig,
}) => {
  const [sortDirection, setSortDirection] = useState<
    'ascending' | 'descending'
  >(sortConfig?.direction || 'ascending');

  const toggleSortDirection = () => {
    const newDirection =
      sortDirection === 'ascending' ? 'descending' : 'ascending';
    setSortDirection(newDirection);
    onSortChange({
      key: filterKey,
      direction: newDirection,
    });
  };

  return (
    <Box sx={boxStyles} data-testid="sort-box">
      <IconButton
        size="small"
        onClick={toggleSortDirection}
        data-testid="toggle-button"
      >
        {sortDirection === 'ascending' ? (
          <ArrowUpwardIcon data-testid="arrow-up-icon" />
        ) : (
          <ArrowDownwardIcon data-testid="arrow-down-icon" />
        )}
      </IconButton>
    </Box>
  );
};

export default SortingComponent;
