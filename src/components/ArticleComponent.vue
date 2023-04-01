<template>
	<div
		class="aspect-[14/15] bg-white shadow-xl xs:text-lg sm:text-sm md:text-md lg:text-lg rounded border border-black"
	>
		<div class="h-[62%] w-full relative overflow-hidden">
			<img
				class="h-full w-full object-cover rounded-t"
				:src="props.imageUrl"
				alt=""
			/>
		</div>
		<div class="p-3 h-[70%]">
			<div class="h-[50%] break-words line-clamp-3 font-semibold p-1">
				{{ props.title }}
			</div>
			<div class="flex items-center font-light h-[10%]">
				{{ props.numberOfRatings }}
				Rating
				<svg
					aria-hidden="true"
					:class="
						'w-5 h-5' +
						(numberOfRatings
							? ' text-yellow-400'
							: ' text-gray-400')
					"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Rating star</title>
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					></path>
				</svg>
				<p class="ml-2 font-bold text-gray-900 dark:text-white">
					{{
						numberOfRatings
							? rating / numberOfRatings
							: "Not Yet Rated"
					}}
				</p>
				<!-- <span
					class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"
				></span> -->
				<!-- <a
					href="#"
					class="font-medium text-gray-900 underline hover:no-underline dark:text-white"
					>{{ props.numcomments }} comments</a
				> -->
			</div>
			<div class="h-[20%]">
				<div></div>
				{{ props.category }}
				<div
					v-if="moods?.length > 0"
					:class="
						'm-2 inline-block p-1 border border-black rounded ' +
						getMoodColor(moods[0])
					"
				>
					{{ moods[0] }}
				</div>
			</div>
			<div class="h-[10%]">{{ author }}</div>
			<div
				id="article-status-box"
				class="h-[10%] flex flex-row justify-between items-between"
			>
				<div
					v-if="props.isReviewed"
					class="w-1/2 m-1 bg-orange-400 text-center rounded flex justify-center items-center"
				>
					Needs Review
				</div>
				<div
					v-if="props.isArchived"
					class="w-1/2 m-1 bg-blue-400 text-center rounded flex justify-center items-center"
				>
					Archived
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { renderMoodColor } from "../utils/colors.util";

const props = defineProps([
	"title",
	"category",
	"imageUrl",
	"isArchived",
	"isReviewed",
	"numberOfRatings",
	"rating",
	"moods",
	"author",
]);

const getMoodColor = (mood) => {
	return renderMoodColor(mood);
};
</script>
