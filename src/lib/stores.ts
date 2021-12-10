import { writable } from 'svelte/store';
interface Position {
	title: string;
	abbr: string;
}
interface Doctor {
	name: string;
	position: Position['abbr'];
	suppl?: string;
	image?: string;
}

const createPositions = () => {
	const positions: Position[] = [
		{
			title: 'Ledende overlæge',
			abbr: 'LO'
		},
		{
			title: 'Overlæge, professor',
			abbr: 'Ovl./prof.'
		},
		{
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
			pos = { title: '', abbr: '' };
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
		delete: (n) => update((curr) => deletePosition(curr, n)),
		swap: (a, b) => update((curr) => swapPositions(curr, a, b)),
		reset: () => set(positions)
	};
};

const createDoctors = () => {
	const doctors: Doctor[] = [
		{
			name: 'Testnavn',
			position: 'LO',
			suppl: 'Er for sej'
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
			doc = { name: '', position: 'LO', suppl: '' };
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
		delete: (n) => update((curr) => deleteDoctor(curr, n)),
		swap: (a, b) => update((curr) => swapDoctors(curr, a, b))
	};
};

export const positions = createPositions();
export const doctors = createDoctors();
