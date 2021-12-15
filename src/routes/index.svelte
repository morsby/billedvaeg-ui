<script>
	import Builder from '$lib/pages/builder/index.svelte';
	import Pdf from '$lib/pages/pdf.svelte';

	import 'carbon-components-svelte/css/g10.css';
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { doctors, positions } from '$lib/stores';

	let href = '';
	const handleClick = async () => {
		href = '';

		let poss = $positions.map((pos, index) => ({ ...pos, value: index }));

		let ppl = $doctors.map((doc) => {
			doc = {
				...doc,
				position: $positions.findIndex((pos) => pos.id === doc.positionId)
			};

			return doc;
		});

		const res = await fetch('http://localhost:5000', {
			method: 'POST',
			body: JSON.stringify({
				sort: true,
				positions: poss,
				people: ppl
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
