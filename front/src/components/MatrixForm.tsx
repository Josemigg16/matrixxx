import { useEffect, useRef, useState } from 'preact/hooks'
import Select from './Select'
import type { FormEvent } from 'preact/compat'

export default function MatrixForm() {
	const [rows, setRows] = useState(3)
	const [columns, setColumns] = useState(3)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const matrix: string[][] = []
		const inputs = document.querySelector('tbody')
		inputs?.childNodes.forEach((element) => {
			const rowMatrix: string[] = []
			element.childNodes.forEach((element) => {
				rowMatrix.push((element.firstChild as HTMLInputElement).value)
			})
			matrix.push(rowMatrix)
		})
		console.log(matrix)
		try {
            // Enviamos la matriz al backend
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(matrix),
            })

            // Obtenemos la respuesta del backend
            const result = await response.json()

            // Mostramos la matriz inversa en la consola del navegador
            console.log("Matriz inversa recibida:", result)

        } catch (e) {
            console.error("Error:", e)
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
					<tbody>
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
			</form>
		</article>
	)
}
