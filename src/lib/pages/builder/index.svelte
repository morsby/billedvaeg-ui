<script lang="ts">
	import { Button, FileUploaderButton, Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import Doctors from './doctors.svelte';
	import Stillinger from './stillinger.svelte';
	import download from 'downloadjs';
	import { exportDb, importDb } from '$lib/db';

	const exportData = async () => {
		download(await exportDb(), 'data.json', 'application/json');
	};

	const importData = async (event) => {
		let file = event.target.files[0];
		importDb(file);
	};
</script>

<h1>Billedvæg</h1>

<p>Her kan du lave en billedvæg.</p>

<Tabs type="container">
	<Tab label="Stillinger" />
	<Tab label="Læger" />
	<div slot="content">
		<TabContent><Stillinger /></TabContent>

		<TabContent><Doctors /></TabContent>
	</div>
</Tabs>

<div id="import-export">
	<p>
		Data gemmes lokalt i browseren. Men ønsker du at lave en manuel backup, som kan deles, kan du
		downloade én nedenfor. Har du allerede lavet en backup, du ønsker at gendanne (og
		<strong>slette</strong>
		nuværende data), kan du også det.
	</p>

	<div>
		<Button on:click={exportData}>Download data</Button>
		<FileUploaderButton on:change={(e) => importData(e)} labelText="Importer data" />
	</div>
</div>

<style>
	#import-export {
		background: rgb(219, 219, 219);
		padding: 2rem;
	}

	#import-export div {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
	}
</style>
