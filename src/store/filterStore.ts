import { create } from 'zustand';
import { FilterConfig } from '@/components/FilterComponent';

export type FilterStore = {
  filterConfigs: FilterConfig[];
  setFilterConfigs: (filterConfigs: FilterConfig[]) => void;
};

export const useFilterStore = create<FilterStore>(set => ({
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
}));
