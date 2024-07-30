'use client'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import Api from '@/lib/api'
import { useEffect, useState } from 'react'
import { Acao as IAcao } from '@/types/acao'
import { Page } from '@/types/page'
import { ModalComprarAcao } from './modal-comprar-acao'

export default function Acao() {
  const [data, setData] = useState<IAcao[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedAcao, setSelectedAcao] = useState<IAcao>({
    codigo: '',
    id: 0,
    preco: 0,
    nome: '',
  })

  useEffect(() => {
    Api.get<IAcao[]>('/v1/acao/find-filtered').then(res => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <>
      <DataTable
        data={data}
        columns={columns(setOpen, setSelectedAcao)}
        isLoading={isLoading}
      />
      <ModalComprarAcao open={open} setOpen={setOpen} acao={selectedAcao} />
    </>
  )
}
