import React, { useState } from 'react';

import { IconButton } from 'components/UI/IconButton/IconButton';
import { Table } from 'components/UI/Table/Table';

import { ReferralCode } from 'types/entities/ReferralCode';

import TrashIcon from '@mui/icons-material/DeleteForever';

export type ReferralCodeTableProps = {
  codes: ReferralCode[];
  onRemove(code: ReferralCode): void;
};

export function ReferralCodeTable({ codes, onRemove }: ReferralCodeTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = codes.map((code, i) => ({
    id: i,
    cells: [
      code.code,
      <IconButton component='button' onClick={() => onRemove(code)}>
        <TrashIcon />
      </IconButton>,
    ],
  }));

  return (
    <Table
      rowTitleList={['Реферальный код', 'Действие']}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={changeRowsPerPage}
      onPageChange={changePage}
    />
  );
}
