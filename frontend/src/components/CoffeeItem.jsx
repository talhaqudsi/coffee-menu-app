import React from 'react';
import { SignedIn } from '@clerk/clerk-react';

const CoffeeItem = ({ item, onEdit, onDelete }) => (
<li className="coffee-item">
  <h3 className='menu-item-name'>{item.name}</h3>
  <p><strong>Category:</strong> {item.category}</p>
  <p><strong>Description:</strong> {item.description}</p>
  <p><strong>Price:</strong> ${Number(item.price).toFixed(2)}</p>
  <p><strong>Calories:</strong> {Number(item.price).toFixed(0)}</p>
  <SignedIn>
      <button onClick={() => onEdit(item)}>Edit</button>
      <button onClick={() => onDelete(item._id)}>Delete</button>
  </SignedIn>
</li>
);

export default CoffeeItem;