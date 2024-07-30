import { Carteira } from './carteira'

export interface Usuario {
  nome: string
  email: string
  saldo: number
  carteiras: Carteira[]
}
