<template>
     <div class="aspect-[14/15] bg-white shadow-xl rounded border border-black">
        <div class="h-[62%] w-full relative overflow-hidden">
            <img class="h-full w-full object-cover rounded-t" :src="props.imageUrl" alt="">
        </div>
        <div class="p-3 h-[60%]"> 
            <div class="text-xs sm:text-sm md:text-md lg:text-lg break-words line-clamp-3 font-semibold p-1">
                {{props.title}}
            </div>
            <div class="flex items-center font-light h-[10%] p-1 mt-6">
                <svg aria-hidden="true" class="text-xs sm:text-sm md:text-md lg:text-lg w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <p class="ml-2 text-xs sm:text-sm md:text-md lg:text-lg font-bold text-gray-900 dark:text-white">4.95</p>
                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a href="#" class="text-xs sm:text-sm md:text-md lg:text-lg font-medium text-gray-900 underline hover:no-underline dark:text-white">{{props.numcomments}} comments</a>
            </div>
            <div class="text-xs sm:text-sm md:text-md lg:text-lg">
                {{props.category}}
            </div>
            <div class="text-xs sm:text-sm md:text-md lg:text-lg mb">
                Article Author
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['title', 'category', 'numcomments', 'imageUrl'])
</script>