'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Api from '@/lib/api'
import { useState } from 'react'
import { useUserStore } from '@/stores/user-store'
import { Input } from '../ui/input'
import { toast, useToast } from '../ui/use-toast'

const REQUIRED = 'Campo obrigatório'
const SIX_DIGITS = 'A senha deve conter ao menos 6 dígitos'

const changePasswordSchema = z
  .object({
    oldPassword: z.string({ required_error: REQUIRED }).min(1, REQUIRED),
    newPassword: z
      .string({ required_error: REQUIRED })
      .min(6, { message: SIX_DIGITS }),
    confirmPassword: z
      .string({ required_error: 'Confirme sua senha' })
      .min(1, 'Confirme sua senha'),
  })
  .refine(schema => schema.newPassword === schema.confirmPassword, {
    message: 'As senhas não são iguais. Tente novamente',
    path: ['confirmPassword'],
  })

export function EditPasswordModal() {
  const [open, setOpen] = useState<boolean>(false)
  const { fetchUser } = useUserStore()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const handleChangePassword = () => {
    Api.post('/v1/auth/change-password', {
      oldPassword: form.getValues().oldPassword,
      newPassword: form.getValues().newPassword,
    })
      .then(() => {
        fetchUser()
        toast({
          title: 'Senha alterada com sucesso',
        })
        form.reset()
        setOpen(false)
      })
      .catch(err => {
        toast({
          title: 'Erro ao alterar senha',
          description: err.response?.data?.details,
        })
      })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <a className="cursor-pointer">Editar Senha</a>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={() => form.reset()}
      >
        <DialogHeader>
          <DialogTitle>Alterar as senhas</DialogTitle>
          <DialogDescription>Altere a senha da sua conta</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-change-password"
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleChangePassword)}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Senha Atual</FormLabel>
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
                name="newPassword"
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
        <DialogFooter>
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            form="form-change-password"
          >
            Alterar senha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
