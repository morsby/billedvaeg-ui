<script>
	import Builder from '$lib/pages/builder/index.svelte';
	import Pdf from '$lib/pages/pdf.svelte';

	import 'carbon-components-svelte/css/g10.css';
	import { Tab, TabContent, Tabs, SkeletonPlaceholder } from 'carbon-components-svelte';
	import { doctors, positions, loading } from '$lib/stores';

	let href = '';

	const handleClick = async () => {
		href = '';

		const res = await fetch('/.netlify/functions/pdf', {
			method: 'POST',
			body: JSON.stringify({
				sort: false,
				positions: $positions,
				people: $doctors
			})
		});
		const data = await res.text();

		href = 'data:application/pdf;base64,' + data;
	};
</script>

<div id="container">
	{#if $loading}
		<SkeletonPlaceholder />
	{:else}
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
	{/if}
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
