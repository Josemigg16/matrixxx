import { matrixStore } from '@/stores/MatrixStore'
import { useStore } from '@nanostores/preact'
import { useEffect } from 'preact/hooks'
import MatrixComponent from './MatrixComponent'

const ShowMatrixes = () => {
	const MatrixState = useStore(matrixStore)
	console.log(MatrixState)
	useEffect(() => {
		MatrixState.map((a) => console.log(a))
	}, [MatrixState])
	return (
		<ul class='mx-auto mt-20 flex flex-col items-start gap-4 px-10'>
			{MatrixState.toReversed().map((matrix, i) => (
				<li class='relative flex flex-col bg-slate-700 px-8 py-2'>
					<button
					onClick={() => {
						const equivalentes = document.querySelector(`.equivalentes-${i}`)
						equivalentes?.classList.toggle('hidden')
					}}
					 class='absolute bg-slate-800 border-white border-2 px-2 text-white rounded top-0 right-0 m-2'>V</button>
					<div class='flex'>
						<MatrixComponent matrix={matrix.Original} operacion={matrix.operacion} />
						<p class='mr-4 flex items-center text-7xl'>{'='}</p>
						<MatrixComponent matrix={matrix.Inversa} />
					</div>
					<ul class={`equivalentes-${i} mt-5 hidden`}>
						{matrix.Equivalentes.map((equivalente, i) => (
							<li class={`border-t-2 border-gray-500 py-8 }`} >
								<h3 class='mb-8'>{equivalente.text}</h3>
								<div class='flex items-center'>
								<p class='text-4xl font-bold'>E{i + 1}=</p>
								<MatrixComponent  matrix={equivalente.matriz} />
								</div>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	)
}

export default ShowMatrixes
