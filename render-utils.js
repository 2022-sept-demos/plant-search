export function renderOption() {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = '';
    return option;
}

export function renderPlant(plant) {
    const li = document.createElement('li');
    li.classList.add('card');

    const img = document.createElement('img');
    img.src = ``;
    img.alt = '';

    const h2 = document.createElement('h2');
    h2.textContent = '';

    const p = document.createElement('p');
    p.textContent = '';

    li.append(h2, img, p);

    return li;
}
