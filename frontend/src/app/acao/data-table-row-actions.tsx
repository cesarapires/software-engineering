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
import { Acao, AcaoSchema } from '@/types/acao'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  setOpen: Dispatch<SetStateAction<boolean>>
  setAcao: Dispatch<SetStateAction<Acao>>
}

export function DataTableRowActions<TData>({
  row,
  setOpen,
  setAcao,
}: DataTableRowActionsProps<TData>) {
  const handleOpen = () => {
    const acao = AcaoSchema.parse(row.original)
    setAcao(acao)
    setOpen(true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Abrir opções</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Visualizar</DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpen}>Comprar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
