<template>
  <div class="flex flex-col items-center justify-center h-screen relative bg-[#3d3d3d] p-4 pt-0">
    <div class="flex justify-end items-center w-full h-[66px]">
      <a class="text-white">Close</a>
    </div>
    <div class="sg-guide">
      <div class="sg-guide__choice">
        <h1 class="sg-guide__choice__title">{{ productData?.renegades?.name }}</h1>
        <img class="sg-guide__choice__image" src="~/assets/images/renegade.png">
        <GuideOptions></GuideOptions>
      </div>
      <div class="sg-guide__preview">
        <GuideCompare></GuideCompare>
      </div>
      <div class="sg-guide__message">
        Could you please switch back to desktop view?<br> I haven't implemented a responsive design yet 😊
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.sg-guide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 66px);
  background: white;
  border-radius: 10px;
  overflow: hidden;

  &__choice {
    flex: 1 1 40%;
    max-width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 64px;
    overflow-x: hidden;
    overflow-y: auto;

    @media (max-width : 1100px) {
      display: none;
    }

    &::-webkit-scrollbar {
      border: none;
    }

    &__image {
      width: 368px;
      height: auto;
      margin-top: 64px;
    }

    &__title {
      color: #1a1a1a;
      font-size: 48px;
      font-style: normal;
      font-weight: 400;
      line-height: 110%;
      letter-spacing: -0.48px;
    }
  }

  &__preview {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1 1 60%;
    height: 100%;

    @media (max-width: 1100px) {
      display: none;
    }
  }

  &__message {
    display: none;
    justify-content: center;
    align-items: center;
    margin: auto;
    text-align: center;
    height: 100%;

    @media (max-width: 1100px) {
      display: flex;
    }
  }
}
</style>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { useSceneData } from "../stores/scene-data";
import { fetchScenes, fetchProducts } from "../services/http";

const store = useSceneData()
const productData = computed(() => store.sceneData.productData);

store.setScenes(await fetchScenes());
store.setProductData(await fetchProducts());


</script>
