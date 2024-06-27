import { z } from 'zod'

const REQUIRED = 'Campo obrigatório'
const SIX_DIGITS = 'A senha deve conter ao menos 6 dígitos'
const sharedSchema = z.object({
  email: z.string({ required_error: REQUIRED }).email('Insira um email válido'),
  password: z
    .string({ required_error: REQUIRED })
    .min(6, { message: SIX_DIGITS }),
})

export const loginSchema = sharedSchema
export type LoginType = z.infer<typeof loginSchema>

export const createAccountSchema = sharedSchema
  .extend({
    nome: z.string({ required_error: REQUIRED }).min(1, REQUIRED),
    confirmPassword: z
      .string({ required_error: 'Confirme sua senha' })
      .min(1, 'Confirme sua senha'),
  })
  .refine(schema => schema.password === schema.confirmPassword, {
    message: 'As senhas não são iguais. Tente novamente',
    path: ['confirmPassword'],
  })

export type CreateAccountType = z.infer<typeof createAccountSchema>
