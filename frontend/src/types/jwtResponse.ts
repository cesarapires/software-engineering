import { z } from 'zod'

export const loginSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
})

export type JwtResponse = z.infer<typeof loginSchema>
