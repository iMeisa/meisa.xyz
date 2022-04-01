function updateProgressBar(group_name, part_name, new_value, is_suggestion) {
    const part = parts[group_name][part_name]
    const before_value = setup[part_name]

    let total_width = calculateWidth(Math.max(new_value, before_value), part['min-value'], part['max-value'])
    let min_width = calculateWidth(Math.min(before_value, new_value), part['min-value'], part['max-value'])
    if (part_name === 'brake-bias') {
        total_width = calculateWidth(Math.min(new_value, before_value), part['min-value'], part['max-value'])
        min_width = calculateWidth(Math.max(before_value, new_value), part['min-value'], part['max-value'])
    }
    const before_width = calculateWidth(before_value, part['min-value'], part['max-value'])
    const diff_width = total_width - min_width

    let part_bar = document.getElementById(`${part_name}-bar`)
    let decrease_bar = document.getElementById(`${part_name}-bar-decrease`)
    let increase_bar = document.getElementById(`${part_name}-bar-increase`)
    if (is_suggestion) {
        part_bar = document.getElementById(`${part_name}-suggestion-bar`)
        decrease_bar = document.getElementById(`${part_name}-suggestion-bar-decrease`)
        increase_bar = document.getElementById(`${part_name}-suggestion-bar-increase`)
    }

    part_bar.style.width = `${min_width}%`

    if (min_width < before_width) { decrease_bar.style.width = `${diff_width}%` }
    else if (total_width > before_width) { increase_bar.style.width = `${diff_width}%` }
    else {
        decrease_bar.style.width = '0'
        increase_bar.style.width = '0'
    }

}

function updateProgressBars() {
    for (const group_name in parts) {
        for (const part_name in parts[group_name]) {
            const new_value = Number(document.getElementById(`${part_name}-value`).innerHTML)
            updateProgressBar(group_name, part_name, new_value, false)
        }
    }
}

function calculateWidth(current_value, min_value, max_value) {
    return (current_value - min_value) / (max_value - min_value) * 100
}