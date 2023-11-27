import { defineStore } from "pinia";

export const useGuideOptions = defineStore("guide-options", () => {
  const guideOptions = ref({
    selectedLens: {},
    selectedColour: {},
    selectedScene: {},
  });
  const changeLens = (value: any) => {
    guideOptions.value.selectedLens = value;
  };
  const changeColour = (value: any) => {
    guideOptions.value.selectedColour = value;
  };
  const changeScene = (value: any) => {
    guideOptions.value.selectedScene = value;
  };
  return { changeLens, changeColour, changeScene, guideOptions };
});
