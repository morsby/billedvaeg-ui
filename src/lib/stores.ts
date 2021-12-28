import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { deletePosition, getDoctors, getPositions, putPositions, swapPositions } from './db';
import type { Doctor, Position } from '$lib/db';
const createPositions = () => {
	const positions: Position[] = [];

	const { subscribe, set } = writable(positions);

	return {
		subscribe,
		put: (pos: Position[]) => putPositions(pos),
		delete: (pos: Position) => deletePosition(pos.id),
		swap: (pos: Position, direction: 'up' | 'down') => swapPositions(pos, direction),
		set
	};
};

export const positions = createPositions();

const createDoctors = () => {
	const doctors: Doctor[] = [
		{
			name: '',
			positionId: 1,
			suppl: ''
		}
	];

	const addDoctor = (doctors: Doctor[], doc?: Doctor): Doctor[] => {
		let hasEmpty = false;
		doctors.forEach((doc) => {
			if (doc.name === '') {
				hasEmpty = true;
			}
		});

		if (hasEmpty && !doc) {
			return doctors;
		}

		if (!doc) {
			doc = { name: '', positionId: 1, suppl: '' };
		}

		return [...doctors, doc];
	};

	const deleteDoctor = (curr: Doctor[], n: number): Doctor[] => {
		curr.splice(n, 1);
		return curr;
	};

	const swapDoctors = (curr: Doctor[], a: number, b: number): Doctor[] => {
		[curr[a], curr[b]] = [curr[b], curr[a]];
		return curr;
	};

	const updatePosition = (curr: Doctor[], n: number, positionId: number) => {
		curr[n] = { ...curr[n], positionId };
		return curr;
	};

	const { subscribe, update } = writable(doctors);

	return {
		subscribe,
		add: (doc?: Doctor) => update((curr) => addDoctor(curr, doc)),
		delete: (n: number) => update((curr) => deleteDoctor(curr, n)),
		swap: (a: number, b: number) => update((curr) => swapDoctors(curr, a, b)),
		setPosition: (n: number, positionId: number) =>
			update((curr) => updatePosition(curr, n, positionId))
	};
};

export const doctors = createDoctors();

if (browser) {
	getPositions();
	getDoctors();
}
