<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StyledButton',
  props: ['text', 'disabled', 'pressed', 'modLarge']
})
</script>

<template>
  <div
    class="button"
    v-bind:class="{ modLarge, modPressed: pressed }"
    v-on:mousedown="$emit('clicked')"
  >
    <a
      href="#"
      v-bind:class="{
        modLarge,
        modPressed: pressed,
        modDisabled: disabled
      }"
      >{{ text }}</a
    >
  </div>
</template>

<style lang="postcss" scoped>
.button {
  --fadeMs: 180ms;

  position: relative;
  padding: 6px;
  background-color: rgb(255 255 255 / 5%);
  background-image: linear-gradient(
    0deg,
    rgb(78 78 78 / 15%) 0%,
    rgb(65 65 65 / 15%) 2%,
    rgb(59 59 59 / 15%) 5%,
    rgb(56 56 56 / 15%) 32%,
    rgb(54 54 54 / 15%) 33%,
    rgb(53 53 53 / 15%) 46%,
    rgb(51 51 51 / 15%) 47%,
    rgb(50 50 50 / 15%) 60%,
    rgb(48 48 48 / 15%) 61%,
    rgb(42 42 42 / 15%) 100%
  );
  background-size: 4px 4px;
  border-radius: 5px;
  box-shadow:
    /* top border */ rgb(255 255 255 / 10%) 0 1px 0 0 inset,
    /* top soft border */ rgb(255 255 255 / 15%) 0 1px 0 1px inset,
    /* bottom shadow soft */ rgb(0 0 0 / 10%) 0 2px 2px 0,
    /* bottom shadow sharp */ rgb(0 0 0 / 25%) 0 0 2px 1px;
  flex: 2 1 33.333%;
  isolation: isolate; /* allows border-radius overflow to be hidden */
  transition: box-shadow 300ms ease-out;

  &::before,
  &::after {
    position: absolute;
    display: block;
    background-repeat: no-repeat;
    content: '';
    opacity: 0;
    transition-duration: 0;
    transition-property: height opacity;
    transition-timing-function: ease-in;
  }

  &::after {
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;

    /* top border highlight */
    background-image: linear-gradient(
      90deg,
      rgb(255 255 255 / 0%) 0%,
      rgb(255 255 255 / 0%) 20%,
      rgb(255 255 255 / 20%) 40%,
      rgb(255 255 255 / 20%) 60%,
      rgb(255 255 255 / 0%) 80%,
      rgb(255 255 255 / 0%) 100%
    );
    opacity: 1;
  }

  &.modLarge {
    flex: none;
  }

  &.modPressed {
    background-image: linear-gradient(transparent 50%, #2e2e2e 50%);
    background-size: 2px 2px;
    box-shadow: rgb(0 0 0 / 15%) 0 1px 0 0 inset, rgb(0 0 0 / 30%) 0 1px 0 1px inset,
      rgb(0 0 0 / 30%) 0 2px 2px 0, rgb(0 0 0 / 5%) 0 0 2px 1px;

    &::before {
      top: -2px;
      left: 10%;
      width: 80%;
      height: 2px;
      background-image: radial-gradient(
        rgb(var(--primary-rgb) / 41%) 0%,
        rgb(var(--primary-rgb) / 1%) 53%,
        rgb(var(--primary-rgb) / 0%) 54%,
        rgb(var(--primary-rgb) / 0%) 57%
      );
      box-shadow: rgb(var(--primary-rgb) / 2%) 0 0 0 3px inset;
      opacity: 1;
      transition-duration: var(--fadeMs);
    }

    &::after {
      top: inherit;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 4px;
      background-image: radial-gradient(
        rgb(var(--primary-rgb) / 51%) 0%,
        rgb(var(--primary-rgb) / 1%) 53%,
        rgb(var(--primary-rgb) / 0%) 54%,
        rgb(var(--primary-rgb) / 0%) 57%
      );
      background-size: 100% 11px;

      /* box-shadow: rgb(255 255 255 / 5%) 0 -5px 0 0 inset; */
      opacity: 1;
      transition-duration: var(--fadeMs);
    }
  }
}

li:has(+ .modPressed):not(.modPressed) {
  &::before {
    top: 5%;
    right: 0;
    width: 1px;
    height: 90%;
    background-image: linear-gradient(
      0deg,
      rgb(var(--primary-rgb) / 0%) 0%,
      rgb(var(--primary-rgb) / 70%) 50%,
      rgb(var(--primary-rgb) / 69%) 51%,
      rgb(var(--primary-rgb) / 0%) 100%
    );
    box-shadow: rgb(var(--primary-rgb) / 5%) -1px 0 0 0;
    opacity: 1;
    transition-duration: var(--fadeMs);
  }
}

li.modPressed + li:not(.modPressed) {
  &::before {
    top: 5%;
    left: 0;
    width: 1px;
    height: 90%;
    background-image: linear-gradient(
      0deg,
      rgb(var(--primary-rgb) / 0%) 0%,
      rgb(var(--primary-rgb) / 50%) 50%,
      rgb(var(--primary-rgb) / 40%) 51%,
      rgb(var(--primary-rgb) / 0%) 100%
    );
    box-shadow: rgb(var(--primary-rgb) / 5%) 1px 0 0 0;
    opacity: 1;
    transition-duration: var(--fadeMs);
  }
}

a {
  display: block;
  padding: 6px 0;
  color: rgb(255 255 255 / 75%);
  font-size: 15px;
  letter-spacing: 1px;
  text-align: center;
  background-color: rgb(182 182 182 / 1.8%);
  border-radius: 6px;
  transition: color 400ms, background-color 200ms;
  user-select: none;
  text-shadow: rgb(255 255 255 / 50%) 0 0 4px;
  text-decoration: none;

  &:active {
    background-color: rgb(182 182 182 / 5%);
  }

  &:focus {
    background-color: rgb(182 182 182 / 1.8%);
  }

  &.modLarge {
    padding: 16px 32px;
  }

  &.modPressed {
    color: rgb(var(--primary-rgb) / 95%);
    background: none;
    text-shadow: rgb(var(--primary-rgb) / 50%) 0 0 2px, rgb(255 255 255 / 140%) 0 0 35px,
      rgb(var(--primary-rgb) / 95%) 0 0 25px;
  }

  &.modDisabled {
    color: rgb(255 255 255 / 35%);
    text-shadow: rgb(0 0 0 /40%) 0 -1px 0;

    &:active {
      color: rgb(255 255 255 / 25%);
    }
  }
}
</style>
