import React, { useState, useEffect, forwardRef } from 'react';

const ProductForm = forwardRef(({ onSubmit, editingItem, onCancel }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanData = {
      ...formData,
      price: parseFloat(formData.price),
    };
    onSubmit(cleanData);
    setFormData({ name: '', price: '', description: '', category: '', calories: '' });
  };

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <h3 className="cozy-subtitle">{editingItem ? "Edit Product" : "Add New Product"}</h3>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="calories" placeholder="Calories" value={formData.calories} onChange={handleChange} required />
      <button type="submit">{editingItem ? "Update" : "Add"}</button>
      {editingItem && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
});

export default ProductForm;