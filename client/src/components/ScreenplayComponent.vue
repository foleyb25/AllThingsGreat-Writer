<template>
    <div class="flex flex-col justify-center items-center">
        <div class="h-[80%] w-full overflow-hidden flex flex-col justify-center items-center">
            <img class="h-full w-[80%] object-fit" :src="screenplay.Poster" alt="">
        </div>
        <div class="p-3 h-[20%]">
            <div class="h-[50%] font-semibold p-1">
                {{screenplay.Title}}
            </div>
            <div v-if="isNaN(Number(screenplay.Year.charAt(screenplay.Year.length-1)))" class="year-released w-100 font-italic text-center">
                {{screenplay.Year}}Present
            </div>
            <div v-if="!isNaN(Number(screenplay.Year.charAt(screenplay.Year.length-1)))" class="year-released w-100 font-italic text-center">
                {{screenplay.Year}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ScreenplayComponent",
    props: ['screenplay']
}
</script>