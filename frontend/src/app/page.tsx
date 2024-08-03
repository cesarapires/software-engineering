'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Api from '@/lib/api'
import { formatMoney } from '@/lib/utils'
import { useUserStore } from '@/stores/user-store'
import { Carteira as CarteiraType } from '@/types/carteira'
import {
  RelatorioTransacoes,
  RelatorioTransacoesSchema,
} from '@/types/relatorioTransacoes'
import { Square } from 'lucide-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const schema = z.array(RelatorioTransacoesSchema)

export default function Home() {
  const { carteiras } = useUserStore()

  const [transacoes, setTransacoes] = useState<RelatorioTransacoes[]>([])
  const [carteira, setCarteira] = useState<string>(
    carteiras?.length > 0 ? String(carteiras[0].id) : ''
  )

  useEffect(() => {
    if (carteiras?.length == 0 || !carteira) {
      return
    }
    Api.get<RelatorioTransacoes[]>('/v1/historico-transacao', {
      params: { idCarteira: carteira },
    }).then(response => {
      const transacao = schema.parse(response.data)
      setTransacoes(transacao)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carteira])
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label>Escolha a carteira para visualizar o relatório</Label>
        <Select onValueChange={a => setCarteira(a)} defaultValue={carteira}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a carteira" />
          </SelectTrigger>
          <SelectContent>
            {carteiras?.map(carteira => (
              <SelectItem value={carteira.id.toString()} key={carteira.id}>
                {carteira.nome}
                {carteira.excluido ? ' (excluída)' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h1>Histórico de transações</h1>
        <Table>
          <TableCaption>
            <div className="flex gap-7">
              <div className="flex gap-1">
                <div className="h-4 w-4 bg-green-500"></div>
                <span>Compra</span>
              </div>

              <div className="flex gap-1">
                <div className="h-4 w-4 bg-red-500"></div>
                <span>Venda</span>
              </div>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Data de transação</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor total da transação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacoes?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center italic">
                  Vazia
                </TableCell>
              </TableRow>
            )}
            {transacoes?.map((transacao, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {transacao.dataTransacao?.toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>{transacao.acao}</TableCell>
                <TableCell>{transacao.quantidade}</TableCell>
                <TableCell
                  className={`${transacao.flCompra ? 'text-green-500' : 'text-red-500'}`}
                >
                  {formatMoney(transacao.valor)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
