'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Api from '@/lib/api'
import { Dispatch, SetStateAction, useState } from 'react'
import { useUserStore } from '@/stores/user-store'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  reloadData: () => void
  idCarteira: number
}

const schema = z.object({
  description: z
    .string()
    .min(5, 'A descrição deve ter no mínimo 5 caracteres')
    .max(50),
})

export function EditWalletModal({
  open,
  setOpen,
  reloadData,
  idCarteira,
}: Props) {
  const { fetchUser } = useUserStore()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
  })

  const handleEditWallet = () => {
    Api.put('/v1/carteira/update', {
      nome: form.getValues().description,
      idCarteira: idCarteira,
    })
      .then(() => {
        fetchUser()
        form.reset()
        reloadData()
        setOpen(false)
      })
      .catch(err => {
        toast({
          title: 'Erro ao editar carteira',
          description: err.response?.data?.details,
        })
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={() => form.reset()}
      >
        <DialogHeader>
          <DialogTitle>Editar carteira</DialogTitle>
          <DialogDescription>
            Insira um novo nome de sua escolha
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-edit-new-wallet"
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleEditWallet)}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite a descrição da carteira"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                form="form-edit-new-wallet"
              >
                Editar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
