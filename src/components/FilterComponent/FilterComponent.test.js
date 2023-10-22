import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterComponent from './FilterComponent';

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
    render(
      <FilterComponent
        filterConfigs={filterConfigs}
        onFilter={mockOnFilter}
        filters={filters}
        handleSortChange={mockHandleSortChange}
        sortConfig={sortConfig}
      />,
    );
    expect(screen.getByTestId('filter-control-category')).toBeInTheDocument();
  });

  it('should handle missing or invalid props', () => {
    const { rerender } = render(
      <FilterComponent
        filterConfigs={[]}
        onFilter={mockOnFilter}
        filters={filters}
        handleSortChange={mockHandleSortChange}
        sortConfig={sortConfig}
      />,
    );
    expect(screen.queryByTestId('filter-container')).not.toBeInTheDocument();

    rerender(
      <FilterComponent
        filterConfigs={null}
        onFilter={mockOnFilter}
        filters={filters}
        handleSortChange={mockHandleSortChange}
        sortConfig={sortConfig}
      />,
    );
    expect(screen.queryByTestId('filter-container')).not.toBeInTheDocument();
  });
});
