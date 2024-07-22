'use client'

import { useState } from 'react'
import { Login } from './login'
import { CreateAccount } from './create'

export default function Component() {
  const [isLoginView, setIsLoginView] = useState<boolean>(true)
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tr from-brand-1000 to-brand-700">
      {isLoginView ? (
        <Login handleClickCreateAccount={() => setIsLoginView(false)} />
      ) : (
        <CreateAccount handleBack={() => setIsLoginView(true)} />
      )}
    </div>
  )
}
