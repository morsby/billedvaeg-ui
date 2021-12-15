import { writable } from 'svelte/store';
export interface Position {
	id: string;
	title: string;
	abbr: string;
}
export interface Doctor {
	id: string;
	name: string;
	positionId: Position['id'];
	position?: number;
	suppl?: string;
	image?: string;
}

const random = () => Math.random().toString().substring(2, 8);

const createPositions = () => {
	const positions: Position[] = [
		{
			id: 'lo',
			title: 'Ledende overlæge',
			abbr: 'LO'
		},
		{
			id: 'ovl/prof',
			title: 'Overlæge, professor',
			abbr: 'Ovl./prof.'
		},
		{
			id: 'uao',
			title: 'Uddannelsesansvarlig overlæge',
			abbr: 'UAO'
		}
	];

	const addPosition = (positions: Position[], pos?: Position) => {
		let hasEmpty = false;
		positions.forEach((pos) => {
			if (pos.title === '') {
				hasEmpty = true;
			}
		});
		if (hasEmpty) return;

		if (!pos) {
			pos = { id: 'pos-' + random(), title: '', abbr: '' };
		}

		return [...positions, pos];
	};

	const deletePosition = (curr: Position[], n: number) => {
		curr.splice(n, 1);
		return curr;
	};

	const swapPositions = (curr: Position[], a: number, b: number) => {
		[curr[a], curr[b]] = [curr[b], curr[a]];
		return curr;
	};

	const { subscribe, set, update } = writable(positions);

	return {
		subscribe,
		add: (pos?: Position) => update((curr) => addPosition(curr, pos)),
		delete: (n: number) => update((curr) => deletePosition(curr, n)),
		swap: (a: number, b: number) => update((curr) => swapPositions(curr, a, b)),
		reset: () => set(positions),
		set: set
	};
};
export const positions = createPositions();

const createDoctors = () => {
	const doctors: Doctor[] = [
		{
			id: random(),
			name: '',
			positionId: 'lo',
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
			doc = { id: random(), name: '', positionId: 'lo', suppl: '' };
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

	const { subscribe, update } = writable(doctors);

	return {
		subscribe,
		add: (doc?: Doctor) => update((curr) => addDoctor(curr, doc)),
		delete: (n: number) => update((curr) => deleteDoctor(curr, n)),
		swap: (a: number, b: number) => update((curr) => swapDoctors(curr, a, b))
	};
};

export const doctors = createDoctors();
