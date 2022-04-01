function setupInScope(part_name, new_setup, part) {
    if (part_name === 'brake-bias') {
        return new_setup < 71 && new_setup > 49
    }
    return !(part['min-value'] - part['step'] === new_setup) && !(new_setup === part['max-value'] + part['step'])
}

function calculateAdjustment(part_name, setup_value, step) {
    if (part_name === 'brake-bias') { step = -step }
    return (((setup_value * 1000) + (step * 1000)) / 1000)
}

function capitalizeAll(sentence) {
    const words = sentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ")
}