<script lang="ts">
	import { flip } from 'svelte/animate';
	import { Grid, Button } from 'carbon-components-svelte';
	import { doctors } from '$lib/stores';
	import InputDoctor from '$lib/components/InputDoctor.svelte';
</script>

<h2>Læger</h2>
<p>Hvilke læger skal med?</p>
<Grid>
	{#each $doctors as doc (doc.id)}
		<div animate:flip={{ duration: 250 }} id="doc-{doc.name}">
			<InputDoctor {doc} />
		</div>
	{/each}
</Grid>
<div>
	<Button on:click={() => doctors.put([])}>Tilføj læge</Button>
</div>
