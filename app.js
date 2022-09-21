/* Imports */
import { getPlants, getPlantTypes } from './fetch-utils.js';
import {
    renderPlant,
    renderTypeOption,
} from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById(
    'notification-display'
);
const plantList = document.getElementById('plant-list');
const typeSelect = document.getElementById('type-select');
const searchForm = document.getElementById('search-form');

/* State */
let error = null;
let count = 0;
let plants = [];
let plantTypes = [];
/* Events */

// window load event
window.addEventListener('load', async () => {
    // this will do an initial find on page load
    findPlants();

    const typesResponse = await getPlantTypes();
    plantTypes = typesResponse.data;

    displayTypeOptions();
});

async function findPlants(name, plantType) {
    // call a function and get 100 plants
    const response = await getPlants(name, plantType);

    // keep in errors
    error = response.error;
    // update plants state
    plants = response.data;
    // update total db count
    count = response.count;

    displayNotifications();
    displayPlants();
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);
    const name = formData.get('name');
    const type = formData.get('type');

    findPlants(name, type);
});

/* Display Functions */
function displayNotifications() {
    if (error) {
        console.error(error);
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        notificationDisplay.textContent = `Showing ${plants.length} of ${count} matching plants`;
    }
}

function displayTypeOptions() {
    // intentionally omitting the "clear list" step
    for (const plantType of plantTypes) {
        const option = renderTypeOption(plantType);
        typeSelect.append(option);
    }
}

function displayPlants() {
    plantList.innerHTML = '';

    for (const plant of plants) {
        const plantEl = renderPlant(plant);
        plantList.append(plantEl);
    }
}
