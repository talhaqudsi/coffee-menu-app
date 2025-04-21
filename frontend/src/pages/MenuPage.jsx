import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CoffeeMenu from '../components/CoffeeMenu';
import ProductForm from '../components/ProductForm';
import { SignedIn, useAuth } from '@clerk/clerk-react';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const formRef = useRef(null);
  const { getToken } = useAuth();

  const fetchMenu = async () => {
    const res = await axios.get('http://localhost:5001/api/menu');
    setMenu(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAddOrUpdate = async (item) => {
    try {
      const token = await getToken();

      if (item._id) {
        // console.log("PUT request to:", `http://localhost:5001/api/menu/${item._id}`);
        await axios.put(
          `http://localhost:5001/api/menu/${item._id}`,
          item,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // console.log("POST request to: http://localhost:5001/api/menu");
        await axios.post(
          'http://localhost:5001/api/menu',
          item,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setEditingItem(null);
      fetchMenu();
    } catch (err) {
      console.error("Failed to add or update:", err);
    }
  };

  const handleDelete = async (id) => {
    // console.log("Delete request to:", `http://localhost:5001/api/menu/${id}`);
    try {
      const token = await getToken();

      await axios.delete(
        `http://localhost:5001/api/menu/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

      <SignedIn>
        <ProductForm
          ref={formRef}
          onSubmit={handleAddOrUpdate}
          editingItem={editingItem}
          onCancel={() => setEditingItem(null)}
        />
      </SignedIn>

      <CoffeeMenu
        items={menu}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MenuPage;