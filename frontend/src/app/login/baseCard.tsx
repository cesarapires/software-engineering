import { ReactNode } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import Logo from '../../../public/logo.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Icon } from 'lucide-react'

interface BaseCardProps {
  type: 'LOGIN' | 'CREATE'
  children: ReactNode
}

export function BaseCard({ type, children }: BaseCardProps) {
  const isLoginCard = type === 'LOGIN'
  return (
    <Card className="relative w-[400px]">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="flex">
          <Image
            src={Logo}
            alt={'Logomarca da Share Plus'}
            loading="eager"
            height={100}
          />
        </CardTitle>
        <CardDescription>
          {isLoginCard
            ? 'Informe suas credenciais para obter acesso'
            : 'Preencha os campos para criar uma conta'}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex">
        <Button
          type="submit"
          form={isLoginCard ? 'login-form' : 'create-form'}
          className="grow bg-brand-1000 hover:bg-brand-700 hover:text-black"
        >
          {isLoginCard ? 'Fazer login' : 'Criar conta'}
        </Button>
      </CardFooter>
    </Card>
  )
}
