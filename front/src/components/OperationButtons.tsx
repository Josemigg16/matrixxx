export default function OperationButton({ setOperacion }: any) {
	const operations = [{
		name: 'Matriz Inversa',
		endpoint: 'inverse'
	},{
		name: 'Factorizacion LU',
		endpoint: 'lu'
	}]
	return (
		<ul>
			{operations.map((operation) => (
				<button
					onClick={() => setOperacion(operation.endpoint)}
					data-type='upload'
					class='mt-2 block w-full rounded bg-gray-100 p-2 font-bold'
					type='submit'
				>
					{operation.name}
				</button>
			))}
		</ul>
	)
}
