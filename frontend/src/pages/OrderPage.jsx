import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CoffeeMenu from '../components/CoffeeMenu';
import ProductForm from '../components/ProductForm';

const OrderPage = () => {
  const [menu, setMenu] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const port = 5001
  const formRef = useRef(null);

  const fetchMenu = async () => {
    const res = await axios.get('http://localhost:5001/api/menu');
    setMenu(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAddOrUpdate = async (item) => {
    try {
      if (item.id) {
        console.log("PUT request to:", `http://localhost:5001/api/menu/${item.id}`);
        await axios.put(`http://localhost:5001/api/menu/${item.id}`, item);
      } else {
        console.log("POST request to: http://localhost:5001/api/menu");
        await axios.post('http://localhost:5001/api/menu', item);
      }
      setEditingItem(null);
      fetchMenu();
    } catch (err) {
      console.error("Failed to add or update:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/menu/${id}`);
      fetchMenu();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div>
        <h2 className="center-title">Our Cozy Coffee Menu</h2>      
        <ProductForm
        ref={formRef}
        onSubmit={handleAddOrUpdate}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />
      <CoffeeMenu
        items={menu}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrderPage;