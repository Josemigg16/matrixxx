export default function Paren({ orientation }: { orientation: 'left' | 'right' }) {
	return orientation === 'left' ? (
		<svg class='w-[10px]' viewBox='0 0 10 100' preserveAspectRatio='none'>
			<path d='M10,0 C2,50 2,50 10,100' fill='none' stroke='black' strokeWidth='2' />
		</svg>
	) : (
		<svg
			class='w-[10px]'
			style={{ transform: 'scale(-1,1)' }}
			viewBox='0 0 10 100'
			preserveAspectRatio='none'
		>
			<path d='M10,0 C2,50 2,50 10,100' fill='none' stroke='black' strokeWidth='2' />
		</svg>
	)
}
