<script lang="ts">
import { defineComponent } from 'vue'
import { symbolData, cashSymbolData } from '../symbol-data'

export default defineComponent({
  name: 'WinLegend',
  data: function () {
    return {
      symbolData: symbolData,
      cashSymbolData: cashSymbolData
    }
  }
})
</script>

<template>
  <div class="legend">
    <div className="items">
      <div class="item" v-bind:key="symbol.name" v-for="symbol in symbolData">
        <div class="itemTitle">€ {{ symbol.value }}.00</div>
        <img class="itemImage" v-bind:src="symbol.image" />
        <img class="itemImage" v-bind:src="symbol.image" />
        <img class="itemImage" v-bind:src="symbol.image" />
      </div>
      <div class="item" v-bind:key="symbol.name" v-for="symbol in cashSymbolData">
        <div class="itemTitle">€ {{ symbol.value }}.00</div>
        <img
          v-for="index in symbol.number"
          :key="index"
          class="itemImage"
          v-bind:src="symbol.image"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.legend {
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  background-color: var(--color-chrome);
  border-radius: 0 0 8px 8px;
}

.items {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.item {
  display: flex;
  width: 100%;
}

.itemTitle {
  width: 58px;
  white-space: nowrap;
  padding-top: 2px;
  color: rgb(120 120 120);
  font-size: 12px;
  text-shadow: rgb(0 0 0 / 50%) 0 1px 0;
}

.itemImage {
  width: 28px;
  height: 28px;
  margin-top: -4px;
}
</style>
