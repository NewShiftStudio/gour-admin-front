import React, { useState } from 'react';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Table } from 'components/UI/Table/Table';

import { ProductTableDto } from 'types/dto/table/products.dto';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Path } from '../../../constants/routes';
import { Link } from '../../UI/Link/Link';
import { TabsKeys } from '../SelectForm/types';

const titleList = ['Фото', 'Название', 'Цена', 'Действие'];

export type ProductsTableProps = {
  products: ProductTableDto[];
  categories: {
    label: string;
    id: number;
  }[];
  page: number;
  rowsCount: number;
  onChangePage: (_: unknown, newPage: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (rowPerPage: number) => void;
  onRemove(product: ProductTableDto): void;
};

export function ProductsTable({
  products,
  categories,
  page,
  rowsCount,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onRemove,
}: ProductsTableProps) {
  const [selectedId, setSelectedId] = useState<TabsKeys>('all');

  const tabsOptions = [
    {
      value: 'all',
      label: 'Всё',
    } as const,
    ...categories.map(category => ({
      value: category.id,
      label: category.label,
    })),
  ];

  const changeTab = (id: TabsKeys) => setSelectedId(id);

  const rows = products
    .filter(product => product.categoriesIds.includes(+selectedId) || selectedId === 'all')
    .map(product => ({
      id: product.id,
      cells: [
        <Box sx={{ maxWidth: '144px', height: '60px', overflow: 'hidden' }}>
          <Link href={`/${Path.PRODUCTS}/${product.id}`}>
            <img style={{ height: '100%' }} src={product.image} alt='product' />
          </Link>
        </Box>,
        product.title,
        `${product.price} ₽`,
        <Box>
          <IconButton href={`/${Path.PRODUCTS}/${product.id}`} component={Link}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onRemove(product)}>
            <DeleteIcon />
          </IconButton>
        </Box>,
      ],
    }));

  const tabs = {
    value: selectedId,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Table
      tabs={tabs}
      rowTitleList={titleList}
      rows={rows}
      rowsPerPage={rowsPerPage}
      page={page}
      rowsCount={rowsCount}
      rowsPerPageOptions={[5, 10, 25]}
      onPageChange={onChangePage}
      onRowsPerPageChange={event => onChangeRowsPerPage(+event.target.value)}
    />
  );
}
