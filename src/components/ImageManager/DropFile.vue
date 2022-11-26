<template>
      <div
        class="dropzone-container w-[90%] h-[200px] bg-gray-200 rounded-md border-2 border-black border-dotted flex flex-col justify-center items-center"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          single
          name="file"
          id="fileInput"
          class="hidden-input"
          @change="onChange"
          ref="file"
          accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.JPEG,.PNG"
        />
  
        <label for="fileInput" class="file-label">
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else>Drop file here or <u>click here</u> to upload.</div>
        </label>

      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDragging: false,
      };
    },


    methods: {
      onChange() {
        const file = this.$refs.file.files[0];
        const filePath = window.URL.createObjectURL(file)
        this.$emit("fileSelected", {path: filePath, name:file.name})

      },
      dragover(e) {
        e.preventDefault();
        this.isDragging = true;
      },
      dragleave() {
        this.isDragging = false;
      },
      drop(e) {
        e.preventDefault();
        this.$refs.file.files = e.dataTransfer.files;
        this.onChange();
        this.isDragging = false;
      },
    },
  };
  </script>
  <style scoped src="../../assets/dropfile.css"></style>