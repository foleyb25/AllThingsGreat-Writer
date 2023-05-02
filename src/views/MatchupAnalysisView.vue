<template>
	<div
		class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
	>
		<div class="relative py-3 sm:max-w-xl sm:mx-auto">
			<div
				class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10"
			>
				<div
					class="max-w-md mx-auto flex flex-col justify-center items-center"
				>
					<div class="flex items-center space-x-5">
						<div class="w-1/2">
							<label
								for="dropdown1"
								class="text-sm font-semibold text-gray-700"
								>Dropdown 1:</label
							>
							<select
								id="dropdown1"
								class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								v-model="leftTeam"
							>
								<option v-for="team in nflTeams">
									{{ team }}
								</option>
							</select>
						</div>
						<div class="text-xl font-semibold text-gray-700">
							vs.
						</div>
						<div class="w-1/2">
							<label
								for="dropdown2"
								class="text-sm font-semibold text-gray-700"
								>Dropdown 2:</label
							>
							<select
								id="dropdown2"
								class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								v-model="rightTeam"
							>
								<option v-for="team in nflTeams">
									{{ team }}
								</option>
							</select>
						</div>
					</div>
					<button
						@click="handleAnalyze"
						class="p-2 bg-blue-600 text-white rounded mt-4 w-1/4"
						:disabled="isAnalyzing"
					>
						{{ isAnalyzing ? "Analyzing..." : "Analyze" }}
					</button>
				</div>
			</div>
			<h1>Analysis:</h1>
			<div>{{ matchupAnalysis }}</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/article.store";

const { matchupAnalysis } = storeToRefs(useArticleStore());
const { analyzeMatchup } = useArticleStore();

const nflTeams = [
	"Kansas City",
	"Philadelphia",
	"Buffalo",
	"Dallas",
	"Detroit",
	"San Francisco",
	"Cincinnati",
	"Minnesota",
	"Jacksonville",
	"Seattle",
	"Miami",
	"LA Chargers",
	"Las Vegas",
	"Green Bay",
	"Atlanta",
	"New England",
	"Cleveland",
	"NY Giants",
	"Carolina",
	"Baltimore",
	"Arizona",
	"New Orleans",
	"Chicago",
	"Washington",
	"Tampa Bay",
	"Pittsburgh",
	"LA Rams",
	"Tennessee",
	"NY Jets",
	"Houston",
	"Indianapolis",
	"Denver",
];

const leftTeam = ref("Denver");
const rightTeam = ref("Kansas City");
const isAnalyzing = ref(false);

const handleAnalyze = async () => {
	isAnalyzing.value = true;
	await analyzeMatchup(leftTeam.value, rightTeam.value);
	isAnalyzing.value = false;
};
</script>

<style scoped></style>
