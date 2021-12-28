<script lang="ts">
	import { flip } from 'svelte/animate';
	import { Grid, Button } from 'carbon-components-svelte';
	import PositionsInput from '$lib/components/InputPosition.svelte';
	import { positions } from '$lib/stores';
</script>

<h2>Stillinger</h2>
<p>Hvilke stillinger findes?</p>
<Grid>
	{#each $positions as pos (pos.id)}
		<div animate:flip={{ duration: 250 }} id="pos-{pos.id}">
			<PositionsInput position={pos} />
		</div>
	{/each}
</Grid>
<div id="buttons">
	<Button on:click={() => positions.put([])}>Tilføj stilling</Button>
	<Button kind="danger" on:click={() => positions.reset()}>Nulstil stillinger</Button>
</div>

<style>
	#buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
