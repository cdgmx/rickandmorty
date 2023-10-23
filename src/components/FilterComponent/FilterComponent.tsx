import React, { useState, useCallback } from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  ButtonGroup,
  Grid,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { FilterProps } from './FilterComponent.types';
import SortingComponent from '../SortingComponent';
import {
  paperStyles,
  formControlStyles,
  buttonStyles,
  selectStyles,
} from './FilterComponent.styles';
import { useResponsiveButtonSize } from '@/hooks/responsive';

const EMPTY_STRING = '';

/**
 * FilterComponent - A filter UI component.
 * @param {FilterProps} props - The properties for FilterComponent.
 */
const FilterComponent: React.FC<FilterProps> = ({
  filterConfigs = [],
  onFilter,
  filters,
  handleSortChange,
  sortConfig,
}: FilterProps) => {
  const [filterState, setFilterState] =
    useState<Record<string, string>>(filters);

  const buttonSize = useResponsiveButtonSize();

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilterState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const handleFilter = useCallback(() => {
    onFilter(filterState);
  }, [onFilter, filterState]);

  const clearFilters = useCallback(() => {
    // Reset the filter state to its initial state
    setFilterState({});
    // Call the onFilter function to update the parent component's state
    onFilter({});
  }, [onFilter, filters]);

  // Handle missing or invalid props
  if (!filterConfigs || filterConfigs.length === 0) {
    return null;
  }

  return (
    <Paper style={paperStyles} data-testid="filter-container">
      <Grid
        container
        sx={{ gap: 1, display: 'flex', justifyContent: 'center' }}
      >
        {filterConfigs.map(config => {
          const { label, key, options } = config;

          if (!label || !Array.isArray(options) || options.length === 0) {
            return null;
          }

          return (
            <FormControl
              key={key}
              sx={formControlStyles}
              data-testid={`filter-control-${key}`}
              size={'small'}
            >
              <InputLabel data-testid={`filter-label-${key}`}>
                {label}
              </InputLabel>
              <Select
                value={filterState[key] ?? EMPTY_STRING}
                onChange={e =>
                  handleFilterChange(key, e.target.value as string)
                }
                autoWidth
                label={label}
                sx={selectStyles}
                data-testid={`filter-select-${key}`}
              >
                {options.map(option => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    data-testid={`filter-option-${option.value}`}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {!filterState[key] ? (
                <SortingComponent
                  onSortChange={handleSortChange}
                  filterKey={key}
                  sortConfig={sortConfig}
                  data-testid={`sorting-component-${key}`}
                />
              ) : null}
            </FormControl>
          );
        })}

        <ButtonGroup
          sx={{
            display: 'flex',

            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Button
            size={buttonSize}
            sx={buttonStyles}
            variant="contained"
            color="primary"
            onClick={handleFilter}
            data-testid="filter-button"
          >
            Filter
          </Button>
          <Button
            size={buttonSize}
            sx={buttonStyles}
            variant="outlined"
            color="warning"
            onClick={clearFilters}
            data-testid="clear-filter-button"
          >
            Clear
          </Button>
        </ButtonGroup>
      </Grid>
    </Paper>
  );
};

export default React.memo(FilterComponent);
