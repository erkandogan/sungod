<template>
    <div class="sg-compare">
        <div class="sg-compare__scene">
            <img class="sg-compare__scene__naked-eye" :src="selectedScene?.nakedEyeImage?.responsiveImage?.src" />
            <span class="sg-compare__scene__naked-eye--text">Naked Eye</span>
            <img class="sg-compare__scene__lens-image"
                :style="{ clipPath: `polygon(${range}% 0px, 100% 0px, 100% 100%, ${range}% 100%)` }"
                :src="selectedLens?.image?.responsiveImage?.src">
            <img class="sg-compare__scene__lens-logo" :src="useImages().getImageSrc(selectedLens?.lensType + '.svg')">
            <input v-model="range" class="sg-compare__scene__range" min="5" max="95" type="range">
            <img :style="{ left: `calc(${range}% - 28px)` }" class="sg-compare__scene__grab-icon"
                src="~/assets/images/cursor-dragging.svg">
        </div>
        <div class="sg-compare__scene-select">
            <img class="sg-compare__scene-select__item" v-on:click="sceneSelected(item.sceneName)"
                v-for="(item, index) in sceneList" :src="item.nakedEyeImage?.responsiveImage?.src || ''" :key="index" />
            <div class="sg-compare__scene-select__close">
                <XMarkIcon class="w-[24px] h-[24px]"></XMarkIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGuideOptions } from "../stores/guide-options";
import { useSceneData } from "../stores/scene-data";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { useImages } from "../composables/dynamic-image.composable";

const sceneStore = useSceneData();
const optionsStore = useGuideOptions();
const sceneList = computed<any[]>(() => sceneStore.sceneData.scenes);
const guideOptions = computed(() => optionsStore.guideOptions);
const selectedScene = ref();
const selectedLens = ref();
const range = ref(50);

if (sceneList.value.length > 0 && guideOptions.value.selectedScene !== '') {
    selectedScene.value = sceneList.value.find(item => item.sceneName === guideOptions.value.selectedScene);
    selectedLens.value = Object.values(selectedScene.value.sceneImages).find((item: any) => item.lensType === guideOptions.value.selectedLens && item.lensColour === guideOptions.value.selectedColour);
}
if (sceneList.value.length > 0 && guideOptions.value.selectedScene !== '') {
    selectedScene.value = sceneList.value.find(item => item.sceneName === guideOptions.value.selectedScene);
}
optionsStore.$subscribe((mutation, state) => {
    const newOptions = state.guideOptions;
    if (newOptions && newOptions.selectedScene !== selectedScene.value.sceneName) {
        selectedScene.value = sceneList.value.find(item => item.sceneName === newOptions.selectedScene);
        selectedLens.value = Object.values(selectedScene.value.sceneImages).find((item: any) => item.lensType === newOptions.selectedLens && item.lensColour === newOptions.selectedColour);
    } else {
        selectedLens.value = Object.values(selectedScene.value.sceneImages).find((item: any) => item.lensType === newOptions.selectedLens && item.lensColour === newOptions.selectedColour);
    }
});

const sceneSelected = (item: any) => {
    optionsStore.changeScene(item);
}

</script>
<style lang="scss">
.sg-compare {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1 1 60%;
    height: 100%;
    border-radius: 10px;

    &__scene {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        user-select: none;

        &__naked-eye {
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 10;
            object-fit: cover;
            object-position: center;
            user-select: none;
        }

        &__naked-eye--text {
            position: absolute;
            z-index: 15;
            bottom: 32px;
            left: 32px;
            color: white;
            font-size: 18px;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0.18px;
            user-select: none;
        }

        &__lens-image {
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 20;
            object-fit: cover;
            object-position: center;
            user-select: none;
        }

        &__lens-logo {
            position: absolute;
            z-index: 25;
            bottom: 32px;
            right: 32px;
            filter: invert(1);
        }

        &__grab-icon {
            position: absolute;
            user-select: none;
            z-index: 25;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 56px;
            height: 56px;
            border: 0;
            border-radius: 50%;
        }

        &__range {
            position: absolute;
            height: 100%;
            width: 90%;
            z-index: 30;
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            cursor: grab;

            &:active {
                cursor: grabbing;
            }

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 56px;
                height: 56px;
                border: 0;
                border-radius: 50%;
                background: transparent;
            }
        }
    }

    &__scene-select {
        position: absolute;
        z-index: 40;
        left: 0;
        right: 0;
        bottom: 66px;
        width: max-content;
        margin: auto;
        background: white;
        border-radius: 10px;
        display: flex;
        padding: 4px;
        gap: 4px;

        &__item {
            width: 52px;
            height: 52px;
            border-radius: 10px;
            cursor: pointer;
        }

        &__close {
            width: 52px;
            height: 52px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

}
</style>