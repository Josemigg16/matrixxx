import MatrixElement from './MatrixElement'
import Paren from './svg/Paren'

export default function MatrixComponent({ matrix, operacion }: any) {
	return (
		<div class='flex'>
			<Paren orientation='left' />
			<table>
				{matrix.map((fila: any) => (
					<tr>
						{fila.map((celda: any) => (
							<td>
								<MatrixElement number={celda} />
							</td>
						))}
					</tr>
				))}
			</table>
			<Paren orientation='right' />
			{operacion === 'inversa' && <p class='h-full text-xl font-bold'>-1</p>}
		</div>
	)
}
