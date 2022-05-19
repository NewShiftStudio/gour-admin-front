import React from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { UploadImage } from '../UI/UploadImage/UploadImage';

type Props = {
  name: string;
  defaultValue?: File;
  label?: string;
  type?: string;
  sx?: SxProps;
  id: string;
  allowedFileTypes?: ('image/jpeg' | 'image/png' | 'image/webp')[];
};

export function HFUploadPhoto({ name, defaultValue, ...props }: Props) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, onChange, ...rest } }) => (
        <UploadImage
          {...rest}
          isError={!!errors[name]}
          onChange={({ target: tg }) => onChange(tg.files?.[0])}
          helperText={errors[name]?.message ?? ''}
          {...props}
        />
      )}
    />
  );
}
