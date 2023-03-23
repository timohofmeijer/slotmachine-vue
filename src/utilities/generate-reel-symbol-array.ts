import type { ReelSymbol } from '@/typings'
import { symbolData } from '../symbol-data'

export const generateReelSymbolArray = (): ReelSymbol[] => {
  const sortedSymbolData = [] as ReelSymbol[]

  /**
   * Method 1, random until desired tile count is reached.
   */
  // let count = 50
  // while (count > 0) {
  //   const symbolIndex = Math.floor(Math.random() * symbolData.length)
  //   const symbolObject = symbolData[symbolIndex]
  //   frs.push(symbolObject)
  //   count--
  // }

  /**
   * Method 2
   * - Sort the source items on value
   * - Then use their index to determine their count in the reel
   * - And shuffle
   */
  symbolData.sort((a, b) => b.value - a.value)
  symbolData.forEach((sd, i) => {
    let occurenceCount
    if (i === 0) occurenceCount = 1
    else if (i === 1) occurenceCount = 1
    else occurenceCount = i
    // You could overwride a value/index based occurence like this:
    // if (sd.name === 'Crown') occurenceCount += 20
    while (occurenceCount > 0) {
      sortedSymbolData.push(sd)
      occurenceCount--
    }
  })

  // Fisher-Yates algorithm
  const shuffleArray = (array: ReelSymbol[]) => {
    const a = [...array] // Clone
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = a[i]
      a[i] = a[j]
      a[j] = temp
    }
    return a
  }

  return shuffleArray(sortedSymbolData)
}
