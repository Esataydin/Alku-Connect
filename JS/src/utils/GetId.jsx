// utils/GetId.js
import { useState, useEffect } from 'react';
import { USER_ID } from '../constants';
import { getUserData } from '@/app/api/ApiService';

export const GetId = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem(USER_ID); // USER_ID'yi localStorage'dan al
      if (userId) {
        const response = await getUserData(userId); // Veriyi al
        if (response) {
          setId(userId); // Veriyi state'e set et
        }
      }
    };

    fetchData(); // Veriyi al
  }, []);

  return id; // id'yi döndür
};
