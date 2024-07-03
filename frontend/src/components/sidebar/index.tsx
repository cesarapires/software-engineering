'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Logo from '../../../public/logo.svg'
import NavLink from './navlink'
import { CircleDollarSign, Home, LogOut, Wallet } from 'lucide-react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores/user-store'
import Api from '@/lib/api'
import { Usuario } from '@/types/usuario'

const Sidebar = () => {
  const { nome, saldo, setUser } = useUserStore()

  useEffect(() => {
    if (!nome && setUser) {
      Api.get<Usuario>('/v1/usuario/me').then(response => {
        setUser(response.data)
      })
    }
  }, [nome, setUser])
  return (
    <aside
      id="sidebar"
      className="flex flex-col border-r border-zinc-200 bg-amber-50 px-5 py-8"
    >
      <section className="flex flex-col items-center gap-8" id="user_details">
        <Image
          src={Logo}
          alt={'Logomarca da Share Plus'}
          loading="eager"
          height={100}
        />
        <div className="text-center">
          <h1 className="text-lg font-semibold">{nome}</h1>
          <h2 className="self-center text-lg font-semibold">
            {saldo?.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}
          </h2>
          <a>Depositar</a>
        </div>
      </section>
      <div className="mt-8 flex grow flex-col justify-between">
        <section id="navlink" className="flex flex-col items-center gap-5">
          <NavLink
            id="nav_carteira"
            text="Carteiras"
            icon={<Wallet size={16} />}
            href="/carteira"
          />

          <NavLink
            id="nav_acoes"
            text="Ações"
            icon={<CircleDollarSign size={16} />}
            href="/acao"
          />
          <NavLink
            id="nav_home"
            text="Home"
            icon={<Home size={16} />}
            href="/"
          />
        </section>
        <section id="footer" className="flex flex-col items-center gap-5">
          <Link
            href="/api/logout"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'min-w-[14rem] max-w-[16rem] space-x-6'
            )}
          >
            Sair <LogOut size={16} className="ml-4" />
          </Link>
        </section>
      </div>
    </aside>
  )
}

export default Sidebar
