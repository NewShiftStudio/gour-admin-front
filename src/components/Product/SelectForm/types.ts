import { SxProps } from '@mui/material';

import { TopLevelCategory } from 'types/entities/Category';

export type Product = {
  id: number;
  title: string;
  image: string;
  categories: TopLevelCategory[];
};

export type ProductSelectFormProps = {
  selected?: number[];
  categories: TopLevelCategory[];
  products: Product[];
  isLoading?: boolean;
  sx?: SxProps;
  onChange(selected: number[]): void;
};

export type TabsKeys = 'all' | 'selected' | number;
