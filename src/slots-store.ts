import { defineStore } from 'pinia'

export const useSlotsStore = defineStore('slots', {
  state: () => ({
    locked: [false, false, false],
    canLock: [true, true, true],
    wasLocked: false,
    wasThreeInRow: false
  }),
  actions: {
    setLocked(reelNr: 0 | 1 | 2, locked?: boolean) {
      // if (!this.canLock[reelNr]) return // In stead handle `denied` in slotreel for consistency with reel+keyboard locking
      this.locked[reelNr] = typeof locked !== 'undefined' ? locked : !this.locked[reelNr]
    },
    setWasLocked(val: boolean) {
      this.wasLocked = val
    },
    setCanLock(reelNr: 0 | 1 | 2, val?: boolean) {
      this.canLock[reelNr] = typeof val !== 'undefined' ? val : !this.canLock[reelNr]
    },
    setWasThreeInRow(val: boolean) {
      this.wasThreeInRow = val
    }
  }
})
