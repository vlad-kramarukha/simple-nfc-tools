const nfcButton = document.getElementById('nfc')
const writeButton = document.getElementById('write')
const scanButton = document.getElementById('scan')
const dataModal = document.getElementById('modal')

const hasNfc = 'NDEFReader' in window

nfcButton.onclick = checkNfc

function checkNfc() {
    const activeClass = hasNfc ? 'active' : 'disabled'

    setTimeout(() => {
        nfcButton.classList.add(activeClass)
    }, 1000)
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
                const data = {}
                const { message } = event

                for (record of message.records) {
                    if (record.recordType === 'text') {
                        const decoder = new TextDecoder(record.encoding)
                        data[record.recordType] = decoder.decode(record.data)
                    }
                }

                showDataModal(JSON.stringify(data))
            }
        })
    }
}

init()