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
import { useRouter } from 'next/navigation'

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
  const navigate = useRouter()
  const handleOpen = () => {
    const acao = AcaoSchema.parse(row.original)
    setAcao(acao)
    setOpen(true)
  }

  const handleView = () => {
    const acao = AcaoSchema.parse(row.original)
    navigate.push(`/acao/${acao.codigo}`)
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
          data-testid="data-table-row-actions__dropdown__buy-button"
        >
          Comprar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
