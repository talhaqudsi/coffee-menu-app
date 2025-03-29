import React from 'react';
import CoffeeItem from './CoffeeItem';

const CoffeeMenu = ({ items, onEdit, onDelete }) => (
  <ul className="coffee-menu">
    {items.map(item => (
      <CoffeeItem
        key={item.id}
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

export default CoffeeMenu;