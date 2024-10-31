import useMatrixForm from '@/hooks/useMatrixForm'
import Select from './Select'
import OperationButtons from './OperationButtons'

export default function MatrixForm() {
	const { rows, setRows, columns, setColumns, setOperacion, handleSubmit, tbody } = useMatrixForm()
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
					<tbody ref={tbody}>
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
				<OperationButtons setOperacion={setOperacion} />
				<button
					onClick={() => {
						const inputs = tbody.current as HTMLElement | null
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
