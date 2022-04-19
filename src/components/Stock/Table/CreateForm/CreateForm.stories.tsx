import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateStockForm } from './CreateForm';

export default {
  title: 'CreateStockForm',
  component: CreateStockForm,
} as ComponentMeta<typeof CreateStockForm>;

function createProduct(
  id: number,
  title: string,
  image: string,
  category: string,
  characteristics: {
    key: string;
    value: string;
  }[]
) {
  return {
    id,
    title,
    category,
    image,
    characteristics,
  };
}

const Template: ComponentStory<typeof CreateStockForm> = function (args) {
  return <CreateStockForm {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  products: [
    createProduct(
      1,
      'Какое-то мясо',
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      'meat',
      [
        {
          key: 'country',
          value: 'Russia',
        },
        {
          key: 'meatCategory',
          value: 'A',
        },
      ]
    ),
    createProduct(
      2,
      'Какой-то сыр',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
      'cheese',
      [
        {
          key: 'country',
          value: 'Sweden',
        },
        {
          key: 'milk',
          value: 'goatsMilk',
        },
      ]
    ),
    createProduct(
      3,
      'Крутой сыр (вкусный)',
      'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
      'cheese',
      [
        {
          key: 'country',
          value: 'Russia',
        },
        {
          key: 'milk',
          value: 'cowMilk',
        },
      ]
    ),
    createProduct(
      4,
      'Неплохой сыр (вроде вкусный)',
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
      'cheese',
      [
        {
          key: 'country',
          value: 'Russia',
        },
        {
          key: 'milk',
          value: 'goatsMilk',
        },
      ]
    ),
    createProduct(
      5,
      'Вкусное мясо',
      'https://images.unsplash.com/photo-1628543108325-1c27cd7246b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      'meat',
      [
        {
          key: 'country',
          value: 'Sweden',
        },
        {
          key: 'meatCategory',
          value: 'B',
        },
      ]
    ),
    createProduct(
      6,
      'Chevrano XO Козий Элитный Сыр',
      'https://images.unsplash.com/photo-1609359672052-ef0cefc88e03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
      'cheese',
      [
        {
          key: 'country',
          value: 'Spain',
        },
      ]
    ),
  ],
  categories: [
    {
      value: 'cheese',
      label: 'Сыры',
    },
    {
      value: 'meat',
      label: 'Мясо',
    },
  ],
  characteristics: [
    {
      key: 'milk',
      label: 'Молоко',
      category: 'cheese',
      values: [
        {
          key: 'goatsMilk',
          label: 'Козье молоко',
        },
        {
          key: 'cowsMilk',
          label: 'Коровье молоко',
        },
      ],
    },
    {
      key: 'cheeseCategory',
      label: 'Категория сыра',
      category: 'cheese',
      values: [
        {
          key: 'hardCheeses',
          label: 'Твердые',
        },
        {
          key: 'freshCheeses',
          label: 'Свежие',
        },
        {
          key: 'softCheeses',
          label: 'Мягкие сыры',
        },
        {
          key: 'pickledCheeses',
          label: 'Рассольные сыры',
        },
      ],
    },

    {
      key: 'meatCategory',
      label: 'Категория мяса',
      category: 'meat',
      values: [
        {
          key: 'A',
          label: 'А',
        },
        {
          key: 'B',
          label: 'Б',
        },
        {
          key: 'V',
          label: 'В',
        },
        {
          key: 'G',
          label: 'Г',
        },
      ],
    },
    {
      key: 'country',
      label: 'Страна происхождения',
      category: 'all',
      values: [
        {
          key: 'Russia',
          label: 'Россия',
        },
        {
          key: 'Spain',
          label: 'Испания',
        },
        {
          key: 'Sweden',
          label: 'Швеция',
        },
      ],
    },
  ],
};