<template >
    
    <div @click="onMouseUp">
        <h1>Accounts View</h1>
        <p >The quick red fox jumped over the lazy brown dog the quick red
        fox jumped over the lazy brown dog
        </p>
        <br>
        <p >The quick red fox jumped over the lazy brown dog the quick red
        fox jumped over the lazy brown dog
        </p>
        <p >The quick red fox           jumped over the lazy brown dog the quick red
        fox jumped over the lazy brown dog
        </p>
        <p >The quick red fox jumped over the lazy brown dog the quick red
        fox jumped over the lazy brown dog
        </p>
        Selection Text: {{state.selection}}
    </div>

    <button class="w-24 h-12 bg-blue-300" >Submit</button>
    
    

</template>

<script setup>
import { reactive } from 'vue';

var state = reactive({
    selection: ""
})

function onMouseUp() {
    console.log("MOUSE UP")
    state.indicator = !state.indicator
    const textSelection = window.getSelection().toString()
    if(textSelection.split(" ").length > 3) {
        state.selection = textSelection
    } else {
        state.selection = ""
    }
}
</script>