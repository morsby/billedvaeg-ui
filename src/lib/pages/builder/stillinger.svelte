<script lang="ts">
	import { flip } from 'svelte/animate';
	import { Grid, Button } from 'carbon-components-svelte';
	import Positions from '$lib/components/PositionInput.svelte';
	import { positions } from '$lib/stores';
</script>

<h2>Stillinger</h2>
<p>Hvilke stillinger findes?</p>
<Grid>
	{#each $positions as pos, n (pos.title)}
		<div animate:flip id="pos-{pos.title}">
			<Positions
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
