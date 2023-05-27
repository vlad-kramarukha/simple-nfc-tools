<script setup lang="ts">
import nfc from '../services/nfc.ts'
import { onMounted, ref } from 'vue'

const scanData = ref()

async function scan() {
	scanData.value = await nfc()?.scan()
}

function composeRecordData(record: NDEFRecord) {
	if (record) {
		const { recordType, encoding, data, mediaType, lang, id } = record
		return { recordType, encoding, data, mediaType, lang, id }
	}

	return 'Нет данных :('
}

onMounted(scan)
</script>

<template>
	<div class="scanner"></div>
	<div class="scanner-data" v-for="record in scanData?.records">
		<span>{{ composeRecordData(record) }}</span>
	</div>
</template>

<style scoped>
.scanner {
	width: 200px;
	height: 200px;
	background-color: crimson;
	border-radius: 50%;
	box-shadow: 5px 5px 2px 0 rgba(0, 0, 0, 0.15);
}

.scanner-data {
	text-align: center;
}
</style>
