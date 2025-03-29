import React from 'react';

const CoffeeItem = ({ item, onEdit, onDelete }) => (
<li className="coffee-item">
  <h3 className='menu-item-name'>{item.name}</h3>
  <p><strong>Category:</strong> {item.category}</p>
  <p><strong>Description:</strong> {item.description}</p>
  <p><strong>Price:</strong> ${Number(item.price).toFixed(2)}</p>
  <button onClick={() => onEdit(item)}>Edit</button>
  <button onClick={() => onDelete(item.id)}>Delete</button>
</li>
);

export default CoffeeItem;