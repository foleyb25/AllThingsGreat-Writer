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
            <ArticleComponent :title="title" numcomments="XX" :category="category" :imageUrl="imagePath"></ArticleComponent>
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
import ArticleComponent from "../components/ArticleComponent.vue"

export default {
    name: 'ArticleEditComponent',
    props: ['article'],
    components: {ArticleComponent},
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