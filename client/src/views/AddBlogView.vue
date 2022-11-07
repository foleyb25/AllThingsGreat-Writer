<template>
    <h1>Add New Blog</h1>
    <ckeditor class="h-[500px]" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    // import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
    // import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';

    export default {
        name: 'app',
        data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                        // plugins: [SourceEditing],
                        // toolbar: ["SourceEditing"]
                    // The configuration of the editor.
                    // toolbar: ['sourceEditing']
                }
            };
        }
    }
</script>

<style>
.ck-content {height: 50vh;}
</style>