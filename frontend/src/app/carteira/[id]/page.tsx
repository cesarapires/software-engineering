'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUserStore } from '@/stores/user-store'
import { AcaoMinimal, CarteiraDetail } from '@/types/carteiraDetail'
import { useEffect, useState } from 'react'
import Api from '@/lib/api'
import { formatMoney } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { ModalVenderAcao } from './modal-vender-acao'

export default function VisualizarCarteira({
  params,
}: {
  params: { id: number }
}) {
  const [carteira, setCarteira] = useState<CarteiraDetail>()
  const [open, setOpen] = useState<boolean>(false)
  const [acao, setAcao] = useState<AcaoMinimal>()

  const { toast } = useToast()
  const { push } = useRouter()

  useEffect(() => {
    Api.get<CarteiraDetail>(`/v1/carteira/${params.id}`)
      .then(response => setCarteira(response.data))
      .catch(err => {
        toast({
          title: 'Ops!',
          description: err.response?.data?.details,
        })
        push('/carteira')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = (selectedAcao: AcaoMinimal) => {
    setAcao(selectedAcao)
    setOpen(true)
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{carteira?.nome}</h1>
        <h1 className="text-2xl font-bold">{formatMoney(carteira?.total)}</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ação</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carteira?.carteiraAcoes?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center italic">
                Vazia
              </TableCell>
            </TableRow>
          )}
          {carteira?.carteiraAcoes?.map(carteiraAcao => (
            <TableRow key={carteiraAcao.acao.codigo}>
              <TableCell className="font-medium">
                {carteiraAcao.acao.codigo}
              </TableCell>
              <TableCell>{carteiraAcao.quantidade}</TableCell>
              <TableCell>{formatMoney(carteiraAcao.total)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                      data-testid="data-table-row-actions__dropdown-trigger__open-stock-button"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Abrir opções</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem
                      onClick={() => handleOpen(carteiraAcao.acao)}
                      data-testid="data-table-row-actions__dropdown-trigger__sell-button"
                    >
                      Vender
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalVenderAcao
        open={open}
        setOpen={setOpen}
        acao={acao}
        idCarteira={carteira?.id}
        updateCarteira={setCarteira}
      />
    </div>
  )
}
