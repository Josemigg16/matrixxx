import { useState } from 'preact/hooks'
import MatrixComponent from './MatrixComponent'
import type { OPMatrix } from '@/stores/MatrixStore'
const PAGE_SIZE = 3

export default function Equivalentes({ matrix }: { matrix: OPMatrix }) {
	const [pageIndex, setPageIndex] = useState(0)

	const CantidadEquivalentes = matrix.Equivalentes.length
	const Pages = Math.ceil(CantidadEquivalentes / PAGE_SIZE)

	const handlePageChange = (index) => {
		if (index < 0) return
		if (index >= Pages) return
		setPageIndex(index)
	}
	return (
		<>
			{matrix.Equivalentes.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE).map(
				(equivalente, idx) => (
					<li key={idx} class='border-t-2 border-gray-500 py-8'>
						<h3 class='mb-8'>{equivalente.text}</h3>
						<div class='flex items-center'>
							<p class='text-4xl font-bold'>E{idx + 1 + pageIndex * PAGE_SIZE}=</p>
							<MatrixComponent matrix={equivalente.matriz} />
						</div>
					</li>
				)
			)}
			<ul class='flex justify-center'>
				<button
					disabled={pageIndex === 0}
					onClick={() => handlePageChange(pageIndex - 1)}
					class={`rounded bg-gray-300 px-3 py-1 text-black mx-2`}
				>
					{'<'}
				</button>
				<ul class='flex justify-center gap-2 min-w-fit w-[250px]'>
					{Array.from(
						{ length: Pages },
						(_, index) =>
							(index === 0 || Math.abs(pageIndex - index) < 2 || index === Pages - 1 || (pageIndex <= 1 && index < 4) || (pageIndex > Pages - 3 && index > Pages - 5)) && (
								<button
									key={crypto.randomUUID()}
									onClick={() => handlePageChange(index)}
									class={`rounded px-3 py-1 ${pageIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
								>
									{index + 1}
								</button>
							)
					)}
				</ul>
				<button
					disabled={pageIndex + 1 === Pages}
					onClick={() => handlePageChange(pageIndex + 1)}
					class={`rounded bg-gray-300 px-3 py-1 mx-5 text-black`}
				>
					{'>'}
				</button>
			</ul>
		</>
	)
}
