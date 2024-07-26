'use client'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import Api from '@/lib/api'
import { useEffect, useState } from 'react'
import { Acao as IAcao } from '@/types/acao'
import { Page } from '@/types/page'

export default function Acao() {
  const [data, setData] = useState<IAcao[]>([])

  useEffect(() => {
    Api.get<Page<IAcao>>('/v1/acao/find-filtered', {
      params: {
        codigo: '',
        page: 0,
        size: 1000,
      },
    }).then(res => setData(res.data.content))
  }, [])

  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  )
}
