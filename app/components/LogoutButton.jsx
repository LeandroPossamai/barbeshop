import React from 'react';
import { Button } from './Button'; // Certifique-se de que o caminho esteja correto
import { useLogout } from '@/utils/auth';

const LogoutButton: React.FC = () => {
  const logout = useLogout();

  return (
    <Button
      onClick={logout}
      className="bg-red-500 hover:bg-red-700" // Adicione classes específicas se necessário
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
