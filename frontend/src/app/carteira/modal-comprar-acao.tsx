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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Api from '@/lib/api'
import { Dispatch, SetStateAction, useState } from 'react'
import { useUserStore } from '@/stores/user-store'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Acao } from '@/types/acao'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
  quantidade: z.coerce.number().min(1, 'Obrigatório'),
  idCarteira: z.coerce.number().min(1, 'Obrigatório'),
})

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  acao: Acao | undefined
}

export function ModalComprarAcao({ open, setOpen, acao }: Props) {
  const { fetchUser, carteiras } = useUserStore()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantidade: 0,
      idCarteira: 0,
    },
    mode: 'onChange',
  })

  const handlePurchase = () => {
    const dto = {
      ...form.getValues(),
      idAcao: acao?.id,
    }
    Api.post('/v1/carteira-acao/purchase', dto)
      .then(() => {
        toast({ title: 'Ações adicionadas a carteira com sucesso' })
        fetchUser()
        form.reset()
        setOpen(false)
      })
      .catch(err => {
        toast({
          title: 'Não foi possível comprar a ação',
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
          <DialogTitle>{`Comprar a ação ${acao ? acao.codigo : ''}`}</DialogTitle>
          <DialogDescription>
            Escolha a carteira e a quantidade de ações que deseja comprar
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-buy-stock"
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handlePurchase)}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="idCarteira"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Carteira</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {carteiras.map(carteira => (
                          <SelectItem
                            value={carteira.id.toString()}
                            key={carteira.id}
                          >
                            {carteira.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        min={0}
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
            disabled={!form.formState.isValid || !acao}
            form="form-buy-stock"
          >
            Comprar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
