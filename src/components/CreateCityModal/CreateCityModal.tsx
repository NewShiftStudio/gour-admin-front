import React from 'react';

import { Box } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '../UI/Typography/Typography';
import { TextField } from '../UI/TextField/TextField';
import { Button } from '../UI/Button/Button';
import { CreateCityDto } from '../../@types/dto/create-city.dto';
import schema from './validation';
import { HFTextField } from '../HookForm/HFTextField';

type Props = {
  engName: string;
  rusName: string;
  onSave: SubmitHandler<CreateCityDto>;
  onCancel: () => void;
};

export function CreateCityModal({ engName, rusName, onSave, onCancel }: Props) {
  const values = useForm<CreateCityDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      rusName,
      engName,
    },
  });

  const submitHandler = (data: CreateCityDto) => {
    onSave(data);
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={{ maxWidth: '690px' }}>
          <Typography variant="h6">Добавление города</Typography>
          <HFTextField sx={{ margin: '10px 0' }} label="Название (Рус)" name="rusName" />
          <HFTextField label="Название (Eng)" name="engName" />
          <Box sx={{ margin: '25px 0 0 0' }}>
            <Button type="submit" sx={{ margin: '0 10px 0 0' }}>
              Сохранить
            </Button>
            <Button variant="outlined">Отменить</Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
