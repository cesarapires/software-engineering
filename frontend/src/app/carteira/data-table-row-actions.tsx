'use client'

import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import {
  CarteiraListagemSchema,
  CarteiraListagem,
} from '@/types/carteiraListagem'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  setOpen: Dispatch<SetStateAction<boolean>>
  setCarteira: Dispatch<SetStateAction<CarteiraListagem>>
  setOpenEdit: Dispatch<SetStateAction<boolean>>
}

export function DataTableRowActions<TData>({
  row,
  setOpen,
  setCarteira,
  setOpenEdit,
}: DataTableRowActionsProps<TData>) {
  const navigate = useRouter()
  const handleOpen = () => {
    const carteira = CarteiraListagemSchema.parse(row.original)
    setCarteira(carteira)
    setOpen(true)
  }

  const handleOpenEdit = () => {
    const carteira = CarteiraListagemSchema.parse(row.original)
    setCarteira(carteira)
    setOpenEdit(true)
  }

  const handleView = () => {
    const carteira = CarteiraListagemSchema.parse(row.original)
    navigate.push(`/carteira/${carteira.id}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          data-testid="data-table-row-actions__dropdown-trigger__open-button"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Abrir opções</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={handleView}
          data-testid="data-table-row-actions__dropdown__vizualize-button"
        >
          Visualizar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleOpen}
          data-testid="data-table-row-actions__dropdown__delete-button"
        >
          Excluir
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleOpenEdit}
          data-testid="data-table-row-actions__dropdown__edit-button"
        >
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
