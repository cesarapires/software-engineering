'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Acao } from '@/types/acao'
import { DataTableRowActions } from '@/app/acao/data-table-row-actions'
import { moneyFormatter } from '@/components/money-input'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Dispatch, SetStateAction } from 'react'

export const columns = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setAcao: Dispatch<SetStateAction<Acao>>
): ColumnDef<Acao>[] => [
  {
    accessorKey: 'codigo',
    header: () => <div>Código</div>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue('codigo')}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: 'setor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Setor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[120px] font-medium">
            {row.getValue('setor') || '-'}
          </span>
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'preco',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate font-medium">
            {moneyFormatter.format(row.getValue('preco'))}
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
