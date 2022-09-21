const CONDITIONS = {
    Sun: '🌞',
    'Part Shade': '🌓',
    'Part shade': '🌓',
    Shade: '🌚',
};

export function renderPlant(plant) {
    const li = document.createElement('li');
    li.classList.add('card');

    const h2 = document.createElement('h2');
    h2.textContent = plant.Common_Name;

    const latin = document.createElement('p');
    latin.classList.add('latin');
    latin.textContent = plant.Latin_Name;

    const type = document.createElement('p');
    type.textContent = plant.Plant_Type;

    const icons = document.createElement('p');

    let icon = '';

    const conditionsString = plant.Suitable_Site_Conditions || '';
    const conditions = conditionsString.split(';');

    for (const condition of conditions) {
        icon += CONDITIONS[condition];
    }

    icons.classList.add('icons');
    icons.textContent = icon;

    li.append(h2, type, icons, latin);

    return li;
}

export function renderTypeOption(plantType) {
    const option = document.createElement('option');
    option.value = plantType.name;
    option.textContent = plantType.name;
    return option;
}
