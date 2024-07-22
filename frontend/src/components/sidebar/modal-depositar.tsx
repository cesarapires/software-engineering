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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MoneyInput from '../money-input'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  amount: z.coerce.number().min(0.01, 'Obrigatório'),
})

export function ModalDepositar() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
    },
    mode: 'onTouched',
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="cursor-pointer">Depositar</a>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Depositar</DialogTitle>
          <DialogDescription>
            Deposite o saldo desejado para comprar suas ações
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4 py-4">
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
          <Button type="submit" disabled={!form.formState.isValid}>
            Depositar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
