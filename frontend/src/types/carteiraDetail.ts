export interface CarteiraDetail {
  id: number
  nome: string
  total: number
  carteiraAcoes: CarteiraAcao[]
}

export interface CarteiraAcao {
  acao: AcaoMinimal
  quantidade: string
  total: number
}

export interface AcaoMinimal {
  id: number
  codigo: string
}
