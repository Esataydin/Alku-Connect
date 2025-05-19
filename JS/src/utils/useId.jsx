import { useState, useEffect } from 'react';
import { USER_ID } from '@/constants'; // USER_ID sabitin doğru dosyada olduğundan emin ol
import { getUserData } from '@/app/api/ApiService';

export const useId = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = localStorage.getItem(USER_ID);
      console.log('localStorage userId:', userId);
      if (!userId) return;

      try {
        const response = await getUserData(userId);
        console.log('getUserData response:', response);
        if (response) setId(userId);
      } catch (error) {
        console.error('Error fetching user data in useId:', error);
      }
    };

    fetchUserId();
  }, []);

  return id;
};
