<script lang="ts">
	import { flip } from 'svelte/animate';
	import { Grid, Button } from 'carbon-components-svelte';
	import { doctors } from '$lib/stores';
</script>

<h2>Læger</h2>
<p>Hvilke læger skal med?</p>
<Grid>
	{#each $doctors as doc (doc.name)}
		<div animate:flip id="doc-{doc.name}">
			<pre>
                {JSON.stringify(doc,null,4)}
            </pre>
		</div>
	{/each}
</Grid>
<div>
	<Button on:click={() => doctors.add()}>Tilføj læge</Button>
</div>
