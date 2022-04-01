
function firstConditionButtons() {
    let button_group = document.getElementById('condition-1')
    for (const condition in setup_suggestions) {
        button_group.innerHTML += `
                    <button class="btn btn-outline-light" type="button" onclick="secondConditionButtons('${condition}')">
                    ${capitalizeAll(condition.replaceAll('_', ' '))}
                    </button>
                `
    }
}

function secondConditionButtons(first_condition) {
    let button_group = document.getElementById('condition-2')
    button_group.innerHTML = ''
    for (const condition in setup_suggestions[first_condition]) {
        button_group.innerHTML += `
                    <button class="btn btn-outline-light" type="button" onclick="loadSuggestions('${first_condition}', '${condition}')">
                    ${capitalizeAll(condition.replaceAll('_', ' '))}
                    </button>
                `
    }
}