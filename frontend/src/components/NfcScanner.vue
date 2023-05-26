<script setup lang="ts">
import nfc from '../services/nfc.ts'

function scan() {
	nfc()?.scan().then((data) => {
		console.log('DATA: ', data)
	})
}
</script>

<template>
	<div @click="scan" class="scanner"></div>
</template>

<style scoped>
.scanner {
	width: 200px;
	height: 200px;
	background-color: crimson;
	border-radius: 50%;
	box-shadow: 5px 5px 2px 0 rgba(0, 0, 0, 0.15);
}
</style>
