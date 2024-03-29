import React, { ReactNode } from 'react';

import { SxProps } from '@mui/material';
import MUITypography, { TypographyProps } from '@mui/material/Typography';

type Props = {
  variant?: TypographyProps['variant'];
  children: ReactNode;
  color?: string;
  sx?: SxProps;
  onClick?: () => void;
};

export function Typography({ variant = 'body1', children, color, sx, onClick }: Props) {
  return (
    <MUITypography sx={sx} variant={variant} color={color} onClick={onClick}>
      {children}
    </MUITypography>
  );
}
