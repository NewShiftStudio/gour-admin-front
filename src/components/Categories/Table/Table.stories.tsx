import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CategoriesTable } from './Table';

export default {
  title: 'Categories/Table',
  component: CategoriesTable,
} as ComponentMeta<typeof CategoriesTable>;

const Template: ComponentStory<typeof CategoriesTable> = function (args) {
  return <CategoriesTable {...args} />;
};

function generateCategories(id: number, engName: string, rusName: string) {
  return {
    engName,
    rusName,
    id,
  };
}

export const DefaultState = Template.bind({});
DefaultState.args = {
  categories: [
    generateCategories(1, 'Большой сыр', 'Big Cheese'),
    generateCategories(2, 'Маленький сыр', 'Small Cheese'),
    generateCategories(3, 'Сыр', 'Cheese'),
    generateCategories(4, 'Сыр с плесенью', 'Cheese with plesen`'),
    generateCategories(5, 'Большой сыр', 'Big Cheese'),
    generateCategories(6, 'Большой сыр', 'Big Cheese'),
    generateCategories(7, 'Большой сыр', 'Big Cheese'),
  ],
};