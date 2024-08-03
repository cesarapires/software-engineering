'use client'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import Api from '@/lib/api'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { ModalExcluirCarteira } from './modal-excluir-carteira'
import { CarteiraListagem } from '@/types/carteiraListagem'
import { Button } from '@/components/ui/button'
import { CreateNewWalletModal } from './modal-nova-carteira'

export default function Carteira() {
  const [data, setData] = useState<CarteiraListagem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState<boolean>(false)
  const [isCreateNewWalletModalOpen, setIsCreateNewWalletModalOpen] =
    useState<boolean>(false)
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

  const reloadData = () => {
    setIsLoading(true)
    Api.get<CarteiraListagem[]>('/v1/carteira/all').then(res => {
      setData(res.data)
      setIsLoading(false)
    })
  }

  return (
    <>
      <DataTable
        data={data}
        columns={columns(setIsExcluirModalOpen, setSelectedCarteira)}
        isLoading={isLoading}
        optionButton={buildCreateNewWalletButton(setIsCreateNewWalletModalOpen)}
      />
      <ModalExcluirCarteira
        open={isExcluirModalOpen}
        setOpen={setIsExcluirModalOpen}
        carteira={selectedCarteira}
        setIsLoading={setIsLoading}
      />
      <CreateNewWalletModal
        open={isCreateNewWalletModalOpen}
        setOpen={setIsCreateNewWalletModalOpen}
        reloadData={reloadData}
      />
    </>
  )
}

function buildCreateNewWalletButton(
  setModalState: Dispatch<SetStateAction<boolean>>
): ReactNode {
  return (
    <Button onClick={() => setModalState(true)}>Criar nova carteira</Button>
  )
}
