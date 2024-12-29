import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenExpiryHandler = (checkInterval = 60 * 1000) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('authToken');
      const adminId = localStorage.getItem('adminId');
      const role = localStorage.getItem('role');
      const expiryDateString = localStorage.getItem('expiryDate');

      if (!token || !adminId || !role || !expiryDateString) {
        return;
      }

      const expiryDate = new Date(expiryDateString);
      if (isNaN(expiryDate.getTime())) {
        console.error('Invalid expiry date format');
        return;
      }

      if (new Date().getTime() > expiryDate.getTime()) {
        localStorage.clear();
          navigate('/login');
      }
    };

    checkTokenExpiry(); // Immediate check on mount
    const intervalId = setInterval(checkTokenExpiry, checkInterval);
    return () => clearInterval(intervalId); // Cleanup
  }, [navigate, checkInterval]);
};

export default useTokenExpiryHandler;
