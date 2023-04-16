// globalNotificationStore.js
import { defineStore, storeToRefs } from 'pinia'

export const useGlobalNotificationStore = defineStore('globalNotificationStore', {
    state: () => ({
        notification: null
    }),

    actions: {
        setNotification(message, type, color) {
            this.notification = {
                message: message, 
                type: type, 
                color: color 
            };
            if (this.notification) {
                //clear notification after 5 seconds
                setTimeout(() => {
                    this.notification = null
                }, 5000)
            }
        },
    }
});
