<template>
    <div>
        <div>
            <label for="title" class="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
            <input type="text" id="title" v-model="state.title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..." required>
        </div>
        <div>
            <label for="title" class="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Body</label>
            <ckeditor v-model="state.editorData" :config="state.editorConfig"></ckeditor>
        </div>
        <div>
            <label for="category" class="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Category</label>
            <select name="category" v-model="state.category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option value="AllThingsGreat">AllThingsGreat</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Gaming">Gaming</option>
                <option value="Investments">Investments</option>
                <option value="History">History</option>
            </select>
        </div>
        <div>
            <label for="img" class="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Article Thumbnail Preview</label>
            <div class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <ArticleComponent :title="title" numcomments="XX" :category="category" :imageUrl="state.imagePath"></ArticleComponent>
            </div>
        </div>
        <div class="mt-4">
            <input :v-on="state.imagePath" @click.prevent="handleGetAwsImages" type="file" @change="onFileChange">
        </div>
        <div v-if="error">Error: {{error}}</div>
        <div v-if="!loading" class="mt-4 flex flex-row">
            <button v-if="!props.article" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25" :disabled="state.isDisabled" @click="handleSubmit()">Create</button>
            <button v-if="props.article" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25" :disabled="state.isDisabled" @click="handleUpdate()">Update</button>
            <button class=" ml-8 bg-yellow-200 hover:bg-yellow-400 text-black font-bold py-2 px-4 border border-yellow-400 rounded disabled:opacity-25" @click="handleSaveDraft">Save Draft</button>
        </div>
        
        <label for="img" class="block m-2 mt-20 text-sm font-medium text-gray-900 dark:text-gray-300">Article Preview</label>
        <div class="bg-white">
            <span v-html="state.editorData"></span>
        </div>

         <!-- Modal component -->
         <transition name="fade" appear>
            <ImagePickerModalComponent v-if="state.showModal" v-model:imageUrls="state.awsImageUrls" @close-modal="state.showModal = false" @select-image="selectImage"/>
         </transition>
       
    </div>
</template>

<script setup> 
import ArticleComponent from "../components/ArticleComponent.vue"
import ImagePickerModalComponent from "./article/ImagePickerModalComponent.vue"
import { useAuth0 } from '@auth0/auth0-vue';
import { getImageUrls, createNewArticle} from "../services/apiRequest.service";
import { reactive } from 'vue';
import { storeToRefs } from 'pinia'
import { useWriterStore } from '../stores/writer.store'

const {error, loading } = storeToRefs(useWriterStore())
const { saveDraft } = useWriterStore()

const props = defineProps(['article'])

const state = reactive({
    editorConfig: {
        toolbar: [
            {name: 'utils', items: ['Source', 'Scayt']},
            {name: 'styling', items: ['Bold', 'Italic', 'Underline','Strike']},
            {name: 'formatting', items: ['NumberedList', 'BulletedList', 'Blockquote']},
            {name: 'linking', items: ['Link', 'Unlink', 'Image', "Iframe"]}
        ],
        height: "400px",
        allowedContent: true,
    },
    editorData: props.article ? props.article.bodyHTML : "<p>Write your masterpiece...</p>",
    title: props.article ? props.article.title : "",
    moods: [],
    tags: [],
    category: props.article ? props.article.category : "AllThingsGreat",
    isDisabled: props.article ? false : true,
    btnText: props.article ? "Update" : "Create",
    imagePath: props.article ? props.article.imageUrl : "/src/assets/images/1669432796163-181228722+missing_img.jpeg",
    awsImageUrls: [],
    accessToken: useAuth0().getAccessTokenSilently,
    showModal: false,
    user: useAuth0().user
})

const handleGetAwsImages = () => {
    console.log("HANDLE AWS IMAGE GET")
    if(state.awsImageUrls.length > 0) {
        state.showModal = true
        return
    }
    getImageUrls(state.accessToken)
    .then((result) => {
        if(result.status >= 200 && result.status < 300)
            console.log(result)
            state.awsImageUrls = result.data
            state.showModal = true
    }).catch( (err) => {
        console.log(err)
    })
}

const selectImage = (url) => {
    state.imagePath = url
    state.isDisabled = false
}

const handleSubmit = async () => {
    const mongoId = state.user.mongoId
    const formdata ={
        title: state.title,
        bodyHTML: state.editorData,
        imageUrl: state.imagePath,
        writer: mongoId,
        moods: state.moods,
        tags: state.tags
    }
    
    createNewArticle(state.accessToken, formdata)
    console.log(useAuth0())
    .then( (res) => {
        console.log(res.data)
    }).catch( (err) => {
        console.log(err)
    })

}

const handleSaveDraft = async (e) => {
    //Patch request
    const body = {
        title: state.title,
        bodyHTML: state.editorData,
        imageUrl: state.imagePath,
        category: state.category,
        tags: state.tags,
        moods: state.moods
    }
    const response = await saveDraft(body)
}

const handleUpdate = async (e) => {

}
</script>

<!-- <script>
import Axios from 'axios'
import ArticleComponent from "../components/ArticleComponent.vue"
import ImagePickerModalComponent from "./article/ImagePickerModalComponent.vue"
import { useAuth0 } from '@auth0/auth0-vue';
import { getImageUrls } from "../services/apiRequest.service";
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ArticleEditComponent',
    props: ['article'],
    components: {ArticleComponent, ImagePickerModalComponent},

    data() {
        return {
            editorConfig: {
                toolbar: [
                    {name: 'utils', items: ['Source', 'Scayt']},
                    {name: 'styling', items: ['Bold', 'Italic', 'Underline','Strike']},
                    {name: 'formatting', items: ['NumberedList', 'BulletedList', 'Blockquote']},
                    {name: 'linking', items: ['Link', 'Unlink', 'Image', "Iframe"]}
                ],
                height: "400px",
                allowedContent: true,
            },
            editorData: props.article ? props.article.bodyHTML : "<p>Write your masterpiece...",
            title: props.article ? props.article.title : "",
            category: props.article ? props.article.category : "AllThingsGreat",
            isDisabled: props.article ? false : true,
            btnText: props.article ? "Update" : "Create",
            imagePath: props.article ? props.article.imageUrl : "/src/assets/images/1669432796163-181228722+missing_img.jpeg",
            awsImageUrls: [],
            accessToken: useAuth0().getAccessTokenSilently,
            showModal: false
        }
    },
})
</script> -->

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>