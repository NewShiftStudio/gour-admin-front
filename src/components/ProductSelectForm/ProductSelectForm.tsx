import React, { useEffect, useState } from 'react';

import { Grid, Stack } from '@mui/material';
import { Typography } from '../UI/Typography/Typography';
import { TextField } from '../UI/TextField/TextField';
import { ProductSelectList } from './CardsList';
import { SelectsList } from './SelectsList';
import { Tabs } from '../Tabs/Tabs';
import { isProductSelected, filterByAllParams } from './productSelectHelper';
import { ProgressLinear } from '../UI/ProgressLinear/ProgressLinear';
import { characteristics } from './productSelectConstants';

export type Product = {
  id: number;
  title: string;
  image: string;
  category: string;
  characteristics: {
    key: string;
    value: string;
  }[];
};

export type Characteristic = {
  key: string;
  label: string;
  category: string;
  values: {
    key: string;
    label: string;
  }[];
};

export type ProductSelectFormProps = {
  selected: number[];
  categories: {
    value: string;
    label: string;
  }[];
  products: Product[];
  onChange(selected: number[]): void;
  isLoading?: boolean;
};

const TAB_ALL = {
  id: 'all',
  label: 'Все',
};

const TAB_SELECTED = {
  id: 'selected',
  label: 'Выбранные товары',
};

const defaultTabs = [TAB_ALL, TAB_SELECTED];

export function ProductSelectForm({
  products,
  categories,
  selected,
  onChange,
  isLoading,
}: ProductSelectFormProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(selected);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTabKey, setSelectedTabKey] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectValues, setSelectValues] = useState<Record<string, string | undefined>>(
    {}
  );

  const tabOptions = [
    ...defaultTabs,
    ...categories.map(category => ({
      id: category.value,
      label: category.label,
    })),
  ];

  useEffect(() => {
    onChange(selectedProductIds);
  }, [selectedProductIds]);

  const handleProductClick = (productId: number) => {
    if (isProductSelected(productId, selectedProductIds)) {
      const newSelectedProductsList = selectedProductIds.filter(id => id !== productId);
      return setSelectedProductIds(newSelectedProductsList);
    }
    return setSelectedProductIds(prevList => [...prevList, productId]);
  };
  const handleChangeTab = (tabKey: string) => {
    setSelectedTabKey(tabKey);
    setSelectValues({});
  };

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    setFilteredProducts(
      filterByAllParams(products, query, selectValues, selectedTabKey, selectedProductIds)
    );
  }, [products, searchQuery, selectedTabKey, selectValues]);

  const filteredCharacteristics = characteristics.filter(
    characteristic => characteristic.category === selectedTabKey || characteristic.category === 'all'
  );

  if (isLoading) {
    return <ProgressLinear variant="query" />;
  }

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            label="Поиск"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
            Количество добавленных товаров:
            {' '}
            {selectedProductIds.length}
          </Typography>
        </Grid>
      </Grid>

      <Tabs selectedId={selectedTabKey} options={tabOptions} onChange={handleChangeTab} />
      <SelectsList
        characteristics={filteredCharacteristics}
        selectValues={selectValues}
        setSelectValues={setSelectValues}
      />
      <ProductSelectList
        products={filteredProducts}
        searchQuery={searchQuery}
        checkProductSelect={(id: number) => isProductSelected(id, selectedProductIds)}
        onClickProduct={handleProductClick}
      />
    </Stack>
  );
}