import MatrixComponent from '@/components/MatrixComponent'

export default function LUEquivalentes({ equivalente }: { equivalente: any }) {
	return (
		<div class='ml-8 flex'>
			{equivalente.P && (
				<>
					<p class='flex items-center text-2xl font-semibold'>{'P'}</p>
					<MatrixComponent matrix={equivalente.P} />
					<p class='mx-2 flex items-center text-2xl'>{'×'}</p>
				</>
			)}
			<p class='flex items-center text-2xl font-semibold'>{'L'}</p>
			<MatrixComponent matrix={equivalente.L} />
			<p class='mx-2 flex items-center text-2xl'>{'×'}</p>
			<p class='flex items-center text-2xl font-semibold'>{'U'}</p>
			<MatrixComponent matrix={equivalente.U} />
		</div>
	)
}
