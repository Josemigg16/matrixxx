import { atom } from "nanostores";

interface OPMatrix {
    Original: string[][],
    Aumentada: string[][],
    Equivalentes: Equivalentes[],
    Inversa: string[][]
}

interface Equivalentes {
    text: string,
    matriz: string[][]
}

export const matrixStore = atom<OPMatrix[]>([])
