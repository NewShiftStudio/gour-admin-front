import React from 'react';

import { Button } from 'components/UI/Button/Button';
import { Modal } from 'components/UI/Modal/Modal';

import type { MidLevelCategory } from 'types/entities/Category';

import { CreateOrEditCategoryForm } from '../CreateOrEditForm/CreateOrEditForm';
import { CategoryHasDiscount, CreateFormType } from '../CreateOrEditForm/types';
import { getSubCategoriesObject } from '../categories.helper';

export type CreateModalProps = {
  isOpen: boolean;
  currentCategory?: MidLevelCategory;
  onSubmit: (category: CreateFormType) => void;
  onDeleteSubCategory: (id: number) => void;
  onClose: () => void;
};

type ModalActionsProps = {
  onCancel: () => void;
};

function ModalActions({ onCancel }: ModalActionsProps) {
  return (
    <>
      <Button form='createCategoryForm' type='submit' size='small' sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant='outlined' size='small' onClick={onCancel}>
        Отменить
      </Button>
    </>
  );
}

export function CreateOrEditModalCategoryModal({
  isOpen,
  currentCategory,
  onSubmit,
  onClose,
  onDeleteSubCategory,
}: CreateModalProps) {
  const modalTitle = currentCategory ? 'Редактирование категории товара' : 'Добавление категории товара';

  const defaultValues: CreateFormType = {
    title: currentCategory?.title.ru || '',
    hasDiscount: currentCategory?.hasDiscount ? CategoryHasDiscount.YES : CategoryHasDiscount.NO,
    subCategories: getSubCategoriesObject(currentCategory?.subCategories || []) || {},
  };

  return (
    <Modal isOpen={isOpen} title={modalTitle} actions={<ModalActions onCancel={onClose} />} onClose={onClose}>
      <CreateOrEditCategoryForm
        onSave={onSubmit}
        onDeleteSubCategory={onDeleteSubCategory}
        defaultValues={defaultValues}
      />
    </Modal>
  );
}
