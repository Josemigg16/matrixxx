import { atom } from "nanostores";

export interface OPMatrix {
    Original: string[][],
    Aumentada: string[][],
    Equivalentes: Equivalentes[],
    Inversa: string[][]
    operacion: string
}

interface Equivalentes {
    text: string,
    matriz: string[][]
}

export const matrixStore = atom<OPMatrix[]>([])
