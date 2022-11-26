<template>
    <div class="w-full h-screen bg-yellow-300 flex flex-col justify-center items-center">
        <div id="cropper-container" class="w-[50%] h-[50%]">
        <cropper ref="cropper"
            :src="img.src"
            :stencil-props="{
                handlers: {},
                moveable: false,
                scaleable: true,
                aspectRatio: 3/2
            }"
            :resize-image="{
                adjustStencil: false
            }"
            image-restriction="stencil"
        />
        </div>
        <div id="image-input" class="mt-4">
            <input :v-on="img" type="file" @change="onFileChange">
        </div>
        <button @click="uploadImage">Upload</button>
        <DropFile @fileSelected="img.src"></DropFile>
        {{img.src}}
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
            src: '/sample_images/patmcafee.jpeg',
            name: "patmcafee.jpeg"
        })

        const onFileChange = (e) => {
            const file = e.target.files[0];
            const filename = file.name;
            img.name = filename
            const extension = filename.split(".").pop()

            if (extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'png' || extension.toLowerCase() == 'gif' || extension.toLowerCase() == 'jpeg') {
                const pathtoFile = window.URL.createObjectURL(file)
                img.src = window.URL.createObjectURL(file)
                console.log(img)
                return true
            } else {
                return false
            }  
        }

        const uploadImage = () => {
            if (cropper.value) {
                const { canvas } = cropper.value.getResult();
                const testToken = token.value
                try {
                    const formData = new FormData();
                    canvas.toBlob(blob => {
                        var file = new File([blob], img.name)
                        formData.append('file', file);
                        axios.post("http://localhost:8080/api/v2/articles/uploadImage", formData, {
                            headers: {
                                "Content-Type" : "multipart/form-data",
                                "Authorization" : `Bearer ${token.value}`
                            }
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
            onFileChange,
            uploadImage
        }  
    }
});

</script>