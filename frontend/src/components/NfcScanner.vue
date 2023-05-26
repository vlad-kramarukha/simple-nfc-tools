<script setup lang="ts">
import nfc from '../services/nfc.ts'
import { ref } from 'vue'

const scanData = ref()

async function scan() {
	scanData.value = await nfc()?.scan()
}
</script>

<template>
	<div @click="scan" class="scanner"></div>
	<div class="scanner-data" v-for="record in scanData?.message?.records">{{ record }}</div>
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
