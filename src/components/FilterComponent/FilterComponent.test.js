import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import FilterComponent from './FilterComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('FilterComponent', () => {
  const mockOnFilter = jest.fn();
  const mockHandleSortChange = jest.fn();

  const filterConfigs = [
    {
      label: 'Category',
      key: 'category',
      options: [
        { label: 'Status', value: 'alive' },
        { label: 'Species', value: 'human' },
      ],
    },
  ];

  const filters = {
    category: '',
  };

  const sortConfig = {
    key: 'name',
    direction: 'asc',
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render filter options', () => {
    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <FilterComponent
          filterConfigs={filterConfigs}
          onFilter={mockOnFilter}
          filters={filters}
          handleSortChange={mockHandleSortChange}
          sortConfig={sortConfig}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('filter-control-category')).toBeInTheDocument();
  });

  it('should handle missing or invalid props', () => {
    const theme = createTheme();
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <FilterComponent
          filterConfigs={[]}
          onFilter={mockOnFilter}
          filters={filters}
          handleSortChange={mockHandleSortChange}
          sortConfig={sortConfig}
        />
      </ThemeProvider>,
    );
    expect(screen.queryByTestId('filter-container')).not.toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <FilterComponent
          filterConfigs={null}
          onFilter={mockOnFilter}
          filters={filters}
          handleSortChange={mockHandleSortChange}
          sortConfig={sortConfig}
        />
      </ThemeProvider>,
    );
    expect(screen.queryByTestId('filter-container')).not.toBeInTheDocument();
  });
});
