
function buildTables(){
    let parts_tables = document.getElementById('parts-tables')
    for (const group_name in parts) {
        parts_tables.innerHTML += `
                    <table class="table table-dark table-${group_name} mt-4 mb-4" id="table-${group_name}">
                        <tbody id="${group_name}-parts">
                        </tbody>
                    </table>
                `

        let group_parts = document.getElementById(`${group_name}-parts`)
        for (const part_name in parts[group_name]) {
            const part = parts[group_name][part_name]

            group_parts.innerHTML += `
                        <tr id="${part_name}">
                            <td class="part-name align-middle">${part['name']}</td>
                            <td class="part-buttons align-middle">
                                <button class="btn btn-outline-light btn-add"
                                    onclick="changePartValue('${group_name}', '${part_name}', -${part['step']}); showApply()"><</button>
                                <button class="btn btn-outline-light btn-sub"
                                    onclick="changePartValue('${group_name}', '${part_name}', ${part['step']}); showApply()">></button>
                            </td>
                            <td class="part-progress-bars align-middle">
                                <div class="progress">
                                    <div class="progress-bar" id="${part_name}-bar"></div>
                                    <div class="progress-bar increase-setup" id="${part_name}-bar-increase"></div>
                                    <div class="progress-bar decrease-setup" id="${part_name}-bar-decrease"></div>
                                </div>
                            </td>
                            <td class="part-setup-value align-middle">
                                <span id="${part_name}-value" style="width: 50em">${part['default']}</span>
                            </td>
                            <td class="part-desc align-middle">${part['min-name']} ${part['min-value']} - ${part['max-value']} ${part['max-name']}</td>
                        </tr>
                    `
        }
    }
    updateProgressBars()
}

function changePartValue(group_name, part_name, step) {
    const part = parts[group_name][part_name]
    let part_setup = document.getElementById(`${part_name}-value`)

    const setup_value = parseFloat(part_setup.innerHTML)
    const new_setup = calculateAdjustment(part_name, setup_value, step)

    if (setupInScope(part_name, new_setup, part)) {
        part_setup.innerHTML = `${new_setup}`
    }
    updateProgressBars()
}

function showTableGroup(table_name) {
    for (const group_name in parts) {
        const table_group = document.getElementById(`table-${group_name}`)
        if (table_group.hasAttribute('hidden')) { continue }
        table_group.setAttribute('hidden', '')
    }
    document.getElementById(`table-${table_name}`).removeAttribute('hidden')
}

function showAllTables() {
    for (const group_name in parts) {
        document.getElementById(`table-${group_name}`).removeAttribute('hidden')
    }
}