const nfcButton = document.getElementById('nfc')
const writeButton = document.getElementById('write')
const scanButton = document.getElementById('scan')
const dataModal = document.getElementById('modal')

const hasNfc = 'NDEFReader' in window

nfcButton.onclick = checkNfc

function checkNfc() {
    const activeClass = hasNfc ? 'active' : 'disabled'
    nfcButton.classList.add(activeClass)

    setTimeout(() => {
        nfcButton.classList.remove(activeClass)
    }, 2000)
}

function showDataModal(data) {
    dataModal.classList.remove('hide')

    const p = document.getElementById('text')
    p.innerText = data
}

function init() {
    checkNfc()

    if (hasNfc) {
        const ndef = new NDEFReader()

        scanButton.addEventListener('click', async () => {
            await ndef.scan()

            ndef.onreading = event => {
                const { message, records } = event
                showDataModal(message)
            }
        })
    }
}

init()