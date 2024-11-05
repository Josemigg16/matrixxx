import MatrixComponent from '@/components/MatrixComponent'

export default function LU({ matrix }: { matrix: any }) {
	return (
		<div class='flex'>
			<MatrixComponent matrix={matrix.Original} operacion={matrix.operacion} />
			<p class='mr-4 flex items-center text-7xl'>{'='}</p>
			{matrix.P && (
				<>
					<p class='flex items-center text-2xl font-semibold'>{'P'}</p>
					<MatrixComponent matrix={matrix.P} />
					<p class='mx-2 flex items-center text-2xl'>{'×'}</p>
				</>
			)}
			<p class='flex items-center text-2xl font-semibold'>{'L'}</p>
			<MatrixComponent matrix={matrix.L} />
			<p class='mx-2 flex items-center text-2xl'>{'×'}</p>
			<p class='flex items-center text-2xl font-semibold'>{'U'}</p>
			<MatrixComponent matrix={matrix.U} />
		</div>
	)
}
