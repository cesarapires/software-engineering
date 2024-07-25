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
import MoneyInput from '../money-input'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Api from '@/lib/api'
import { useState } from 'react'
import { useUserStore } from '@/stores/user-store'

const schema = z.object({
  amount: z.coerce.number().min(0.01, 'Obrigatório'),
})

export function ModalDepositar() {
  const [open, setOpen] = useState<boolean>(false)
  const { fetchUser } = useUserStore()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
    },
    mode: 'onChange',
  })

  const handleDeposit = () => {
    Api.post('/v1/usuario/add-saldo', undefined, {
      params: { valor: form.getValues().amount },
    }).then(() => {
      fetchUser()
      form.reset()
      setOpen(false)
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <a className="cursor-pointer">Depositar</a>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={() => form.reset()}
      >
        <DialogHeader>
          <DialogTitle>Depositar</DialogTitle>
          <DialogDescription>
            Deposite o saldo desejado para comprar suas ações
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-deposit"
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleDeposit)}
          >
            <div className="grid gap-2">
              <MoneyInput
                form={form}
                label="Quantia"
                name="amount"
                placeholder="Preencha o valor a ser depositado"
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            form="form-deposit"
          >
            Depositar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
