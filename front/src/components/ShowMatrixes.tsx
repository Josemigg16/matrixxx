import { matrixStore } from '@/stores/MatrixStore'
import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'
import MatrixComponent from './MatrixComponent'
import Equivalentes from './Equivalentes'
import HandleMatrix from './MatrixesComponents/HandleMatrix'

const ShowMatrixes = () => {
	const MatrixState = useStore(matrixStore)

	console.log(MatrixState)
	useEffect(() => {
		MatrixState.map((a) => console.log(a))
	}, [MatrixState])
	return (
		<ul class='mx-auto mt-20 flex flex-col items-start gap-4 px-10 space-y-4'>
			{MatrixState.toReversed().map((matrix, i) => (
				<li class='relative flex flex-col bg-slate-700 px-8 py-2'>
					<button
						onClick={() => {
							const equivalentes = document.querySelector(`.equivalentes-${i}`)
							equivalentes?.classList.toggle('hidden')
						}}
						class='absolute right-0 top-0 m-2 rounded border-2 border-white bg-slate-800 px-2 text-white'
					>
						V
					</button>
					<HandleMatrix matrix={matrix} />

					<ul class={`equivalentes-${i} mt-5 hidden`}>
						{/* Pagina solo una parte de los equivalentes */}
						<Equivalentes matrix={matrix} />
					</ul>
				</li>
			))}
		</ul>
	)
}

export default ShowMatrixes
