'use client'

import { useState } from 'react'
import Login from './login'

export default function Component() {
  const [isLoginView, setIsLoginView] = useState(true)
  return (
    <div className="from-brand-1000 to-brand-700 flex min-h-screen w-full items-center justify-center bg-gradient-to-tr">
      <Login />
    </div>
  )
}
