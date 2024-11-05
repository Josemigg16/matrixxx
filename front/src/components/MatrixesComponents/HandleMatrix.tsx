import MatrixComponent from '../MatrixComponent'
import Inverse from './Inverse/Inverse'
import LU from './LU/LU'

export default function HandleMatrix({ matrix }: { matrix: any }) {
	if (matrix.operacion === 'inversa') {
		return (
			<Inverse matrix={matrix} />
		)
	} else if (matrix.operacion === 'LU') {
		return (
			<LU matrix={matrix} />
		)
	}
	return <div class='flex'>Error</div>
}
