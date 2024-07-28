import { z } from 'zod'

export const AcaoSchema = z.object({
  id: z.number(),
  codigo: z.string(),
  nome: z.string(),
  logo: z.string().optional(),
  preco: z.number(),
})

export type Acao = z.infer<typeof AcaoSchema>
