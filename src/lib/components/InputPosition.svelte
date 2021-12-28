<script lang="ts">
	import { Row, Column, Button } from 'carbon-components-svelte';
	import ArrowUp20 from 'carbon-icons-svelte/lib/ArrowUp20';
	import ArrowDown20 from 'carbon-icons-svelte/lib/ArrowDown20';
	import TrashCan20 from 'carbon-icons-svelte/lib/TrashCan20';
	import { positions } from '$lib/stores';
	import type { Position } from '$lib/db';
	export let position: Position;

	const update = (
		key: string,
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		positions.put([{ ...position, [key]: (<HTMLInputElement>event.target).value }]);
	};
</script>

<Row style="margin-bottom:1.5rem">
	<Column sm={4} md={5}>
		<div class="bx--form-item bx--text-input-wrapper">
			<label for="pos-title-{position.id}" class="false bx--label">Titel</label>
			<div class="bx--text-input__field-outer-wrapper">
				<div class="bx--text-input__field-wrapper">
					<input
						id="pos-title-{position.id}"
						placeholder="Stillingens titel"
						type=""
						class="bx--text-input"
						value={position.title}
						on:input={(event) => update('title', event)}
					/>
				</div>
			</div>
		</div>
	</Column>
	<Column sm={2} md={2}>
		<div class="bx--form-item bx--text-input-wrapper">
			<label for="pos-abbr-{position.id}" class="false bx--label">Forkortelse</label>
			<div class="bx--text-input__field-outer-wrapper">
				<div class="bx--text-input__field-wrapper">
					<input
						id="pos-abbr-{position.id}"
						placeholder="Stillingens forkortelse"
						type=""
						class="bx--text-input"
						value={position.abbr}
						on:input={(event) => update('abbr', event)}
					/>
				</div>
			</div>
		</div>
	</Column>
	<Column sm={2} md={1}>
		<div class="center">
			<Button
				iconDescription="Ryk op"
				kind="tertiary"
				size="field"
				icon={ArrowUp20}
				disabled={position.order === 0}
				on:click={() => positions.swap(position, 'up')}
			/>

			<Button
				iconDescription="Ryk ned"
				kind="tertiary"
				size="field"
				icon={ArrowDown20}
				disabled={position.order === $positions.length - 1}
				on:click={() => positions.swap(position, 'down')}
			/>

			<Button
				iconDescription="Slet"
				kind="danger-tertiary"
				icon={TrashCan20}
				size="field"
				on:click={() => positions.delete(position)}
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
