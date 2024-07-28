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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Api from '@/lib/api'
import { useState } from 'react'
import { useUserStore } from '@/stores/user-store'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { MoneyInput } from '@/components/money-input'
import { Input } from '@/components/ui/input'

const schema = z.object({
  quantidade: z.coerce.number().min(1, 'Obrigatório'),
})

export function ModalComprarAcao() {
  const [open, setOpen] = useState<boolean>(false)
  const { fetchUser } = useUserStore()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantidade: 0,
    },
    mode: 'onChange',
  })

  const handleDeposit = () => {
    Api.post('/v1/usuario/add-saldo', undefined, {
      params: { valor: form.getValues().quantidade },
    }).then(() => {
      fetchUser()
      form.reset()
      setOpen(false)
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite a quantidade ..."
                        type="number"
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
            form="form-deposit"
          >
            Depositar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
