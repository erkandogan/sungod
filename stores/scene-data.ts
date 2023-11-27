import { defineStore } from "pinia";
import { useGuideOptions } from "./guide-options";

export const useSceneData = defineStore("scene-data", () => {
  const sceneData = ref({
    scenes: [],
    productData: {},
    availableLensOptions: [{
      sceneName:'',
      lensColours:[],
      lensTypes:[]
    }],
  });
  const setScenes = (value: any) => {
    sceneData.value.scenes = value;
    setAvailableOptions(getAvailableLensOptions(sceneData.value.scenes));
    const optionsStore = useGuideOptions();
    optionsStore.changeLens(sceneData.value.availableLensOptions[0].lensColours[0]);
    optionsStore.changeColour(sceneData.value.availableLensOptions[0].lensTypes[0]);
    optionsStore.changeScene(sceneData.value.availableLensOptions[0].sceneName)

  };
  const setProductData = (value: any) => {
    sceneData.value.productData = value;
  };
  const setAvailableOptions = (value: any) => {
    sceneData.value.availableLensOptions = value;
  };

  return { setScenes, setProductData, sceneData };
});

interface Result {
  sceneName: string;
  lensColours: string[];
  lensTypes: string[];
}
const getAvailableLensOptions = (scenes: any[]): Result[] => {
  return scenes.map((scene) => {
    const { sceneName, sceneImages } = scene;
    const result: Result = {
      sceneName,
      lensColours: [],
      lensTypes: [],
    };

    Object.values(sceneImages).forEach((image: any) => {
      const { lensColour, lensType } = image;

      if (!result.lensColours.includes(lensColour)) {
        result.lensColours.push(lensColour);
      }

      if (!result.lensTypes.includes(lensType)) {
        result.lensTypes.push(lensType);
      }
    });

    return result;
  });
};
