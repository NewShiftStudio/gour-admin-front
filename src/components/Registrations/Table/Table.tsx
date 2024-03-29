import React, { useState } from 'react';

import { Options } from 'constants/tabs';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Table } from 'components/UI/Table/Table';
import { Typography } from 'components/UI/Typography/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import checkIcon from 'assets/icons/table/check.svg';

const sx = {
  role: {
    width: 'fit-content',
    padding: '0px 12px',
    fontSize: '12px',
    fontWeight: 400,
    background: 'rgba(0, 0, 0, 0.12)',
    borderRadius: '10px',
  },
};

const tabsOptions = [
  {
    value: Options.NOT_APPROVED,
    label: 'Ждут подтверждения',
  },
  {
    value: Options.APPROVED,
    label: 'Подтверждены',
  },
];

export type Client = {
  id: number;
  name: string;
  phone: string;
  role: string;
  isApproved: boolean;
};

export type RegistrationsTableProps = {
  clients: Client[];
  onAccept: (id: number) => void;
  onDelete: (id: number) => void;
};

export function RegistrationsTable({ clients, onAccept, onDelete }: RegistrationsTableProps) {
  const [tabValue, setTabValue] = useState<string>(Options.NOT_APPROVED);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isApproved = tabValue !== Options.NOT_APPROVED;
  const titleList = ['Имя Фамилия', 'Телефон', 'Роль', 'Действие'];

  const changeTab = (val: string) => setTabValue(val);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = clients
    .filter(client => client.isApproved === isApproved)
    .map((client, i) => ({
      id: i,
      cells: [
        client.name,
        client.phone,
        <Typography sx={sx.role}>{client.role}</Typography>,
        <>
          <IconButton component='button' onClick={() => onDelete(client.id)}>
            <DeleteIcon />
          </IconButton>
          {!isApproved && (
            <IconButton component='button' onClick={() => onAccept(client.id)}>
              <img src={checkIcon} alt='' />
            </IconButton>
          )}
        </>,
      ],
    }));

  const tabs = {
    value: tabValue,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Box>
      <Table
        tabs={tabs}
        rowTitleList={titleList}
        rows={rows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={changePage}
        onRowsPerPageChange={changeRowsPerPage}
      />
    </Box>
  );
}
