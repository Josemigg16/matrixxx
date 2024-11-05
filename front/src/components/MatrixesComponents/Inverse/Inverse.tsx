import MatrixComponent from '@/components/MatrixComponent'

export default function Inverse({ matrix }: { matrix: any }) {
	return (
		<div class='flex'>
			<MatrixComponent matrix={matrix.Original} operacion={matrix.operacion} />
			<p class='mr-4 flex items-center text-7xl'>{'='}</p>
			<MatrixComponent matrix={matrix.Inversa} />
		</div>
	)
}
