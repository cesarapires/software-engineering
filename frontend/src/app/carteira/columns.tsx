'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Acao } from '@/types/acao'
import { DataTableRowActions } from '@/app/acao/data-table-row-actions'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Dispatch, SetStateAction } from 'react'
import { moneyFormatter } from '@/lib/utils'
import { CarteiraListagem } from '@/types/carteiraListagem'

export const columns = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setAcao: Dispatch<SetStateAction<Acao>>
): ColumnDef<CarteiraListagem>[] => [
  {
    accessorKey: 'nome',
    header: () => <div>Nome</div>,
    cell: ({ row }) => {
      return (
        <div className="flex w-[180px] items-center">
          <span>{row.getValue('nome')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate font-medium">
            {moneyFormatter.format(row.getValue('total'))}
          </span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row} setOpen={setOpen} setAcao={setAcao} />
    ),
  },
]
