<template>
    <div class="main">
      <div
        class="dropzone-container"
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
        {{isDragging}}
        {{filename}}

      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDragging: false,
        file: "",
        filename: ""
      };
    },


    methods: {
      onChange() {
        this.file = this.$refs.file.files[0];
        this.filename = this.file.name
        this.$emit(this.filename, "fileSelected")

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