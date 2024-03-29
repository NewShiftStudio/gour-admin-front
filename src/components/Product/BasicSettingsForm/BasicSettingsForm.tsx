import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel, Grid } from '@mui/material';

import { RadioButton } from 'components/UI/RadioButton/RadioButton';

import { ProductBasicSettingsFormDto } from 'types/dto/form/product-basic-settings.dto';

import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFTextEditor } from '../../HookForm/HFTextEditor';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFUploadPhoto } from '../../HookForm/HFUploadPhoto';
import schema from './validation';

const sx = {
  header: {
    display: 'flex',
  },
  category: {
    marginLeft: '10px',
  },
  images: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageUpload: {
    marginRight: '10px',
  },
  meta: {
    marginBottom: '10px',
  },
};

type Props = {
  defaultValues?: ProductBasicSettingsFormDto;
  isLoading?: boolean;
  productTypes: {
    value: number;
    label: string;
  }[];
  onChange: (data: ProductBasicSettingsFormDto) => void;
};

export function ProductBasicSettingsForm({ onChange, defaultValues, productTypes }: Props) {
  const values = useForm<ProductBasicSettingsFormDto>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      isIndexed: defaultValues?.isIndexed !== undefined ? defaultValues?.isIndexed : false,
    },
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const submit = (data: ProductBasicSettingsFormDto) => onChange(data);

  const change = () => onChange(values.getValues());

  const selectCategory = (newValue: string | number) => {
    values.setValue('productType', Number(newValue));
    change();
  };

  const resetField = (field: keyof ProductBasicSettingsFormDto) => {
    values.setValue(field, undefined);
    change();
  };

  useEffect(() => {
    const subscription = values.watch((_, { name }) => {
      if (name === 'description') {
        change();
      }
    });
    return () => subscription.unsubscribe();
  }, [values.watch]);

  return (
    <FormProvider {...values}>
      <form id='productPriceForm' onChange={change} onSubmit={values.handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item md={8} sx={sx.header}>
            <Grid item md>
              <HFTextField name='title' label='Название' />
            </Grid>
            <Grid item md={4}>
              <HFSelect
                sx={sx.category}
                label='Категория'
                options={productTypes}
                name='productType'
                placeholder='Категория'
                onChange={selectCategory}
              />
            </Grid>
          </Grid>
          <Grid item md={8} sx={sx.images}>
            <HFUploadPhoto
              sx={sx.imageUpload}
              id='firstImage'
              label='Фото 1'
              name='firstImage'
              onDelete={() => resetField('firstImage')}
            />
            <HFUploadPhoto
              sx={sx.imageUpload}
              id='secondImage'
              label='Фото 2'
              name='secondImage'
              onDelete={() => resetField('secondImage')}
            />
            <HFUploadPhoto id='thirdImage' label='Фото 3' name='thirdImage' onDelete={() => resetField('thirdImage')} />
          </Grid>

          <Grid item md={8}>
            <HFTextEditor name='description' label='Описание' />
          </Grid>

          <Grid item md={12} sx={sx.header}>
            <Grid item md={4} sx={{ marginRight: '10px' }}>
              <HFTextField name='moyskladId' label='ID товара в МойСклад' />
            </Grid>
            <Grid item>
              <FormLabel>Индексация</FormLabel>
              <HFRadioGroup name='isIndexed'>
                <FormControlLabel value control={<RadioButton />} label='Да' />
                <FormControlLabel value={false} control={<RadioButton />} label='Нет' />
              </HFRadioGroup>
            </Grid>
          </Grid>

          <Grid item md={8}>
            <HFTextField sx={sx.meta} name='metaTitle' label='metaTitle' />
            <HFTextField sx={sx.meta} name='metaDescription' label='metaDescription' />
            <HFTextField name='metaKeywords' label='metaKeywords' />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
