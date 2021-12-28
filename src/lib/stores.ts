import { browser } from '$app/env';
import { writable } from 'svelte/store';
import {
	deleteDoctor,
	deletePosition,
	getDoctors,
	getPositions,
	putDoctors,
	putPositions,
	swapDoctors,
	swapPositions
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
		set
	};
};

export const doctors = createDoctors();

if (browser) {
	getPositions();
	getDoctors();
}
