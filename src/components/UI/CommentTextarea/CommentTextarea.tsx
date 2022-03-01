import React, { ChangeEventHandler, CSSProperties, FocusEventHandler } from 'react';
import { Box } from '@mui/material';
import Send from '@mui/icons-material/Send';
import { IconButton } from '../IconButton/IconButton';
import { Textarea } from '../Textarea/Textarea';

type Props = {
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  style?: CSSProperties;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onClick: () => void;
};

export function CommentTextarea({
  minRows,
  maxRows,
  placeholder,
  style,
  defaultValue,
  buttonVariant,
  onClick,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  const boxSx: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '10px',
  };

  return (
    <Box sx={boxSx}>
      <Textarea
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        minRows={minRows}
        maxRows={maxRows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        sx={style}
      />
      <IconButton
        onClick={onClick}
        size="large"
        type="button"
        disabled={false}
        color="default"
        component="span"
      >
        <Send />
      </IconButton>
    </Box>
  );
}