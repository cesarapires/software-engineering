'use client'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import Api from '@/lib/api'
import { useEffect, useState } from 'react'
import { ModalExcluirCarteira } from './modal-excluir-carteira'
import { CarteiraListagem } from '@/types/carteiraListagem'

export default function Carteira() {
  const [data, setData] = useState<CarteiraListagem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedCarteira, setSelectedCarteira] = useState<CarteiraListagem>({
    id: 0,
    total: 0,
    nome: '',
  })

  useEffect(() => {
    Api.get<CarteiraListagem[]>('/v1/carteira/all').then(res => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [isLoading])

  return (
    <>
      <DataTable
        data={data}
        columns={columns(setOpen, setSelectedCarteira)}
        isLoading={isLoading}
      />
      <ModalExcluirCarteira
        open={open}
        setOpen={setOpen}
        carteira={selectedCarteira}
        setIsLoading={setIsLoading}
      />
    </>
  )
}
