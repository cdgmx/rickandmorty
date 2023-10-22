import { SortConfig } from '../SortingComponent';

export interface FilterConfig {
  label: string;
  key: string;
  options: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterProps {
  filterConfigs?: FilterConfig[];
  onFilter: (filters: Record<string, string>) => void;
  filters: Record<string, string>;
  handleSortChange: (sortConfig: SortConfig) => void;
  sortConfig: SortConfig | null;
}
