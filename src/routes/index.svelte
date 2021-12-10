<script>
	import Builder from '$lib/pages/builder/index.svelte';
	import Pdf from '$lib/pages/pdf.svelte';

	import 'carbon-components-svelte/css/g10.css';
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';

	let href = '';
	const handleClick = async () => {
		href = '';
		const res = await fetch('http://localhost:5000', {
			method: 'POST',
			body: JSON.stringify({
				positions: [{ title: 'Ledende overlæge', value: 0 }],
				people: [{ name: 'Sigurd', position: 0 }]
			})
		});
		const data = await res.text();

		href = 'data:application/pdf;base64,' + data;
	};
</script>

<div id="container">
	<Tabs type="container">
		<Tab label="Oplysninger" />
		<Tab label="Se/download PDF" on:click={handleClick} />
		<div slot="content">
			<TabContent>
				<Builder />
			</TabContent>

			<TabContent>
				<Pdf {href} />
			</TabContent>
		</div>
	</Tabs>
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
		width: 80vw;
		margin: auto;
		position: relative;
	}
</style>
