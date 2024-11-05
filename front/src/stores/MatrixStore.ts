import { atom } from 'nanostores'

export interface OPInversa {
	Original: string[][]
	Aumentada: string[][]
	Equivalentes: Equivalentes[]
	Inversa: string[][]
	operacion: string
}
export interface OPLU {
	Original: string[][]
	Equivalentes: Equivalentes[]
	L: string[][]
	U: string[][]
	operacion: string
}

interface Equivalentes {
	text: string
	matriz?: string[][]
	L?: string[][]
	U?: string[][]
	P?: string[][]
}

export const matrixStore = atom<never[]>([])
