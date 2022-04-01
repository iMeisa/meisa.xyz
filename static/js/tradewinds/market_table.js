
function buildTable() {
    for (const index in items) {
        const item_name = items[index]
        item_list.innerHTML += `
                <tr>
                    <td>${item_name.charAt(0).toUpperCase() + item_name.slice(1)}</td>
                    <td><input type="number" class="form-control bg-dark text-white" id="${item_name}-price"></td>
                    <td><input type="checkbox" id="${item_name}-contraband" oninput="toggleCheck('${item_name}'); fillMax()" disabled></td>
                    <td><p id="${item_name}-profit">0</p></td>
                </tr>
            `

        if (Object.keys(contraband_max).includes(item_name)) {
            document.getElementById(`${item_name}-contraband`).removeAttribute('disabled')
        }
    }

    for (const index in items) {
        const item_name = items[index]

        let item_contraband = document.getElementById(`${item_name}-contraband`)
        item_contraband.removeAttribute('checked')
    }
}

function fillMax() {
    for (const index in items) {
        const item_name = items[index]

        let item_contraband = document.getElementById(`${item_name}-contraband`).hasAttribute('checked')
        let item_max = max_values[item_name]
        if (item_contraband) {
            item_max = contraband_max[item_name]
        }


        document.getElementById(`${item_name}-price`).setAttribute('placeholder', `${item_max}`)
    }
}

function toggleCheck(item_name) {
    let item = document.getElementById(`${item_name}-contraband`)

    if (item.hasAttribute('checked')) {
        item.removeAttribute('checked')
    } else {
        item.setAttribute('checked', '')
    }

    calcProfit()
}

function calcProfit() {
    clearProfit()

    let highest_profit_price = ''
    let highest_profit_item = ''

    for (const index in items) {
        const item_name = items[index]

        const item_price = document.getElementById(`${item_name}-price`).value
        if (item_price < 10) {
            continue
        }

        let item_max_price = document.getElementById(`${item_name}-contraband`).hasAttribute('checked') ? contraband_max[item_name] : max_values[item_name]

        let cash_total = document.getElementById('cash-total').value
        const multiplier = document.getElementById('cash-multiplier').value
        switch (multiplier) {
            case '1':
                cash_total *= 1000
                break
            case '2':
                cash_total *= 1000000
                break
            case '3':
                cash_total *= 1000000000
                break
            default:
                break
        }

        const max_purchaseable_quantity = Math.floor(cash_total / item_price)

        const used_storage = document.getElementById(`used-space`).value
        const total_storage = document.getElementById('total-space').value
        const available_storage = total_storage - used_storage

        const quantity = Math.min(available_storage, max_purchaseable_quantity)
        const profit = (item_max_price * quantity) - (item_price * quantity)
        let profit_text = document.getElementById(`${item_name}-profit`)
        profit_text.innerHTML = profit.toLocaleString(undefined)
        profit_text.style.color = 'white'

        if (profit > highest_profit_price) {
            highest_profit_price = profit
            highest_profit_item = item_name
        }
    }

    document.getElementById(`${highest_profit_item}-profit`).style.color = 'green'
}

function clearPrices() {
    for (const index in items) {
        const item_name = items[index]

        document.getElementById(`${item_name}-price`).value = ''
    }

    clearProfit()
}

function clearProfit() {
    for (const index in items) {
        const item_name = items[index]

        let item_profit = document.getElementById(`${item_name}-profit`)
        item_profit.innerHTML = '0'
        item_profit.style.color = 'white'
    }
}