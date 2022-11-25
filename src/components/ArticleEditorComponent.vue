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
            <div class="aspect-[14/15] bg-blue-300 border border-black w-1/3">
                <div class="h-[47%] w-full relative overflow-hidden">
                    <img class="h-full w-full object-cover" :src="imagePath" alt="">
                </div>
                <div class="p-3 h-[53%]"> 
                    <div class="h-[65%] font-semibold p-1">
                        {{title}}
                    </div>
                    <div class="flex items-center font-light h-[10%] p-1">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 comments</a>
                    </div>
                    <div class="font-light text-slate-300">
                        {{category}}
                    </div>
                    <div class="font-light text-slate-300">
                        Article Author
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <input :v-on="imagePath" type="file" @change="onFileChange">
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
    </div>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'ArticleEditComponent',
    props: ['article'],
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
            imagePath: this.article ? this.article.imageUrl : "/src/assets/images/missing_img.jpeg"

        }
    },

    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            const filename = file.name;
            const extension = filename.split(".").pop()

            if (extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'png' || extension.toLowerCase() == 'gif' || extension.toLowerCase() == 'jpeg') {
                this.imagePath = window.URL.createObjectURL(file)
                this.isDisabled = false
                return true
            } else {
                return false
            }  
        },

        async handleSubmit(e) {
            try {
                const res = await Axios.post("http://localhost:8080/api/articles", {title: this.title, bodyHTML: this.editorData, category: this.category, imagePath: this.imagePath}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            } catch(err) {
                console.log(err)
            }
            
        
        },

        async handleUpdate(e) {
            console.log("update")
        }
    },

    mounted() {
        console.log("Article Editor Component Mounted")
    }
}
</script>