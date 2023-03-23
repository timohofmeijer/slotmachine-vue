type SymbolName =
  | 'Lemon'
  | 'Melon'
  | 'Bananna'
  | 'Grapes'
  | 'Cherry'
  | 'Clover'
  | 'Crown'
  | 'Cash'
  | '1Cash'
  | '2Cash'

export type ReelSymbol = {
  name: SymbolName
  value: number
  image: string
  number?: number
}
