import { browser } from '$app/env';
import { writable } from 'svelte/store';
import {
	deleteDoctor,
	deletePosition,
	getDoctors,
	getPositions,
	putDoctors,
	putPositions,
	resetPositions,
	swapDoctors,
	swapPositions,
	updateDoctorPosition
} from './db';
import type { Doctor, Position } from '$lib/db';

const createPositions = () => {
	const positions: Position[] = [];

	const { subscribe, set } = writable(positions);

	return {
		subscribe,
		put: (pos: Position[]) => putPositions(pos),
		delete: (pos: Position) => deletePosition(pos.id),
		swap: (pos: Position, direction: 'up' | 'down') => swapPositions(pos, direction),
		reset: () => resetPositions(),
		set
	};
};

export const positions = createPositions();

const createDoctors = () => {
	const doctors: Doctor[] = [];

	const { subscribe, set } = writable(doctors);

	return {
		subscribe,
		put: (docs: Doctor[]) => putDoctors(docs),
		delete: (doc: Doctor) => deleteDoctor(doc.id),
		swap: (doc: Doctor, direction: 'up' | 'down') => swapDoctors(doc, direction),
		updatePosition: (doc: Doctor, positionId: number) => updateDoctorPosition(doc, positionId),
		set
	};
};

export const doctors = createDoctors();

export const loading = writable(true);

const loadStored = async () => {
	await getPositions();
	await getDoctors();

	loading.set(false);
};

if (browser) {
	loadStored();
}
