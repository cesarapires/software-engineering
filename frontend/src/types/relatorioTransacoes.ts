import { z } from 'zod'

export const RelatorioTransacoesSchema = z.object({
  dataTransacao: z.string().transform(str => new Date(str)), // Assumindo que a string será convertida para uma data
  flCompra: z.boolean(),
  acao: z.string(),
  quantidade: z.number().int(),
  valor: z.number(),
})

export type RelatorioTransacoes = z.infer<typeof RelatorioTransacoesSchema>
