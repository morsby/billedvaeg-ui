// db.ts
import Dexie from 'dexie';
import { doctors, positions } from './stores';
export interface Position {
	id?: number;
	title: string;
	abbr: string;
	order: number;
}
export interface Base64Image {
	mime: string;
	data: string;
}
export interface Doctor {
	id?: number;
	name: string;
	positionId: number;
	position?: number;
	suppl: string;
	image?: Base64Image;
	order: number;
}

export class MySubClassedDexie extends Dexie {
	// 'doctors' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	doctors!: Dexie.Table<Doctor>;
	positions!: Dexie.Table<Position>;

	constructor() {
		super('billedvaeg');
		this.version(2).stores({
			doctors: '++id, name, positionId, order', // Primary key and indexed props
			positions: '++id, title, order'
		});
	}
}

export const db = new MySubClassedDexie();

export const getDoctors = async (): Promise<string> => {
	const docs = await db.doctors.orderBy('order').toArray();
	doctors.set(docs);
	return 'ok';
};

export const putDoctors = async (docs: Doctor[]): Promise<string> => {
	const noOfPositions = await db.doctors.count();
	const firstPosition = await db.positions.orderBy('order').first();
	//TODO: Make positionId work!!!
	if (docs.length === 0) {
		docs = [
			{
				name: '',
				suppl: '',

				positionId: firstPosition.id,
				position: firstPosition.order,
				order: noOfPositions
			}
		];
	}
	await db.doctors.bulkPut(docs);

	return getDoctors();
};
export const deleteDoctor = async (id: number): Promise<string> => {
	await db.doctors.delete(id);
	return getDoctors();
};
export const swapDoctors = async (doc: Doctor, direction: 'up' | 'down'): Promise<string> => {
	let newVal = doc.order;
	if (direction === 'up') {
		newVal--;
	} else {
		newVal++;
	}
	const swappee = await db.doctors.where({ order: newVal }).first();
	return putDoctors([
		{ ...doc, order: newVal },
		{ ...swappee, order: doc.order }
	]);
};

export const updateDoctorPosition = async (doc: Doctor, positionId: number): Promise<string> => {
	const pos = await db.positions.get(positionId);
	return putDoctors([{ ...doc, positionId, position: pos.order }]);
};

const seedPositions: Position[] = [
	{
		title: 'Ledende overl??ge',
		abbr: 'LO',
		order: 0
	},
	{
		title: 'Overl??ge, professor',
		abbr: 'Ovl./prof.',
		order: 1
	},
	{
		title: 'Uddannelsesansvarlig overl??ge',
		abbr: 'UAO',
		order: 2
	}
];

export const getPositions = async (): Promise<string> => {
	const savedPositions = await db.positions.orderBy('order').toArray();
	positions.set(savedPositions);
	return 'ok';
};
export const putPositions = async (pos: Position[]): Promise<string> => {
	const noOfPositions = await db.positions.count();
	if (pos.length === 0) {
		pos = [{ title: '', abbr: '', order: noOfPositions }];
	}
	await db.positions.bulkPut(pos);
	return getPositions();
};
export const deletePosition = async (id: number): Promise<string> => {
	await db.positions.delete(id);
	return getPositions();
};
export const swapPositions = async (pos: Position, direction: 'up' | 'down'): Promise<string> => {
	let newVal = pos.order;
	if (direction === 'up') {
		newVal--;
	} else {
		newVal++;
	}
	const swappee = await db.positions.where({ order: newVal }).first();
	return putPositions([
		{ ...pos, order: newVal },
		{ ...swappee, order: pos.order }
	]);
};
export const resetPositions = async (): Promise<string> => {
	await db.positions.clear();
	return putPositions(seedPositions);
};
export const exportDb = async (): Promise<Blob> => {
	const positions = await db.positions.toArray();
	const doctors = await db.doctors.toArray();

	return new Blob([JSON.stringify({ positions, doctors })]);
};

export const importDb = async (blob: Blob): Promise<boolean> => {
	const data = JSON.parse(await blob.text());
	await db.positions.clear();
	putPositions(data.positions);

	await db.doctors.clear();
	putDoctors(data.doctors);
	return true;
};
