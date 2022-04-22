import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FormControlLabel, FormLabel, Radio, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { HFTextField } from '../../HookForm/HFTextField';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFTextarea } from '../../HookForm/HFTextarea';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { HFUploadPhoto } from '../../HookForm/HFUploadPhoto';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import schema from './validation';

const sx = {
  input: {
    marginTop: '10px',
  },
  radioGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  radios: {
    marginLeft: '30px',
  },
};

type Props = {
  categories: {
    value: string;
    label: string;
  }[],
  defaultValues?: ProductBasicSettingsFormDto;
  onSubmit: SubmitHandler<ProductBasicSettingsFormDto>;
};

export function ProductBasicSettingsForm({ categories, defaultValues, onSubmit }: Props) {
  const values = useForm<ProductBasicSettingsFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      ...defaultValues,
      isIndexed: defaultValues?.isIndexed ?? true,
    },
  });

  const submit = (data: ProductBasicSettingsFormDto) => onSubmit(data);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <HFTextField name="title" label="Название" sx={sx.input} />
          </Grid>

          <Grid item xs={4}>
            <HFSelect
              options={categories}
              name="category"
              placeholder="Выберите категорию"
            />
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={4}>
              <HFUploadPhoto
                id="firstImage"
                name="firstImage"
                label="Фото 1"
                allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              />
            </Grid>
            <Grid item xs={4}>
              <HFUploadPhoto
                id="secondImage"
                name="secondImage"
                label="Фото 2"
                allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              />
            </Grid>
            <Grid item xs={4}>
              <HFUploadPhoto
                id="thirdImage"
                name="thirdImage"
                label="Фото 3"
                allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              />
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <HFTextarea
              name="description"
              placeholder="Введите описание"
            />
          </Grid>

          <Grid item xs={12} sx={sx.radioGroup}>
            <FormLabel>Индексация</FormLabel>
            <HFRadioGroup name="isIndexed" sx={sx.radios}>
              <FormControlLabel value control={<Radio />} label="Да" />
              <FormControlLabel value={false} control={<Radio />} label="Нет" />
            </HFRadioGroup>
          </Grid>

          <Grid container item xs={4}>
            {
              ['metaTitle', 'metaDescription', 'metaKeywords'].map(field => (
                <Grid key={field} item xs={12}>
                  <HFTextField name={field} label={field} sx={sx.input} />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
