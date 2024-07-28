'use client'
import { Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { usePathname, useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <head>
        <title>Share Plus</title>
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      </head>
      <body
        className={cn('min-h-screen font-sans antialiased', roboto.variable)}
      >
        {pathname === '/login' ? (
          <main>{children}</main>
        ) : (
          <div className="min-h-screen grid-cols-app">
            <Sidebar />
            <main className="ml-64 overflow-auto px-4 pb-12 pt-8">
              {children}
            </main>
          </div>
        )}
        <Toaster />
      </body>
    </html>
  )
}
