'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Acao } from '@/types/acao'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'

export const columns: ColumnDef<Acao>[] = [
  {
    accessorKey: 'id',
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'codigo',
    header: () => <div>Código</div>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('codigo')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'nome',
    header: () => <div>Nome</div>,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue('nome')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
