import MatrixElement from './MatrixElement'

export default function MatrixComponent({matrix}: any) {
  return (
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
  )
}
