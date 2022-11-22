<template>
    <div>
        <div class="flex flex-col align-items-center">
            <input type="text" v-model="searchString" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." @keypress="clearContents($event)">
            <div v-if="loading">Page Results Are Loading</div>
            <button v-if="!loading" @click="search()"  class="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25">Search</button>
        </div>
        <div class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <div v-for="screenplay in screenplayList" class="h-full w-full flex justify-center items-center">
                <ScreenplayComponent v-if="screenplayList.length > 0" :screenplay="screenplay" class="font-sans aspect-[2/3] w-full mt-2 mb-2 shadow-2xl"></ScreenplayComponent>
            </div>
        </div>
    </div>
</template>

<script>
import ScreenplayComponent from "../../components/ScreenplayComponent.vue"
import Axios from 'axios'

export default {
    name: "ScreenPlayView",
    components: {ScreenplayComponent},
    data() {
        return {
            screenplayList: [],
            morescreenplays: false,
            pageNum: 1,
            isMore: false,
            noResults: false,
            loading: false,
            searchString: ""
        }
    },

    methods: {
        clearContents: async function() {
            this.screenplayList = [];
            this.pageNum = 1;
            this.isMore = false;
        },
  
        search: async function() {
            if(this.searchString=="") {
                return "You must Search Something"
            }
            try {
                this.loading = true
                const res = await Axios.get(`http://localhost:5002/api/v2/screenplays/${this.pageNum}/${this.searchString}`)
                this.loading = false
                this.morescreenplays = res.data.morescreenplays
                if (this.screenplayList!=undefined) {
                this.screenplayList.push.apply(this.screenplayList, res.data.morescreenplays)
                } else {
                this.screenplayList = res.data.screenplayList
                }
                this.pageNum += 1
                this.isMore = res.data.isMore
                this.noResults = res.data.noResults
                    
            } catch (err) {
                this.loading = false
                console.error(err.toString())
            }
        }
    }
}

</script>
