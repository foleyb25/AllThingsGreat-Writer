<template>
    <div>
      <!-- Modal trigger button -->
      <button @click="showModal = true">Select an image</button>
  
      <!-- Modal component -->
      <div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Select an image</h2>
            <span class="close-button" @click="$emit('closeModal')">&times;</span>
          </div>
          <div class="modal-body">
            <ul>
              <!-- Image list -->
              <li v-for="(url, index) in props.imageUrls" :key="index">
                <img :src="url" @click="selectImage(url)" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
const props = defineProps(['imageUrls'])
const emit = defineEmits(['selectImage'])
      
const selectImage = ((url) => {
    // Handle image selection
    const extension = url.slice(url.lastIndexOf(".") + 1)

    if (extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'png' || extension.toLowerCase() == 'gif' || extension.toLowerCase() == 'jpeg') {
        emit('selectImage', url)
    } else {
        return false
    }  
    
})



</script>
  
  <style scoped>
 .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  /* Add a transition for smooth opening and closing */
  transition: all 0.3s ease-out;
  /* Use a transform to scale the modal up when it is shown */
  transform: scale(0.9);
  /* Add some additional styling to make the modal look more visually appealing */
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  width: 80%;
  max-width: 500px;
  padding: 20px;
  background-color: white;
  /* Use a more visually appealing font family for the header text */
  font-family: 'Roboto', sans-serif;
  /* Add some additional styling to the modal header */
  border-radius: 8px 8px 0 0;
  background: linear-gradient(to right, #4caf50, #8bc34a);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  /* Use a more visually appealing font family for the close button */
  font-family: 'Roboto', sans-serif;
  /* Add some additional styling to the close button */
  color: white;
  font-size: 24px;
}

.modal-header h2 {
  margin: 0;
  color: white;
}

.modal-header .close-button {
  cursor: pointer;
}

.modal-body {
  max-height: 400px;
  overflow-y: auto;
  /* Add some additional styling to the images */
  display: flex;
  flex-wrap: wrap;
}

.modal-body img {
  width: calc(50% - 10px);
  cursor: pointer;
  /* Add a hover effect to the images */
  transition: all 0.3s ease-out;
}

.modal-body img:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

</style>
  