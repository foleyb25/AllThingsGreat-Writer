<template>
    <div class="flex flex-row justify-center mt-4">
        <div>
            <TopicsComponent class="mr-4 shadow-2xl"></TopicsComponent>
        </div>
        <ContentComponent class="ml-4 max-h-screen bg-gray-50 w-1/2 overflow-scroll shadow-2xl"></ContentComponent>
    </div>
</template>

<script>
import ContentComponent from "../components/ContentComponent.vue"
import TopicsComponent from "../components/TopicsComponent.vue"

export default {
    name: "HomeView",
    components: {ContentComponent, TopicsComponent}
}
</script>