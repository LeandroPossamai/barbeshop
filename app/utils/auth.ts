import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  async function logout() {
    try {
      // Opcionalmente, faça uma requisição ao back-end para registrar o logout
      await fetch('/api/logout', {
        method: 'POST',
      });

      // Remove o token do localStorage
      localStorage.removeItem('token');

      // Redirecione o usuário para a página de login ou inicial
      router.push('/login');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }

  return logout;
}
