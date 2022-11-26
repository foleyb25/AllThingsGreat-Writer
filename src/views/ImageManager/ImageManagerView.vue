<template>
    <div class="flex flex-col justify-center items-center">
        <div id="cropper-container" class="mb-8 w-[80%]">
        <cropper ref="cropper"
            :src="img.src"
            :stencil-props="{
                handlers: {},
                moveable: false,
                scaleable: false,
                aspectRatio: 3/2
            }"
            :resize-image="{
                adjustStencil: false
            }"
            image-restriction="stencil"
        />
        </div>
        <DropFile @file-selected="setImage"></DropFile>
        <div v-if="img.success" class="flex justify-center items-center w-full bg-green-300 mt-4 border border-black border-solid rounded">Successfully uploaded image</div>
        <button class="w-24 h-12 bg-blue-300 border-solid border-black border rounded mt-4" @click="uploadImage">Upload</button>
    </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-vue";
import {defineComponent, ref, reactive} from "vue"
import DropFile from "../../components/ImageManager/DropFile.vue"
import UploadImages from "vue-upload-drop-images"

export default defineComponent({
    components: {
        Cropper,
        DropFile,
        UploadImages
    },
    setup() {
        const cropper = ref();
        const {getAccessTokenSilently} = useAuth0()
        const token = getAccessTokenSilently()
        var img = reactive({
            src: '/src/assets/images/1669432796163-181228722+missing_img.jpeg',
            name: "",
            success: false
        })

        //This function is called from an emitter in the child, DropFile
        const setImage = (path) => {
            img.src = path.path
            img.name = path.name
        }

        const uploadImage = () => {
            if (img.name == "") return
            if (cropper.value) {
                const { canvas } = cropper.value.getResult();
                const testToken = token.value
                try {
                    const formData = new FormData();
                    canvas.toBlob(blob => {
                        formData.append('file', blob);
                        formData.append('fileName', img.name)
                        axios.post("http://localhost:8080/api/v2/articles/uploadImage", formData, {
                            headers: {
                                "Content-Type" : "multipart/form-data",
                                "Authorization" : `Bearer ${token.value}`
                            }
                        }).then( (data) =>{
                            img.success = true
                        }).catch( (err) => {
                            console.log(err)
                        })
                    }, 'image/jpeg');
                } catch (error) {
                    console.log(error)
                }
            }
        }

        return {
            cropper,
            img,
            uploadImage,
            setImage
        }  
    }
});

</script>