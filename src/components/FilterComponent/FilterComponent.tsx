import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import { FilterProps, FilterConfig } from './FilterComponent.types';

const EMPTY_STRING = '';
const MIN_FORM_CONTROL_WIDTH = 120;
const MARGIN_RIGHT = 1;

/**
 * FilterComponent - A filter UI component.
 * @param {FilterProps} props - The properties for FilterComponent.
 */
const FilterComponent: React.FC<FilterProps> = ({
  filterConfigs = [],
  onFilter,
  filters,
}) => {
  const [filterState, setFilterState] =
    useState<Record<string, string>>(filters);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilterState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const handleFilter = useCallback(() => {
    onFilter(filterState);
  }, [onFilter, filterState]);

  // Handle missing or invalid props
  if (!filterConfigs || filterConfigs.length === 0) {
    return null;
  }

  return (
    <Paper style={{ padding: '16px', marginBottom: '16px' }}>
      {filterConfigs.map(config => {
        const { label, key, options } = config;

        if (!label || !Array.isArray(options) || options.length === 0) {
          return null;
        }

        return (
          <FormControl
            key={key}
            sx={{ minWidth: MIN_FORM_CONTROL_WIDTH, marginRight: MARGIN_RIGHT }}
          >
            <InputLabel>{label}</InputLabel>
            <Select
              value={filterState[key] ?? EMPTY_STRING}
              onChange={e => handleFilterChange(key, e.target.value as string)}
              autoWidth
              label={label}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
      <Button variant="contained" color="primary" onClick={handleFilter}>
        Filter
      </Button>
    </Paper>
  );
};

export default React.memo(FilterComponent);
