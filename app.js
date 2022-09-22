/* Imports */
import { getPlants, getPlantTypes } from './fetch-utils.js';
import { renderPlant, renderTypeOption } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById(
    'notification-display'
);
const plantList = document.getElementById('plant-list');
const typeSelect = document.getElementById('type-select');
const searchForm = document.getElementById('search-form');
const morePlantsButton = document.getElementById('more-plants-button');

/* State */
let error = null;
let count = 0;
let plants = [];
let plantTypes = [];

// let filterName = '';
// let filterType = '';
// let page = 1;
// let pageSize = 25;

let filter = {
    name: '',
    type: '',
};

let paging = {
    page: 1,
    pageSize: 25,
};

/* Events */

// window load event
window.addEventListener('load', async () => {
    // this will do an initial find on page load
    findPlants();

    const typesResponse = await getPlantTypes();
    plantTypes = typesResponse.data;

    displayTypeOptions();
});

morePlantsButton.addEventListener('click', () => {
    getMorePlants();
});

async function getMorePlants() {
    paging.page++;
    const response = await getPlants(filter, paging);

    error = response.error;
    count = response.count;
    const morePlants = response.data;
    plants = plants.concat(morePlants);

    displayNotifications();
    displayMorePlants(morePlants);
}

async function findPlants() {
    // call a function and get plants
    const response = await getPlants(filter, paging);

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
    filter.name = formData.get('name');
    filter.type = formData.get('type');
    // new search criteria, reset page to 1
    paging.page = 1;
    findPlants();
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
    displayMorePlants(plants);
}

function displayMorePlants(morePlants) {
    for (const plant of morePlants) {
        const plantEl = renderPlant(plant);
        plantList.append(plantEl);
    }
}
