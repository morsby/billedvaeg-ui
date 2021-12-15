<script lang="ts">
	import { flip } from 'svelte/animate';
	import { Grid, Button } from 'carbon-components-svelte';
	import PositionsInput from '$lib/components/InputPosition.svelte';
	import { positions } from '$lib/stores';
</script>

<h2>Stillinger</h2>
<p>Hvilke stillinger findes?</p>
<Grid>
	{#each $positions as pos, n (pos.title)}
		<div animate:flip={{ duration: 250 }} id="pos-{pos.title}">
			<PositionsInput
				value={pos}
				first={n === 0}
				last={n === $positions.length - 1}
				{n}
				onDelete={positions.delete}
				onMove={positions.swap}
			/>
		</div>
	{/each}
</Grid>
<div>
	<Button on:click={() => positions.add()}>Tilføj stilling</Button>
</div>
