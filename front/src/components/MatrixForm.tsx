import { useEffect, useRef, useState } from 'preact/hooks'
import Select from './Select'
import type { FormEvent } from 'preact/compat'
import { matrixStore } from '@/stores/MatrixStore'

export default function MatrixForm() {
	const [rows, setRows] = useState(3)
	const [columns, setColumns] = useState(3)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const matrix: string[][] = []
		const inputs = document.querySelector('tbody')
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
			const res = await fetch('http://localhost:5000/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(fixedMatrix)
			})
			const newMatrix = await res.json()
			console.log(res.json)
			console.log('aaaaa')
			matrixStore.set([...matrixStore.get(), newMatrix])
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<article>
			<form class='mx-auto mb-20 w-[300px] space-y-2'>
				<div class='flex justify-between'>
					<h4>Filas:</h4>
					<Select value={rows} setValue={setRows} />
				</div>
				<div class='flex justify-between'>
					<h4>Columnas:</h4>
					<Select value={columns} setValue={setColumns} />
				</div>
			</form>
			<form onSubmit={handleSubmit} class='mx-auto w-fit'>
				<table>
					<thead>
						<tr>
							<th></th>
						</tr>
					</thead>
					<tbody id='matrix-form'>
						{Array.from({ length: rows }).map((_, i) => {
							return (
								<tr>
									{Array.from({ length: columns }).map((_, j) => {
										return (
											<td key={`${i}-${j}`}>
												<input
													id={`1-input--${i + 1}-${j + 1}`}
													class='h-8 w-10 text-center outline-none focus-within:bg-slate-200'
													type='text'
												/>
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
				<button class='mt-2 block w-full rounded bg-gray-100 p-2 font-bold' type='submit'>
					Submit
				</button>
				<button
					onClick={() => {
						const inputs = document.getElementById('matrix-form')
						inputs?.querySelectorAll('input').forEach((element) => {
							element.value = Math.floor(Math.random() * 10).toString()
						})
					}}
					class='mt-2 block w-full rounded bg-gray-100 p-2 font-bold'
					type='button'
				>
					Random Array
				</button>
			</form>
		</article>
	)
}
