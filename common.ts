import { Entry } from 'models'

export function colorForValue(value: number, colors: { [key: number]: string}) {
	let color = ""
	let upCountedValue = value

	let closestValue: number = Infinity

	for (let [threshold, thresholdColor] of Object.entries(colors)) {
		const thresholdAsNumber: number = +threshold
		if (value <= thresholdAsNumber && thresholdAsNumber < closestValue) {
			closestValue = thresholdAsNumber
			color = thresholdColor
		}
	}

	return color
}

export function colorsWithThresholdFor(entries: Entry[], colors: string[]) {
	const values = entries.filter(entry => entry.value != null).map(entry => entry.value!)
	const min = Math.min.apply(null, values)
	const max = Math.max.apply(null, values)

	let colorsWithThreshold: { [key: number]: string} = {}

	if (values.length <= 1) {
		colorsWithThreshold[0] = colors[0]
	} else {
		const steps = (max - min) / (colors.length - 1)
		let multiplier = 0
		for (let color of colors) {
			colorsWithThreshold[min + (steps * multiplier)] = color
			multiplier ++
		}
	}

	return colorsWithThreshold
}
