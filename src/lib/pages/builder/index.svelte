<script lang="ts">
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import Doctors from './doctors.svelte';
	import Stillinger from './stillinger.svelte';
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
