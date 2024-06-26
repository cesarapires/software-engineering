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

const formSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Insira um email válido'),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(5, { message: 'A senha deve conter ao menos 6 dígitos' }),
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })
  const { toast } = useToast()

  function onSubmit(values: z.infer<typeof formSchema>) {
    Api.post<JwtResponse>('/api/signin', values)
      .then()
      .catch(() => toast({ title: 'Falha ao realizar login' }))
  }

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex items-center justify-center">
        <CardTitle>
          <Image
            src={Logo}
            alt={'Logomarca da Share Plus'}
            loading="eager"
            height={100}
          />
        </CardTitle>
        <CardDescription>
          Preencha suas credenciais para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex">
        <Button
          type="submit"
          form="login-form"
          className="grow bg-brand-1000 hover:bg-brand-700 hover:text-black"
        >
          SIGN IN
        </Button>
      </CardFooter>
    </Card>
  )
}
