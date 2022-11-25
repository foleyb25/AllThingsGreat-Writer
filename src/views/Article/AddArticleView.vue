<template>
    <ArticleEditorComponent></ArticleEditorComponent>
</template>

<script>
import ArticleEditorComponent from '../../components/ArticleEditorComponent.vue'
import { useAuth0 } from '@auth0/auth0-vue';

    export default {
        name: 'AddArticleView',
        components: {ArticleEditorComponent},
        setup() {
            const { getAccessTokenSilently } = useAuth0();
            
        }
    }
</script>