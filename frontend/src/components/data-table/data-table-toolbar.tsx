'use client'

import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  placeholder?: string
}

export function DataTableToolbar<TData>({
  table,
  placeholder = 'Filtrar ...',
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getColumn('codigo')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('codigo')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  )
}
