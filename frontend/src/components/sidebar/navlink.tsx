import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

interface NavLinkProps {
  text: string
  icon: ReactElement
  href: string
  id?: string
}

export function NavLink({ icon, text, id, href }: NavLinkProps) {
  const pathname = usePathname()
  const bgColorClass =
    pathname === href ? 'bg-yellow-500' : 'hover:bg-slate-100'
  return (
    <nav
      id={id}
      className={
        'flex h-10 min-w-[14rem] max-w-[16rem] items-center justify-center rounded-md ' +
        bgColorClass
      }
    >
      <div className="pr-5">{icon}</div>
      <Link href={href}>{text}</Link>
    </nav>
  )
}
