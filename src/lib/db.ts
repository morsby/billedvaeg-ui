// db.ts
import Dexie from 'dexie';
import type { Doctor, Position } from './stores';

export class MySubClassedDexie extends Dexie {
	// 'friends' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	doctors!: Dexie.Table<Doctor>;
	positions!: Dexie.Table<Position>;

	constructor() {
		super('billedvaeg');
		this.version(1).stores({
			doctors: '++id, name, positionId', // Primary key and indexed props
			positions: '++id, title'
		});
	}
}

export const db = new MySubClassedDexie();

export const saveToDB = async (key: string, value) => {
	await db[key].clear();
	await db[key].bulkAdd(value);
};

export const getFromDb = async (key: string) => db[key].toArray();
