function downloadSetup() {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(setup)));
    element.setAttribute('download', 'setup.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function getSetup() {
    const setup_input = document.getElementById('setup-input')
    setup_input.click()

    setup_input.addEventListener('change', (event) => loadSetup(event))
}

function loadSetup(event) {
    const selected_file = event.target.files[0];

    let reader = new FileReader();
    reader.onload = function(event2) {
        setup = JSON.parse(event2.target.result)
        revertSetting()
    };
    reader.readAsText(selected_file);
}