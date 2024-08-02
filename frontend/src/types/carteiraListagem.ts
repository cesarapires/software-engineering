import { z } from 'zod'

export const CarteiraListagemSchema = z.object({
  id: z.number(),
  nome: z.string(),
  total: z.number(),
})

export type CarteiraListagem = z.infer<typeof CarteiraListagemSchema>
