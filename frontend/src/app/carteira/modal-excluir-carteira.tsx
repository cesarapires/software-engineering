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
import { z } from 'zod'
import Api from '@/lib/api'
import { Dispatch, SetStateAction, useState } from 'react'
import { useUserStore } from '@/stores/user-store'
import { useToast } from '@/components/ui/use-toast'
import { CarteiraListagem } from '@/types/carteiraListagem'
import { Checkbox } from '@/components/ui/checkbox'

const schema = z.object({
  quantidade: z.coerce.number().min(1, 'Obrigatório'),
  idCarteira: z.coerce.number().min(1, 'Obrigatório'),
})

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  carteira: CarteiraListagem
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export function ModalExcluirCarteira({
  open,
  setOpen,
  carteira,
  setIsLoading,
}: Props) {
  const [checked, setChecked] = useState<boolean>(false)

  const { fetchUser } = useUserStore()
  const { toast } = useToast()

  const handleDelete = () => {
    Api.delete('/v1/carteira/delete', {
      params: { idCarteira: carteira.id },
    })
      .then(() => {
        toast({ title: 'Carteira excluída com sucesso!' })
        fetchUser()
        setOpen(false)
        setIsLoading(true)
      })
      .catch(err => {
        toast({
          title: 'Não foi possível deletar a carteira!',
          description: err.response?.data?.details,
        })
      })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={() => setChecked(false)}
      >
        <DialogHeader>
          <DialogTitle>{`Deseja deletar a carteira: ${carteira.nome}?`}</DialogTitle>
          <DialogDescription>
            Se confirmar a ação não será possível reverter
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={checked}
            onCheckedChange={check => setChecked(!!check)}
            data-testid="modal-excluir-carteira__dialog-content__checkbox"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Desejo excluir a carteira
          </label>
        </div>
        <DialogFooter>
          <Button
            disabled={!checked}
            onClick={handleDelete}
            variant={'destructive'}
            data-testid="modal-excluir-carteira__dialog-footer__delete-button"
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
