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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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
}

const schema = z.object({
  description: z.string().min(5, 'A descrição deve ter no mínimo 5 caracteres').max(50),
})

export function CreateNewWalletModal({
  open,
  setOpen,
  reloadData,
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

  const handleCreateWallet = () => {
    Api.post('/v1/carteira/save', {
      nome: form.getValues().description,
    }).then(() => {
        fetchUser()
        form.reset()
        reloadData()
        setOpen(false)
      }).catch(() => {
        toast({
          title: 'Erro ao criar carteira',
          description: 'Tente novamente mais tarde',
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
          <DialogTitle>Criar Nova Carteira</DialogTitle>
          <DialogDescription>
            Crie uma nova carteira para começar a investir
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-create-new-wallet"
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleCreateWallet)}
          >
            <div className="grid gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormControl>
                    <Input {...field} placeholder="Digite a descrição da carteira" />
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
                form="form-create-new-wallet"
              >
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
