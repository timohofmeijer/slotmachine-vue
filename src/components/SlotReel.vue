<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapStores } from 'pinia'
import { useSlotsStore } from '../slots-store'

import { SLOTBOT } from '@/utilities/slotbot-params'
import { generateReelSymbolArray } from '@/utilities/generate-reel-symbol-array'

import type { ReelSymbol } from '@/typings'
import { Sounds, useSoundStore } from '@/sound-store'
type Refs = { reel: HTMLDivElement; reelInner: HTMLDivElement }

export default defineComponent({
  name: 'SlotReel',
  props: ['value', 'reelNumber'],
  expose: ['spin', 'lock'],

  data() {
    return {
      clientWidth: document.documentElement.clientWidth,
      ...mapStores(useSlotsStore),
      ...mapState(useSlotsStore, ['locked', 'wasLocked', 'canLock', 'wasThreeInRow']),
      ...mapActions(useSlotsStore, ['setLocked', 'setCanLock']),

      ...mapActions(useSoundStore, ['playSound']),
      ...mapState(useSoundStore, ['sounds', 'soundsLoaded']),

      reelSymbolArray: [] as ReelSymbol[],
      reelIndex: 2,
      tile1Index: 0,
      tile2Index: 1,
      tile3Index: 2,
      tile4Index: 3,
      tile5Index: 4,
      isLocked: false,
      css3dRadius: 0
    }
  },

  beforeMount() {
    this.reelSymbolArray = generateReelSymbolArray()
    this.calculateCss3dRadius()
  },

  mounted() {
    window.addEventListener('resize', this.calculateCss3dRadius)

    const { reelInner } = this.$refs as Refs
    reelInner.addEventListener('transitionend', this.animateEnd)
    this.slotsStore().$onAction(({ name, args, after, store }) => {
      if (name !== 'setLocked') return
      after(() => {
        const key = args[0]
        const storeLockedDiffersFromLocal =
          key == this.reelNumber && store.locked[key] !== this.isLocked
        if (storeLockedDiffersFromLocal) {
          const reelTileData = this.reelSymbolArray[this.reelIndex]
          const canLock = !store.wasLocked && reelTileData.name !== 'Cash'
          if (!canLock) {
            // Revert the locked state set in the store now that we know it can’t actually be locked.
            this.setLocked(this.reelNumber, false)
            this.playSound(Sounds.denied)
          } else {
            this.lock({ silent: false })
          }
        }
      })
    })
  },

  unmounted() {
    window.removeEventListener('resize', this.calculateCss3dRadius)
  },

  methods: {
    calculateCss3dRadius() {
      const { clientWidth } = document.documentElement
      const maxDesktopWidth = 390 // Sync with --tile-width
      const iPhoneMaxWidth = 428 // Sync with --tile-width media-query

      // https://3dtransforms.desandro.com/carousel
      const cellSize = clientWidth <= iPhoneMaxWidth ? clientWidth / 3 : maxDesktopWidth / 3
      const numberOfCells = this.reelSymbolArray.length

      this.css3dRadius = Math.round(cellSize / 2 / Math.tan(Math.PI / numberOfCells))
    },

    spin() {
      this.setCanLock(this.reelNumber, false)
      if (!this.isLocked) {
        // How many positions will it move
        const min = 15
        const max = 35
        let momentum = Math.floor(Math.random() * (max - min + 1) + min)

        if (SLOTBOT) {
          this._disableCssTransition()
          this.reelIndex = this.reelIndex - momentum
          this.afterSpin()
        } else {
          const { reelInner } = this.$refs as Refs
          // Adjust the transition duration to the momentum
          if (reelInner) reelInner.style.transitionDuration = `${momentum * 60}ms`
          this.reelIndex = this.reelIndex - momentum
        }
      } else {
        this.isLocked = false
        this.setLocked(this.reelNumber, false)
        this.$emit('finished', this.reelSymbolArray[this.reelIndex], true, this.reelNumber)
      }
    },

    _disableCssTransition: function () {
      const { reelInner } = this.$refs as Refs
      reelInner.style.transition = `none`
    },

    _reEnableCssTransition: function () {
      const { reelInner } = this.$refs as Refs
      setTimeout(() => {
        reelInner.style.transition = ``
      }, 10)
    },

    animateEnd: function (e: TransitionEvent) {
      const wasReelTransition = (e.target as HTMLElement)?.className.includes('reelInner')
      if (!wasReelTransition) return
      this.afterSpin()
    },

    afterSpin: function () {
      // Normalize index using modulus
      const reelSymbolCount = this.reelSymbolArray.length
      const reelIndex =
        this.reelIndex < 0
          ? this.reelIndex === -reelSymbolCount
            ? 0
            : reelSymbolCount + (this.reelIndex % reelSymbolCount)
          : this.reelIndex

      this._disableCssTransition() // Don’t animate the re-index
      this.reelIndex = reelIndex
      this._reEnableCssTransition()

      const reelTileData = this.reelSymbolArray[reelIndex]
      // Play win or spin-end sound
      if (reelTileData.name === 'Cash') {
        this.playSound(Sounds.cashWin)
      } else {
        this.playSound(Sounds.spinEnd)
      }

      const canLock = !this.wasLocked() && !this.wasThreeInRow() && reelTileData.name !== 'Cash'
      this.setCanLock(this.reelNumber, canLock)
      this.setLocked(this.reelNumber, false)

      // Tell the app this reel finished spinning
      this.$emit('finished', reelTileData, false, this.reelNumber)
    },

    lock: function (options?: { silent: boolean }) {
      const canLock = this.canLock()[this.reelNumber]
      if (!canLock && !options?.silent) {
        this.playSound(Sounds.denied)
        return
      } else {
        this.isLocked = !this.isLocked
        if (!options?.silent) this.playSound(Sounds.lock)
        this.setLocked(this.reelNumber, this.isLocked)
      }
    }
  }
})
</script>

