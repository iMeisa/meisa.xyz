

function loadSuggestions(first_condition, second_condition) {
    let suggestions_div = document.getElementById('suggestions')
    suggestions_div.innerHTML = ''

    const selected_suggestions = setup_suggestions[first_condition][second_condition]
    for (const group_name in selected_suggestions) {
        suggestions_div.innerHTML += `
                    <table class="table table-dark table-${group_name} mt-4 mb-4" id="table-${group_name}-suggestion">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">${part_group_names[group_name]}</th>
                            </tr>
                        </thead>
                        <tbody id="${group_name}-suggestions"></tbody>
                    </table>
                `

        let group_suggestions = document.getElementById(`${group_name}-suggestions`)
        const suggestion_group = selected_suggestions[group_name]
        for (const suggested_part in suggestion_group) {
            let part_name = suggested_part
            let part_name2 = undefined
            const is_tires = group_name === 'tires'
            if (is_tires) {
                if (part_name === 'front-tires') {
                    part_name = 'front-right-tire'
                    part_name2 = 'front-left-tire'
                } else if (part_name == 'rear-tires') {
                    part_name = 'rear-right-tire'
                    part_name2 = 'rear-left-tire'
                }
            }  // Temporary until solution found

            const part = parts[group_name][part_name]
            const current_part_value = Number(document.getElementById(`${part_name}-value`).innerHTML)
            const part_setup_suggestion = calculateAdjustment(part_name, current_part_value, (suggestion_group[suggested_part]['change'] * part['step']))
            let part2 = undefined
            let current_part2_value = undefined
            let part2_setup_suggestion = undefined
            if (is_tires) {
                part2 = parts[group_name][part_name2]
                current_part2_value = Number(document.getElementById(`${part_name2}-value`).innerHTML)
                part2_setup_suggestion = calculateAdjustment(part_name2, current_part2_value, (suggestion_group[suggested_part]['change'] * part2['step']))
            }

            group_suggestions.innerHTML += `
                        <tr id="${part_name}-suggestion-row">
                            <td class="suggestion-part-name align-middle" id="${part_name}-suggestion">${part['name']}</td>
                            <td class="suggestion-progress-bars align-middle" id="${part_name}-suggestion-bars">
                                <div class="progress">
                                    <div class="progress-bar" id="${part_name}-suggestion-bar"></div>
                                    <div class="progress-bar increase-setup" id="${part_name}-suggestion-bar-increase"></div>
                                    <div class="progress-bar decrease-setup" id="${part_name}-suggestion-bar-decrease"></div>
                                </div>
                            </td>
                            <td class="suggested-${part_name}-value align-middle" id="${part_name}-setup-suggestion">
                                ${current_part_value} -> ${part_setup_suggestion}
                            </td>
                            <td class="suggestion-apply-button align-middle" id="${part_name}-apply-button">
                                <button class="btn btn-success" id="${part_name}-apply"
                                            onclick="applySuggestion('${group_name}',  '${part_name}', ${part_setup_suggestion}, false); showApply()">
                                    Apply
                                </button>

                            </td>
                        </tr>
                    `

            if (is_tires) {
                const part2 = parts[group_name][part_name2]
                const current_part2_value = Number(document.getElementById(`${part_name2}-value`).innerHTML)
                const part2_setup_suggestion = calculateAdjustment(part_name2, current_part2_value, (suggestion_group[suggested_part]['change'] * part2['step']))

                document.getElementById(`${part_name}-suggestion`).innerHTML += `<br>${part2['name']}`

                document.getElementById(`${part_name}-suggestion-bars`).innerHTML += `
                            <div class="progress mt-2">
                                <div class="progress-bar" id="${part_name2}-suggestion-bar"></div>
                                <div class="progress-bar increase-setup" id="${part_name2}-suggestion-bar-increase"></div>
                                <div class="progress-bar decrease-setup" id="${part_name2}-suggestion-bar-decrease"></div>
                            </div>
                        `

                document.getElementById(`${part_name}-setup-suggestion`).innerHTML += `
                            <br>
                            ${current_part2_value} -> ${part2_setup_suggestion}
                        `

                document.getElementById(`${part_name}-apply-button`).innerHTML = `
                            <button class="btn btn-success" id="${part_name}-apply"
                                        onclick="applySuggestion('${group_name}',  '${part_name}', ${part_setup_suggestion}, false);
                                        applySuggestion('${group_name}',  '${part_name2}', ${part2_setup_suggestion}, true);
                                        showApply()">
                                Apply
                            </button>
                        `

                updateProgressBar(group_name, part_name2, part2_setup_suggestion, true)
            }

            if (!(setupInScope(part_name, part_setup_suggestion, part))) {
                document.getElementById(`${part_name}-apply`).setAttribute('disabled', '')
            }

            const has_or = suggestion_group[suggested_part].hasOwnProperty('or')
            const has_and = suggestion_group[suggested_part].hasOwnProperty('and')
            if (has_or || has_and) {
                let second_part_name = has_or ? suggestion_group[suggested_part]['or'] : suggestion_group[suggested_part]['and']
                let second_part_name2 = undefined
                if (is_tires) {
                    if (second_part_name === 'front-tires') {
                        second_part_name = 'front-right-tire'
                        second_part_name2 = 'front-left-tire'
                    } else if (second_part_name == 'rear-tires') {
                        second_part_name = 'rear-right-tire'
                        second_part_name2 = 'rear-left-tire'
                    }
                }

                const second_part = parts[group_name][second_part_name]
                const current_second_part_value = Number(document.getElementById(`${second_part_name}-value`).innerHTML)
                const second_part_setup_suggestion = calculateAdjustment(second_part_name, current_second_part_value, (suggestion_group[suggested_part]['change2'] * second_part['step']))

                document.getElementById(`${part_name}-suggestion`).innerHTML += ` <br> ${has_or ? 'OR' : 'AND'} <br> ${second_part['name']}`

                document.getElementById(`${part_name}-suggestion-bars`).innerHTML += `
                            <br>
                            <div class="progress mt-2">
                                <div class="progress-bar" id="${second_part_name}-suggestion-bar"></div>
                                <div class="progress-bar increase-setup" id="${second_part_name}-suggestion-bar-increase"></div>
                                <div class="progress-bar decrease-setup" id="${second_part_name}-suggestion-bar-decrease"></div>
                            </div>
                        `

                document.getElementById(`${part_name}-setup-suggestion`).innerHTML += `
                            <br><br>
                            ${current_second_part_value} -> ${second_part_setup_suggestion}
                        `

                if (is_tires) {
                    const second_part2 = parts[group_name][part_name2]
                    const current_second_part2_value = Number(document.getElementById(`${second_part_name2}-value`).innerHTML)
                    const second_part2_setup_suggestion = calculateAdjustment(second_part_name2,
                        current_second_part2_value, (suggestion_group[suggested_part]['change2'] * second_part2['step']))

                    document.getElementById(`${part_name}-suggestion`).innerHTML += `<br>${second_part2['name']}`

                    document.getElementById(`${part_name}-suggestion-bars`).innerHTML += `
                                <div class="progress mt-2">
                                    <div class="progress-bar" id="${second_part_name2}-suggestion-bar"></div>
                                    <div class="progress-bar increase-setup" id="${second_part_name2}-suggestion-bar-increase"></div>
                                    <div class="progress-bar decrease-setup" id="${second_part_name2}-suggestion-bar-decrease"></div>
                                </div>
                            `

                    document.getElementById(`${part_name}-setup-suggestion`).innerHTML += `
                                <br>
                                ${current_second_part2_value} -> ${second_part2_setup_suggestion}
                            `

                    document.getElementById(`${part_name}-apply-button`).innerHTML = `
                                <button class="btn btn-success" id="${part_name}-apply"
                                            onclick="applySuggestion('${group_name}',  '${part_name}', ${part_setup_suggestion}, false);
                                            applySuggestion('${group_name}',  '${part_name2}', ${part2_setup_suggestion}, true);
                                            applySuggestion('${group_name}',  '${second_part_name}', ${second_part_setup_suggestion}, true);
                                            applySuggestion('${group_name}',  '${second_part_name2}', ${second_part2_setup_suggestion}, true);
                                            showApply()">
                                    Apply
                                </button>
                            `

                    updateProgressBar(group_name, second_part_name2, second_part2_setup_suggestion, true)

                } else if (has_or) {
                    document.getElementById(`${part_name}-apply-button`).innerHTML += `
                                <br>
                                <button class="btn btn-success mt-2" id="${second_part_name}-apply"
                                            onclick="applySuggestion('${group_name}',  '${second_part_name}', ${second_part_setup_suggestion}, false); showApply()">
                                    Apply
                                </button>
                            `

                    if (!(setupInScope(second_part_name, second_part_setup_suggestion, second_part))) {
                        document.getElementById(`${second_part_name}-apply`).setAttribute('disabled', '')
                    }
                } else if (has_and) {
                    document.getElementById(`${part_name}-apply-button`).innerHTML = `
                                <button class="btn btn-success" id="${part_name}-apply"
                                            onclick="applySuggestion('${group_name}',  '${part_name}', ${part_setup_suggestion}, false);
                                            applySuggestion('${group_name}',  '${second_part_name}', ${second_part_setup_suggestion}, true);
                                            showApply()">
                                    Apply
                                </button>
                            `

                    if (!(setupInScope(second_part_name, second_part_setup_suggestion, second_part))) {
                        document.getElementById(`${part_name}-apply`).setAttribute('disabled', '')
                    }
                }

                updateProgressBar(group_name, second_part_name, second_part_setup_suggestion, true)
            }

            updateProgressBar(group_name, part_name, part_setup_suggestion, true)
        }
    }
}

function applySuggestion(group_name, part_name, new_value, is_and_part) {
    showTableGroup(group_name)
    document.getElementById(`${part_name}-value`).innerHTML = new_value
    if (!(is_and_part)) {
        document.getElementById(`${part_name}-apply`).setAttribute('disabled', '')
    }
    updateProgressBars()
}