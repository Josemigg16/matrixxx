import { matrixStore } from '@/stores/MatrixStore'
import { useStore } from '@nanostores/preact'
import { useEffect } from 'preact/hooks'
import MatrixComponent from './MatrixComponent'
import Paren from './svg/Paren'

const ShowMatrixes = () => {
	const MatrixState = useStore(matrixStore)
	console.log(MatrixState)
	useEffect(() => {
		MatrixState.map((a) => console.log(a))
	}, [MatrixState])
	return (
		<ul class='mt-20 flex flex-col items-center gap-4'>
			{MatrixState.toReversed().map((matrix) => (
				<li class='bg-slate-700 flex items-center'>
					<div class='paren w-10 h-10 z-10'>.</div>
					<MatrixComponent matrix={matrix.Original} />
					{')'}
					<MatrixComponent matrix={matrix.Inversa} />
				</li>
			))}
		</ul>
	)
}

export default ShowMatrixes
