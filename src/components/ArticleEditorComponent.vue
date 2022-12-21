<template>
    <div>
        <div>
            <label for="title" class="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
            <input type="text" id="title" v-model="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..." required>
        </div>
        <div>
            <label for="title" class="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Body</label>
            <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <div>
            <label for="category" class="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Category</label>
            <select name="category" v-model="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
            <ArticleComponent class="border border-black rounded-md " :title="title" numcomments="XX" :category="category" :imageUrl="imagePath"></ArticleComponent>
        </div>
        <div class="mt-4">
            <input :v-on="imagePath" @click.native.prevent="handleGetAwsImages" type="file" @change="onFileChange">
        </div>
        <div class="mt-4">
            <button v-if="!article" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25" :disabled="isDisabled" @click="handleSubmit()">Create</button>
        </div>
        <div class="mt-4">
            <button v-if="article" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25" :disabled="isDisabled" @click="handleUpdate()">Update</button>
        </div>
        <label for="img" class="block m-2 mt-20 text-sm font-medium text-gray-900 dark:text-gray-300">Article Preview</label>
        <div class="bg-white">
            <span v-html="editorData"></span>
        </div>

         <!-- Modal component -->
         <transition name="modal">
            <ImagePickerModalComponent v-if="showModal" v-model:imageUrls="awsImageUrls" @close-modal="showModal = false" @select-image="selectImage"/>
         </transition>
       
    </div>
</template>

<script>
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
            editorData: this.article ? this.article.bodyHTML : "<p>Write your masterpiece...",
            title: this.article ? this.article.title : "",
            category: this.article ? this.article.category : "AllThingsGreat",
            isDisabled: this.article ? false : true,
            btnText: this.article ? "Update" : "Create",
            imagePath: this.article ? this.article.imageUrl : "/src/assets/images/1669432796163-181228722+missing_img.jpeg",
            awsImageUrls: [],
            accessToken: useAuth0().getAccessTokenSilently,
            showModal: false
        }
    },

    methods: {
        onFileChange(e) {
            
        },

        handleGetAwsImages(e) {
            if(this.awsImageUrls.length > 0) {
                this.showModal = true
                return
            }
            getImageUrls(this.accessToken)
            .then((result) => {
                if(result.status >= 200 && result.status < 300)
                    console.log(result)
                    this.awsImageUrls = result.data
                    this.showModal = true
            }).catch( (err) => {
                console.log(err)
            })
        },

        async handleSubmit(e) {
        
        },

        async handleUpdate(e) {
            console.log("update")
        },

        selectImage(url) {
            this.imagePath = url
            this.isDisabled = false
        }
    },

    mounted() {
        console.log("Article Editor Component Mounted")
    }
})
</script>

<style scoped>
    .modal-enter {
    /* Define the starting state for the enter transition */
    transform: scale(0.9);
    opacity: 0;
  }
  .modal-enter-active {
    /* Define the ending state for the enter transition */
    transform: scale(1);
    opacity: 1;
    transition: all 0.3s ease-out;
  }
  .modal-leave {
    /* Define the starting state for the leave transition */
    transform: scale(1);
    opacity: 1;
  }
  .modal-leave-active {
    /* Define the ending state for the leave transition */
    transform: scale(0.9);
    opacity: 0;
    transition: all 0.3s ease-out;
  }
</style>