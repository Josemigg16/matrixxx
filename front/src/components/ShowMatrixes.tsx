import { matrixStore } from '@/stores/MatrixStore'
import { useStore } from '@nanostores/preact'
import { useEffect } from 'preact/hooks'
import MatrixElement from './MatrixElement'

const ShowMatrixes = () => {
	const MatrixState = useStore(matrixStore)

	useEffect(() => {
		MatrixState.map((a) => console.log(a.Aumentada))
	}, [MatrixState])
	return (
		<ul class='mt-20 flex flex-col items-center gap-4'>
			{MatrixState.toReversed().map((matrix) => (
				<li class='bg-slate-700'>
					<table>
						{matrix?.Aumentada.map((fila) => (
							<tr>
								{fila.map((celda) => (
									<td>
										<MatrixElement number={celda} />
									</td>
								))}
							</tr>
						))}
					</table>
				</li>
			))}
		</ul>
	)
}

export default ShowMatrixes
