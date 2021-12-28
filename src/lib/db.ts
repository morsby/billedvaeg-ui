// db.ts
import Dexie from 'dexie';
import { positions } from './stores';
export interface Position {
	id?: number;
	title: string;
	abbr: string;
	value: number;
}
export interface Doctor {
	id?: string;
	name: string;
	positionId?: Position['id'];
	position?: number;
	suppl?: string;
	image?: string;
}

export class MySubClassedDexie extends Dexie {
	// 'friends' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	doctors!: Dexie.Table<Doctor>;
	positions!: Dexie.Table<Position>;

	constructor() {
		super('billedvaeg');
		this.version(1).stores({
			doctors: '++id, name, positionId', // Primary key and indexed props
			positions: '++id, title, value'
		});
	}
}

export const db = new MySubClassedDexie();

export const getDoctors = async (): Promise<Doctor[]> => db.doctors.toArray();
export const putDoctors = async (docs: Doctor[]): Promise<Doctor[]> => {
	if (docs.length === 0) {
		docs = [{ name: '' }];
	}
	await db.doctors.bulkPut(docs);
	return getDoctors();
};
export const deleteDoctor = async (id: number): Promise<Doctor[]> => {
	await db.doctors.delete(id);
	return getDoctors();
};

const seedPositions: Position[] = [
	{
		title: 'Ledende overlæge',
		abbr: 'LO',
		value: 0
	},
	{
		title: 'Overlæge, professor',
		abbr: 'Ovl./prof.',
		value: 1
	},
	{
		title: 'Uddannelsesansvarlig overlæge',
		abbr: 'UAO',
		value: 2
	}
];

export const getPositions = async (): Promise<string> => {
	const savedPositions = await db.positions.orderBy('value').toArray();
	if (!savedPositions || savedPositions.length === 0) {
		putPositions(seedPositions);
	}
	positions.set(savedPositions);
	return 'ok';
};
export const putPositions = async (pos: Position[]): Promise<string> => {
	const noOfPositions = await db.positions.count();
	if (pos.length === 0) {
		pos = [{ title: '', abbr: '', value: noOfPositions }];
	}
	await db.positions.bulkPut(pos);
	return getPositions();
};
export const deletePosition = async (id: number): Promise<string> => {
	await db.positions.delete(id);
	return getPositions();
};
export const swapPositions = async (pos: Position, direction: 'up' | 'down'): Promise<string> => {
	let newVal = pos.value;
	if (direction === 'up') {
		newVal--;
	} else {
		newVal++;
	}
	const swappee = await db.positions.where({ value: newVal }).first();
	return putPositions([
		{ ...pos, value: newVal },
		{ ...swappee, value: pos.value }
	]);
};
