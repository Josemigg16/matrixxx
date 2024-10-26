export default function MatrixElement({ number }: { number: string }) {
	let formatedNumber: { numerator: string; denominator: string } = {
		numerator: number.split('/')[0],
		denominator: number.split('/')[1]
	}

	return (
		<div class='relative mx-3 flex flex-col h-[40px] justify-center'>
			<span class='-mb-1'>{formatedNumber.numerator}</span>
			{formatedNumber.numerator !== '0' && formatedNumber.denominator !== '1' && (
				<>
					<div class='absolute bottom-[22.5px] left-[14.5px] h-1 rotate-[68deg] text-xl'>/</div>
					<span class='-mt-1'>{formatedNumber.denominator}</span>
				</>
			)}
		</div>
	)
}
