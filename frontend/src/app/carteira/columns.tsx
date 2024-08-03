'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Dispatch, SetStateAction } from 'react'
import { moneyFormatter } from '@/lib/utils'
import { CarteiraListagem } from '@/types/carteiraListagem'
import { DataTableRowActions } from './data-table-row-actions'

export const columns = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setCarteira: Dispatch<SetStateAction<CarteiraListagem>>,
  setOpenEdit: Dispatch<SetStateAction<boolean>>
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
      <DataTableRowActions
        row={row}
        setOpen={setOpen}
        setCarteira={setCarteira}
        setOpenEdit={setOpenEdit}
      />
    ),
  },
]
