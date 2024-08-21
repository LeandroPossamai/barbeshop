import React from 'react'

import { useUser } from '@/providers/user-provider'

import { Button } from './Button' // Certifique-se de que o caminho esteja correto

export function LogoutButton() {
  const { logout } = useUser()

  return (
    <Button
      onClick={logout}
      className="bg-red-500 hover:bg-red-700" // Adicione classes específicas se necessário
    >
      Logout
    </Button>
  )
}
