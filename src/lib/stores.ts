import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { getFromDb, saveToDB } from './db';

export interface Position {
	id?: number;
	title: string;
	abbr: string;
}
export interface Doctor {
	id?: string;
	name: string;
	positionId: Position['id'];
	position?: number;
	suppl?: string;
	image?: string;
}

const initialPositions: Position[] = [
	{
		id: 1,
		title: 'Ledende overlæge',
		abbr: 'LO'
	},
	{
		id: 2,
		title: 'Overlæge, professor',
		abbr: 'Ovl./prof.'
	},
	{
		id: 3,
		title: 'Uddannelsesansvarlig overlæge',
		abbr: 'UAO'
	}
];
const createPositions = () => {
	const positions: Position[] = [];

	const addPosition = (positions: Position[]) => {
		let hasEmpty = false;
		positions.forEach((pos) => {
			if (pos.title === '') {
				hasEmpty = true;
			}
		});
		if (hasEmpty) return;

		const pos = { title: '', abbr: '' };

		const upd = [...positions, pos];
		saveToStorage('positions', upd);
		return upd;
	};

	const deletePosition = (curr: Position[], n: number) => {
		curr.splice(n, 1);
		saveToDB('positions', curr);
		return curr;
	};

	const swapPositions = (curr: Position[], a: number, b: number) => {
		[curr[a], curr[b]] = [curr[b], curr[a]];
		saveToDB('positions', curr);
		return curr;
	};

	const { subscribe, set, update } = writable(positions);

	return {
		subscribe,
		add: () => update((curr) => addPosition(curr)),
		delete: (n: number) => update((curr) => deletePosition(curr, n)),
		swap: (a: number, b: number) => update((curr) => swapPositions(curr, a, b)),
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

const updateFromStorage = async (key: string) => {
	let pos = await getFromDb(key);

	if (!pos || pos.length === 0) {
		pos = initialPositions;
	}
	positions.set(pos);
};

const saveToStorage = async (key: string, data) => {
	await saveToDB(key, data);
	return updateFromStorage(key);
};

if (browser) {
	updateFromStorage('positions');
}
