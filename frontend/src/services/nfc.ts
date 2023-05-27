function composeNfcData(data: NDEFReadingEvent) {
	const { message } = data
	const { records } = message

	return { message, records }
}

export default function nfc() {
	if ('NDEFReader' in window) {
		const instance = new NDEFReader()

		return {
			async scan() {
				await instance.scan()

				return new Promise((resolve, reject) => {
					instance.onreadingerror = reject
					instance.onreading = (e) => resolve(composeNfcData(e))
				})
			}
		}
	}

	console.warn('NFC не поддерживается')
	return null
}
