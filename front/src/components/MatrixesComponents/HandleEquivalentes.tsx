import InverseEquivalentes from './Inverse/InverseEquivalentes'
import MatrixComponent from '../MatrixComponent'
import LUEquivalentes from './LU/LUEquivalentes'

export default function HandleEquivalentes({
	equivalente,
	operacion
}: {
	equivalente: any
	operacion: string
}) {
	if (operacion === 'inversa') {
		return <InverseEquivalentes equivalente={equivalente} />
	} else if (operacion === 'LU') {
		return <LUEquivalentes equivalente={equivalente} />
	}
	return <div class='flex'>Error</div>
}
