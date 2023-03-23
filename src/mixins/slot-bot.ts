// @ts-nocheck (since this is undefined here)

/**
 * The slot-machine can be run by a bot by setting the
 * `slotbot` queryParam to true: `?slotbot=true`
 *
 * When you want the bot to stop when locking or winning
 * add an aditional `show` param: `?slotbot=true&show=true`
 *
 * Change number sets and the number of spins via the
 * BOT_SET_COUNT and BOT_SPIN_COUNT constants below.
 */

import { SLOTBOT_SHOW } from '@/utilities/slotbot-params'
const BOT_SPIN_COUNT = 400
const BOT_SET_COUNT = 4
const BOT_RESULTS = [] as any[]

import { createLog } from '@/utilities/log'
const { log } = createLog(true, 'BOT', '#FF00BB')
const { log: logWins } = createLog(true, 'win:', '#00B8FF')
const { log: logLocks } = createLog(false, 'lock:')

export const slotBotMixin = {
  methods: {
    runSlotBot: function () {
      const v1 = this.resultData[0]
      const v2 = this.resultData[1]
      const v3 = this.resultData[2]

      // Log wins
      const spins = this.spins.toString().padStart(3, '0')
      if (v1.name === 'Cash' && v2.name === 'Cash' && v3.name === 'Cash') {
        logWins(`${spins} 💰💰💰: ${this.win.toFixed(2)}`)
      } else if (v1.name === 'Crown' && v2.name === 'Crown' && v3.name === 'Crown') {
        logWins(`${spins} 👑👑👑: ${this.win.toFixed(2)}`)
      } else if (v1.name === v2.name && v2.name === v3.name) {
        logWins(`${spins} •••: ${this.win.toFixed(2)} (1: ${v1.name} 2: ${v2.name} 3: ${v3.name})`)
      } else if (this.win) {
        logWins(`${spins} $: ${this.win.toFixed(2)} (1: ${v1.name} 2: ${v2.name} 3: ${v3.name})`)
      }

      const { reel1, reel2, reel3 } = this.$refs as ReelRefs

      let didLock = false
      if (!this.wasLocked() && !this.wasThreeInRow()) {
        // LOCK ANY DOUBLES, ACCEPT LEMONS
        if (v1.name === v2.name && v1.name !== 'Lemon' && v1.name !== 'Cash') {
          logLocks(`${spins + 1} lock 1: ${v1.name} 2: ${v2.name}`)
          this.$nextTick(reel1.lock)
          this.$nextTick(reel2.lock)
          didLock = true
        } else if (v1.name === v3.name && v1.name !== 'Lemon' && v1.name !== 'Cash') {
          logLocks(`${spins + 1} lock 1: ${v1.name} 3: ${v3.name}`)
          this.$nextTick(reel1.lock)
          this.$nextTick(reel3.lock)
          didLock = true
        } else if (v2.name === v3.name && v2.name !== 'Lemon' && v2.name !== 'Cash') {
          logLocks(`${spins + 1} lock 2: ${v2.name} 3: ${v3.name}`)
          this.$nextTick(reel2.lock)
          this.$nextTick(reel3.lock)
          didLock = true
        }

        // LOCK ALL CROWNS
        // if (v1.name === 'Crown') this.$nextTick(reel1.lock)
        // if (v2.name === 'Crown') this.$nextTick(reel2.lock)
        // if (v3.name === 'Crown') this.$nextTick(reel3.lock)
        // if (v1.name === 'Crown' || v2.name === 'Crown' || v3.name === 'Crown') {
        //   console.log('found a crown', v1, v2, v3);
        //   setTimeout(()=>{this.spinAll()}, 40)
        //   this.$nextTick(this.spinAll)
        // } else {
        //   console.log('run');
        //   this.$nextTick(this.spinAll)
        // }
      }

      if (this.spins < BOT_SPIN_COUNT) {
        if (this.spins === 1 && !BOT_RESULTS.length) {
          log(`START (${BOT_SET_COUNT} sets of ${BOT_SPIN_COUNT} spins)`)
        }
        if (SLOTBOT_SHOW && (this.win > 0 || didLock)) {
          setTimeout(() => {
            this.spinAll()
          }, 500)
        } else {
          this.$nextTick(this.spinAll)
        }
      } else if (BOT_RESULTS.length < BOT_SET_COUNT) {
        BOT_RESULTS.push(this.currentWin)
        log(`SET ${BOT_RESULTS.length}/${BOT_SET_COUNT} (Won: ${this.currentWin.toFixed(2)})`)
        // RESET
        this.spend = 999
        this.credits = 999
        this.spins = 0
        this.win = 0
        this.maxWin = 0
        this.currentWin = 0

        this.$nextTick(this.spinAll)
      } else {
        let total = 0
        BOT_RESULTS.forEach((r) => {
          total += r
        })
        const average = total / BOT_RESULTS.length
        log('AVERAGE SET WIN', average.toFixed(2))
        log('SETS', [...BOT_RESULTS])

        // Final reset
        this.spend = 999
        this.credits = 999
        this.spins = 0
        this.win = 0
        this.maxWin = 0
        this.currentWin = 0

        BOT_RESULTS.length = 0
      }
    }
  }
}
