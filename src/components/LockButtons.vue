<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import StyledButton from '@/components/StyledButton.vue'
import { useSlotsStore } from '../slots-store'

export default defineComponent({
  name: 'LockButtons',
  components: {
    StyledButton
  },
  data() {
    return {
      ...mapState(useSlotsStore, ['locked', 'wasLocked', 'canLock']),
      ...mapActions(useSlotsStore, ['setLocked'])
    }
  }
})
</script>

<template>
  <StyledButton
    text="Hold"
    v-on:clicked="setLocked(0)"
    v-bind:pressed="locked()[0]"
    v-bind:disabled="!canLock()[0]"
  />
  <StyledButton
    text="Hold"
    v-on:clicked="setLocked(1)"
    v-bind:pressed="locked()[1]"
    v-bind:disabled="!canLock()[1]"
  />
  <StyledButton
    text="Hold"
    v-on:clicked="setLocked(2)"
    v-bind:pressed="locked()[2]"
    v-bind:disabled="!canLock()[2]"
  />
</template>
