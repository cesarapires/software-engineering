export type AcaoDetail = {
  shortName: string
  longName: string
  symbol: string
  logourl: string
  historicalDataPrice: HistoricalDataPrice[]
  close: number
}

export type HistoricalDataPrice = {
  date: string
  close: number
}
