import { type Dispatch, type StateUpdater } from 'preact/hooks'
interface Props {
	value: number
	setValue: Dispatch<StateUpdater<number>>
}

export default function Select({ value, setValue }: Props) {
	const options = Array.from({ length: 10 }, (_, i) => i + 1)

	return (
		<div class='flex justify-end'>
			<select onChange={(e) => setValue(parseInt((e.target as HTMLSelectElement).value))}>
				{options.map((option) => (
					<option value={option} selected={value === option}>
						{option}
					</option>
				))}
			</select>
		</div>
	)
}
