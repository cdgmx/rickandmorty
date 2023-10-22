import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SortingComponent from './SortingComponent';

describe('SortingComponent', () => {
  let mockOnSortChange;
  const filterKey = 'testKey';
  const initialSortConfig = { key: filterKey, direction: 'ascending' };

  beforeEach(() => {
    mockOnSortChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with initial ascending direction', () => {
    render(
      <SortingComponent
        onSortChange={mockOnSortChange}
        filterKey={filterKey}
        sortConfig={initialSortConfig}
      />,
    );

    expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
  });

  it('should toggle to descending when clicked', () => {
    render(
      <SortingComponent
        onSortChange={mockOnSortChange}
        filterKey={filterKey}
        sortConfig={initialSortConfig}
      />,
    );

    fireEvent.click(screen.getByTestId('toggle-button'));

    expect(mockOnSortChange).toHaveBeenCalledWith({
      key: filterKey,
      direction: 'descending',
    });
  });

  it('should toggle to ascending when initially descending', () => {
    const initialDescendingConfig = { key: filterKey, direction: 'descending' };
    render(
      <SortingComponent
        onSortChange={mockOnSortChange}
        filterKey={filterKey}
        sortConfig={initialDescendingConfig}
      />,
    );

    fireEvent.click(screen.getByTestId('toggle-button'));

    expect(mockOnSortChange).toHaveBeenCalledWith({
      key: filterKey,
      direction: 'ascending',
    });
  });

  it('should handle null sortConfig gracefully', () => {
    render(
      <SortingComponent
        onSortChange={mockOnSortChange}
        filterKey={filterKey}
        sortConfig={null}
      />,
    );

    expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
  });
});
