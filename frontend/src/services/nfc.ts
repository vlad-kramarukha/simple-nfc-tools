export default function nfc() {
	if ('NDEFReader' in window) {
		const instance = new NDEFReader()

		return {
			async scan() {
				await instance.scan()

				return new Promise((resolve, reject) => {
					instance.onreadingerror = reject
					instance.onreading = resolve
				})
			}
		}
	}

	console.warn('NFC не поддерживается')
	return null
}