import { Input } from '@/components/ui/input'
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
import { LoginType, loginSchema } from './schema'
import { BaseCard } from './baseCard'
import { useRouter } from 'next/navigation'

interface LoginProps {
  handleClickCreateAccount: () => void
}

export function Login({ handleClickCreateAccount }: LoginProps) {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const { toast } = useToast()
  const router = useRouter()

  function onSubmit(values: LoginType) {
    Api.post<JwtResponse>('/api/signin', values)
      .then(() => router.push('/'))
      .catch(() => toast({ title: 'Email e/ou senha inválidos' }))
  }

  return (
    <BaseCard type="LOGIN">
      <Form {...form}>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
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
          </div>
        </form>
      </Form>
      <div className="flex justify-end">
        <a
          className="cursor-pointer text-blue-400 hover:text-blue-500"
          onClick={handleClickCreateAccount}
        >
          Crie sua conta
        </a>
      </div>
    </BaseCard>
  )
}
