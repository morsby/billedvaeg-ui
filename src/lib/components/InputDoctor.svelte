<script lang="ts">
	import { Row, Column, Button, Select, SelectItem } from 'carbon-components-svelte';
	import ArrowUp20 from 'carbon-icons-svelte/lib/ArrowUp20';
	import ArrowDown20 from 'carbon-icons-svelte/lib/ArrowDown20';
	import TrashCan20 from 'carbon-icons-svelte/lib/TrashCan20';
	import { doctors, positions } from '$lib/stores';
	import type { Doctor } from '$lib/db';
	export let doc: Doctor;

	let selected = '';
	const update = (
		key: string,
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		doctors.put([{ ...doc, [key]: (<HTMLInputElement>event.target).value }]);
	};
	const changePosition = () => {
		doctors.put([{ ...doc, positionId: parseInt(selected) }]);
	};
</script>

<Row style="margin-bottom:1.5rem">
	<Column sm={4} md={5}>
		<Row>
			<Column sm={4} md={5}>
				<div class="bx--form-item bx--text-input-wrapper">
					<label for="doc-name-{doc.name}" class="false bx--label">Navn</label>
					<div class="bx--text-input__field-outer-wrapper">
						<div class="bx--text-input__field-wrapper">
							<input
								id="doc-name-{doc.name}"
								placeholder="Lægens navn"
								class="bx--text-input"
								value={doc.name}
								on:input={(event) => update('name', event)}
							/>
						</div>
					</div>
				</div>
			</Column>
		</Row>
		<Row>
			<Column sm={4} md={5}>
				<Select labelText="Select menu" bind:selected on:change={changePosition}>
					{#each $positions as pos (pos.id)}
						<SelectItem value={pos.id.toString()} text={pos.title} />
					{/each}
				</Select>
			</Column>
		</Row>
		<Row>
			<Column sm={4} md={5}>
				<div class="bx--form-item bx--text-input-wrapper">
					<label for="doc-suppl-{doc.suppl}" class="false bx--label">
						Supplerende tekst (3. linje)
					</label>
					<div class="bx--text-input__field-outer-wrapper">
						<div class="bx--text-input__field-wrapper">
							<input
								id="doc-suppl-{doc.suppl}"
								placeholder="Supplerende tekst"
								class="bx--text-input"
								value={doc.suppl}
								on:input={(event) => update('suppl', event)}
							/>
						</div>
					</div>
				</div>
			</Column>
		</Row>
	</Column>

	<Column sm={2} md={2}>
		<img
			src="http://placekitten.com/200/300"
			alt="placeholder"
			style="max-width:100%; height:auto;"
		/>
	</Column>
	<Column sm={2} md={1}>
		<div class="center">
			<Button
				iconDescription="Ryk op"
				kind="tertiary"
				size="field"
				icon={ArrowUp20}
				disabled={doc.order === 0}
				on:click={() => doctors.swap(doc, 'up')}
			/>

			<Button
				iconDescription="Ryk ned"
				kind="tertiary"
				size="field"
				icon={ArrowDown20}
				disabled={doc.order === $doctors.length - 1}
				on:click={() => doctors.swap(doc, 'down')}
			/>

			<Button
				iconDescription="Slet"
				kind="danger-tertiary"
				icon={TrashCan20}
				size="field"
				on:click={() => doctors.delete(doc)}
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
