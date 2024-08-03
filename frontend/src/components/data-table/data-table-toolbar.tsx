'use client'

import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'

import { ReactNode } from 'react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  placeholder?: string
  optionButton?: ReactNode
}

export function DataTableToolbar<TData>({
  table,
  placeholder = 'Filtrar ...',
  optionButton,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getAllColumns()[0]?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getAllColumns()[0]?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div>{optionButton}</div>
    </div>
  )
}
