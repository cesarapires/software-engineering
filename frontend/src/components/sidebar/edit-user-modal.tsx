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
import { useToast } from '../ui/use-toast'
import AnonymousUserImage from './anonymous-user'

const REQUIRED = 'Campo obrigatório'

const changeUserSchema = z
  .object({
    name: z.string({ required_error: REQUIRED }).min(1, REQUIRED),
    email: z.string({ required_error: REQUIRED }).email(),
  })

export function EditUserModal() {
  const [open, setOpen] = useState<boolean>(false)
  const { fetchUser } = useUserStore()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof changeUserSchema>>({
    resolver: zodResolver(changeUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onChange',
  })

  const handleUpdateUser = () => {
    Api.post('/v1/usuario/update-user', {
      name: form.getValues().name,
      email: form.getValues().email,
    }).then(() => {
      fetchUser()
      toast({
        title: 'Usuário atualizado com sucesso',
      })
      form.reset()
      setOpen(false)
    }).catch(() => {
      toast({
        title: 'Erro ao atualizar usuário',
        description: 'Tente novamente mais tarde',
      })
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AnonymousUserImage onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={() => form.reset()}
      >
        <DialogHeader>
          <DialogTitle>Alterar dados do usuário</DialogTitle>
          <DialogDescription>
            Altere os dados da sua conta
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-change-user"
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleUpdateUser)}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
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
                      <Input
                        {...field}
                        type="email"
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
            form="form-change-user"
          >
            Alterar usuário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
