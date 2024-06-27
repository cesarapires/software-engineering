import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Api from '@/lib/api'
import { JwtResponse } from '@/types/jwtResponse'
import { useToast } from '@/components/ui/use-toast'
import { createAccountSchema, CreateAccountType } from './schema'
import BaseCard from './baseCard'
import { ArrowLeft } from 'lucide-react'

interface CreateAccountProps {
  handleBack: () => void
}

export default function CreateAccount({ handleBack }: CreateAccountProps) {
  const form = useForm<CreateAccountType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nome: '',
    },
  })
  const { toast } = useToast()

  function onSubmit(values: CreateAccountType) {
    Api.post<JwtResponse>('/v1/auth/signup', {
      email: values.email,
      password: values.password,
      fullName: values.nome,
    })
      .then(() => {
        toast({ title: 'Conta cadastrada com sucesso!' })
        handleBack()
      })
      .catch(() => toast({ title: 'Falha ao cadastrar conta' }))
  }

  return (
    <BaseCard type="CREATE">
      <ArrowLeft
        className="absolute left-5 top-5 cursor-pointer"
        onClick={handleBack}
      />
      <Form {...form}>
        <form id="create-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite seu nome"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Preencha seu email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite sua senha"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Confirmar</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Repita sua senha"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </BaseCard>
  )
}
