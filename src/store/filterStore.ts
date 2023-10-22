import { create } from 'zustand';
import { FilterConfig } from '@/components/FilterComponent';
import { SortConfig } from '@/components/SortingComponent';
import { persist } from 'zustand/middleware';

export type FilterStore = {
  filterConfigs: FilterConfig[];
  setFilterConfigs: (filterConfigs: FilterConfig[]) => void;
  sortConfig: SortConfig | null;
  setSortConfig: (sortConfig: SortConfig) => void;
};

export const useFilterStore = create<FilterStore>()(
  persist(
    set => ({
      filterConfigs: [
        {
          label: 'Status',
          key: 'status',
          options: [
            { value: 'alive', label: 'Alive' },
            { value: 'dead', label: 'Dead' },
            { value: 'unknown', label: 'Unknown' },
          ],
        },
        {
          label: 'Species',
          key: 'species',
          options: [
            { value: 'human', label: 'Human' },
            { value: 'alien', label: 'Alien' },
            { value: 'robot', label: 'Robot' },
            { value: 'unknown', label: 'Unknown' },
          ],
        },
        {
          label: 'Type',
          key: 'type',
          options: [],
        },
        {
          label: 'Name',
          key: 'name',
          options: [],
        },
        {
          label: 'Gender',
          key: 'gender',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'genderless', label: 'Genderless' },
            { value: 'unknown', label: 'Unknown' },
          ],
        },
      ],
      setFilterConfigs: filterConfigs => set({ filterConfigs }),
      sortConfig: null,
      setSortConfig: sortConfig => set({ sortConfig }),
    }),
    {
      name: 'filter-store',
    },
  ),
);
