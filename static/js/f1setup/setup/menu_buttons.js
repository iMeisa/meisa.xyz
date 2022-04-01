

/* Buttons */
function buildButtons() {
    let button_group = document.getElementById('part-sections')
    if (is_mobile) {
        button_group.classList.add('btn-group-vertical', 'btn-group-sm')
    }

    for (const group_name in parts) {
        button_group.innerHTML += `
                    <button class="btn btn-outline-primary" type="button" onclick="showTableGroup('${group_name}')">
                        ${part_group_names[group_name]}
                    </button>
                `
    }

    button_group.innerHTML += `<button class="btn btn-outline-light" type="button" onclick="showAllTables()">Show All</button>`
    button_group.innerHTML += `<button class="btn btn-outline-warning" type="button" onclick="showTableGroup('none')">Hide All</button>`
}

function applySetting() {
    for (const group_name in parts) {
        for (const part_name in parts[group_name]) {
            setup[part_name] = Number(document.getElementById(`${part_name}-value`).innerHTML)
        }
    }
    updateProgressBars()
}

function revertSetting() {
    for (const part_name in setup) {
        document.getElementById(`${part_name}-value`).innerHTML = setup[part_name]
    }
    updateProgressBars()
}

function showApply() {
    document.getElementById(`apply-button`).removeAttribute('hidden')
    document.getElementById('revert-button').removeAttribute('hidden')
}

function hideApply() {
    document.getElementById(`apply-button`).setAttribute('hidden', '')
    document.getElementById('revert-button').setAttribute('hidden', '')
}