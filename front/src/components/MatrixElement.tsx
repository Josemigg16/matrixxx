export default function MatrixElement({ number }: { number: string }) {
	let formatedNumber: { numerator: string; denominator: string } = {
		numerator: number.split('/')[0],
		denominator: number.split('/')[1] || '1'
	}

	return (
		<div class='relative mx-3 flex flex-col h-[40px] justify-center text-center'>
			<span class='-mb-1'>{formatedNumber.numerator}</span>
			{formatedNumber.numerator !== '0' && formatedNumber.denominator !== '1' && (
				<>
					<div class='bg-black h-[1px] text-slate-700 select-none'>.</div>
					<span class='-mt-1'>{formatedNumber.denominator}</span>
				</>
			)}
		</div>
	)
}
