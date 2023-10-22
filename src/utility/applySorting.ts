import { Character } from '@/types';
import { SortConfig } from '@/components/SortingComponent';

/**
 * Utility function to apply filters and sorting
 * @param data - The original list of characters
 * @param sortConfig - The sorting configuration object
 * @returns - The filtered and sorted list
 */
const applySorting = (
  data: Character[],
  sortConfig: SortConfig | null,
): Character[] => {
  const filteredData = [...data];
  // Apply Sorting
  if (sortConfig) {
    const { key, direction } = sortConfig;
    filteredData.sort((a: any, b: any) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }

  return filteredData;
};

export default applySorting;
