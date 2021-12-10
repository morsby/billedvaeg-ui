<script lang="ts">
	import { Row, Column, TextInput, Button } from 'carbon-components-svelte';
	import ArrowUp20 from 'carbon-icons-svelte/lib/ArrowUp20';
	import ArrowDown20 from 'carbon-icons-svelte/lib/ArrowDown20';
	import TrashCan20 from 'carbon-icons-svelte/lib/TrashCan20';
	export let value = { title: '', abbr: '' };
	export let first = false;
	export let last = false;
	export let n = 0;
	export let onDelete = (n: number) => {};
	export let onMove = (a: number, b: number) => {};
</script>

<Row style="margin-bottom:1.5rem">
	<Column sm={8} md={5}>
		<div class="bx--form-item bx--text-input-wrapper">
			<label for="pos-title-{value.abbr}" class="false bx--label">Titel</label>
			<div class="bx--text-input__field-outer-wrapper">
				<div class="bx--text-input__field-wrapper">
					<input
						id="pos-title-{value.abbr}"
						placeholder="Stillingens titel"
						type=""
						class="bx--text-input"
						bind:value={value.title}
					/>
				</div>
			</div>
		</div>
	</Column>
	<Column sm={3} md={2}>
		<div class="bx--form-item bx--text-input-wrapper">
			<label for="pos-abbr-{value.abbr}" class="false bx--label">Forkortelse</label>
			<div class="bx--text-input__field-outer-wrapper">
				<div class="bx--text-input__field-wrapper">
					<input
						id="pos-abbr-{value.abbr}"
						placeholder="Stillingens forkortelse"
						type=""
						class="bx--text-input"
						bind:value={value.abbr}
					/>
				</div>
			</div>
		</div>
	</Column>
	<Column sm={1} md={1}>
		<div class="center">
			<Button
				iconDescription="Ryk op"
				kind="tertiary"
				size="field"
				icon={ArrowUp20}
				disabled={first}
				on:click={() => onMove(n, n - 1)}
			/>

			<Button
				iconDescription="Ryk ned"
				kind="tertiary"
				size="field"
				icon={ArrowDown20}
				disabled={last}
				on:click={() => onMove(n, n + 1)}
			/>

			<Button
				iconDescription="Slet"
				kind="danger-tertiary"
				icon={TrashCan20}
				size="field"
				on:click={() => onDelete(n)}
			/>
		</div>
	</Column>
</Row>

<style>
	.center {
		margin-top: 0.8rem;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
