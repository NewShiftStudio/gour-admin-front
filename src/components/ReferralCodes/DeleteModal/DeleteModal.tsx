import React from 'react';

import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';

type ModalActionsProps = {
  onDelete: () => void;
  onClose: () => void;
};

export type ReferralCodeDeleteModalProps = {
  isOpen: boolean;
  referralCode: string;
  onDelete(): void;
  onClose(): void;
};

function ModalActions({ onDelete, onClose }: ModalActionsProps) {
  return (
    <>
      <Button size="small" type="submit" onClick={onDelete} sx={{ marginRight: '10px' }}>
        Да
      </Button>

      <Button variant="outlined" size="small" onClick={onClose}>
        Нет
      </Button>
    </>
  );
}

export function ReferralCodeDeleteModal({
  isOpen,
  referralCode,
  onDelete,
  onClose,
}: ReferralCodeDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="Вы действительно хотите удалить реферальный код?"
      description={`Код: ${referralCode}`}
      actions={<ModalActions onDelete={onDelete} onClose={onClose} />}
      onClose={onClose}
    />
  );
}