<template>
  <div class="container" v-on:mousedown="lock()">
    <div class="reelOuter">
      <div
        class="reelInner"
        ref="reelInner"
        v-bind:style="{
          transform: `rotateY(0deg) rotateX(${(reelIndex * 360) / reelSymbolArray.length}deg)`
        }"
      >
        <img
          class="reelImage"
          v-bind:class="{ modLocked: isLocked }"
          v-for="(reelSymbol, index) in reelSymbolArray"
          :src="reelSymbol.image"
          v-bind:key="reelSymbol.name + index"
          v-bind:style="{
            transform: `rotateX(${
              (360 / reelSymbolArray.length) * index * -1
            }deg) translateZ(${css3dRadius}px)`
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.container {
  z-index: 1;
  display: flex;
  width: var(--tile-size);
  background-color: var(--color-chrome);
  flex-direction: column;
  align-items: center;
}

.reelOuter {
  width: var(--tile-size);
  height: calc(var(--tile-size) + var(--tile-size) / 3 * 4);
  perspective: 12000px;
  perspective-origin: center;
  overflow: hidden;
  background: rgb(255 255 255);

  &:not(:last-child) {
    border-right: 1px solid rgb(0 0 0 / 10%);
  }
}

.reelInner {
  position: relative;
  top: calc(var(--tile-size) / 3 * 2);
  transition-property: transform;
  transition-duration: 1000ms;
  transition-timing-function: ease-out;
  transform-style: preserve-3d;
  transform-origin: center 62.5px;
}

.container.move .reelInner {
  transform: translateY(calc(var(--tile-size)));
  transition: transform 0.065s linear;
}

@media screen and (max-width: 375px) {
  .container.move .reelInner {
    transition: transform 0.05s linear;
  }
}

.reelImage {
  position: absolute;
  width: var(--tile-size);
  background-color: #fff;
  backface-visibility: hidden;
  transition: background-color 200ms;

  &.modLocked {
    background: rgb(239 239 239);
  }
}
</style>
