'use client'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import Api from '@/lib/api'
import { useEffect, useState } from 'react'
import { Acao as IAcao } from '@/types/acao'
import { ModalComprarAcao } from './modal-comprar-acao'
import { CarteiraListagem } from '@/types/carteiraListagem'

export default function Carteira() {
  const [data, setData] = useState<CarteiraListagem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedAcao, setSelectedAcao] = useState<IAcao>({
    codigo: '',
    id: 0,
    preco: 0,
    nome: '',
  })

  useEffect(() => {
    Api.get<CarteiraListagem[]>('/v1/carteira/all').then(res => {
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
