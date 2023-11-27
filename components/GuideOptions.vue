<template>
  <TabGroup as="div" class="sg-options">
    <TabList as="div" class="sg-options__header">
      <Tab as="template" v-slot="{ selected }">
        <button :class="`sg-options__header__item ${selected && 'sg-options__header__item--selected'}`">LENS TYPE</button>
      </Tab>
      <Tab as="template" v-slot="{ selected }">
        <button :class="`sg-options__header__item ${selected && 'sg-options__header__item--selected'}`">LENS
          COLOUR</button>
      </Tab>
    </TabList>
    <TabPanels as="div" class="sg-options__panel">
      <TabPanel as="div" class="sg-options__panel__type">
        <button
          :class="`sg-options__panel__type__item ${guideOptions.selectedLens === item && 'sg-options__panel__type__item--selected'}`"
          v-on:click="typeSelected(item)" v-for="(item, index) in lensOptions.lensTypes.slice().sort()">
          <img :src="useImages().getImageSrc(item + '.svg')">
        </button>
      </TabPanel>
      <TabPanel as="div" class="sg-options__panel__colour">
        <button
          :class="`sg-options__panel__colour__item ${guideOptions.selectedColour === item && 'sg-options__panel__colour__item--selected'}`"
          :style="{ background: lensHexCodes[item] }" v-on:click="colourSelected(item)"
          v-for="(item, index) in lensOptions.lensColours"></button>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
<style lang="scss">
.sg-options {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;

  &__header {
    display: flex;
    width: max-content;
    padding: 4px;
    border-radius: 4px;
    background: #F2F2F5;

    &__item {
      padding: 16px 42px;
      background: transparent;
      color: #1A1A1A;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      letter-spacing: 0.39px;
      border-radius: 4px;

      &--selected {
        color: white;
        background: linear-gradient(73deg, #5C0F99 -1.94%, #3449B8 58.96%, #1799E1 102.64%);
      }
    }
  }

  &__panel {
    margin-top: 16px;

    &__type {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;

      &__item {
        padding: 4px 16px;
        border: 1px solid #D5D8DA;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        flex: 1 1 0;

        &::hover {
          border-color: black;
        }

        &--selected {
          border-color: black;
        }

        img {
          width: 40px;
          height: 49px;
        }
      }
    }

    &__colour {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;

      &__item {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        box-shadow: 0px 0px 13px -6px rgba(0, 0, 0, 0.75);

        &--selected {
          border: 4px solid white;
          outline: 1px solid black;
          padding: 2px;
        }
      }
    }
  }
}
</style>
<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useGuideOptions } from "../stores/guide-options";
import { useSceneData } from "../stores/scene-data";
import { useImages } from "../composables/dynamic-image.composable";
import { lensHexCodes } from "../data/colour.data";

const sceneStore = useSceneData();
const optionsStore = useGuideOptions();
const availableLensOptions = computed(() => sceneStore.sceneData.availableLensOptions);
const guideOptions = computed(() => optionsStore.guideOptions);
const lensOptions = ref();
if (availableLensOptions.value.selectedScene !== '') {
  lensOptions.value = availableLensOptions.value.find(item => item.sceneName === guideOptions.value.selectedScene);
}

optionsStore.$subscribe((mutation, state) => {
  const newOptions = state.guideOptions;
  if (newOptions && newOptions.selectedScene !== lensOptions.value.sceneName) {
    lensOptions.value = availableLensOptions.value.find(item => item.sceneName === guideOptions.value.selectedScene);
    typeSelected(lensOptions.value.lensTypes.slice().sort()[0]);
    colourSelected(lensOptions.value.lensColours[0]);
  }
});

const typeSelected = (item) => {
  optionsStore.changeLens(item);
}
const colourSelected = (item) => {
  optionsStore.changeColour(item);
}
onMounted(() => {
  typeSelected(lensOptions.value.lensTypes.slice().sort()[0]);
  colourSelected(lensOptions.value.lensColours[0]);
})
</script>
