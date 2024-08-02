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
import { Dispatch, SetStateAction } from 'react'
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
import { useToast } from '@/components/ui/use-toast'
import { AcaoMinimal, CarteiraDetail } from '@/types/carteiraDetail'

const schema = z.object({
  quantidade: z.coerce.number().min(1, 'Obrigatório'),
})

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  acao?: AcaoMinimal
  idCarteira?: number
  updateCarteira: (carteira: CarteiraDetail) => void
}

export function ModalVenderAcao({
  open,
  setOpen,
  acao,
  idCarteira,
  updateCarteira,
}: Props) {
  const { fetchUser, carteiras } = useUserStore()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantidade: 0,
    },
    mode: 'onChange',
  })

  const handleSell = () => {
    const dto = {
      ...form.getValues(),
      idAcao: acao?.id,
      idCarteira,
    }
    Api.post<CarteiraDetail>('/v1/carteira-acao/sell', dto)
      .then(response => {
        updateCarteira(response.data)
        toast({ title: 'Ações vendidas com sucesso!' })
        fetchUser()
        form.reset()
        setOpen(false)
      })
      .catch(err => {
        toast({
          title: 'Não foi possível vender a ação',
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
          <DialogTitle>{`Deseja vender a ação ${acao ? acao.codigo : ''}?`}</DialogTitle>
          <DialogDescription>
            Escolha a quantidade de ações que deseja vender
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-buy-stock"
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleSell)}
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
            Vender
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
