/* Imports */
import { getPlants } from './fetch-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');

/* State */
let error = null;
let count = 0;
let plants = [];
/* Events */

// window load event
window.addEventListener('load', async () => {
    // call a function and get 100 plants
    const response = await getPlants();

    // keep in errors
    error = response.error;
    // update plants state
    plants = response.data;
    console.log(plants);

    displayNotifications();
    // call displayPlants function
});

/* Display Functions */
function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
    }
}
