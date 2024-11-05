import { matrixStore } from '@/stores/MatrixStore'
import type { FormEvent } from 'preact/compat'
import { useRef, useState } from 'preact/hooks'

export default function matrixFormHook() {
	const [rows, setRows] = useState(3)
	const [columns, setColumns] = useState(3)
	const [operacion, setOperacion] = useState('')
	const tbody = useRef(null)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const matrix: string[][] = []
		const inputs = tbody.current as HTMLElement | null

		inputs?.querySelectorAll('tr').forEach((element) => {
			const rowMatrix: string[] = []
			element.querySelectorAll('input').forEach((element) => {
				rowMatrix.push(element.value)
			})
			matrix.push(rowMatrix)
		})
		const fixedMatrix = matrix.map((row) =>
			row.map((element) => (element.trim() === '' ? '0' : element.trim()))
		)
		console.log(fixedMatrix)
		try {
			const res = await fetch(`http://localhost:5000/api/${operacion}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(fixedMatrix)
			})
			const newMatrix = await res.json() as never
			console.log(res.json)
			matrixStore.set([...matrixStore.get(), newMatrix])
		} catch (e) {
			console.log(e)
		}
	}
	return {
        rows,
        setRows,
        columns,
        setColumns,
        setOperacion,
        handleSubmit,
		tbody
    }
}
