import { Plugin, } from 'obsidian'
import { add, format } from 'date-fns'

interface WeekData {
	week: number
	year: number
	habits: Habit[]
}

interface Habit {
	colors: string[] 
	name: string
	entries: Entry[]
}
interface Entry {
	date: string
	value?: number
}
const DEFAULT_SETTINGS: WeekData = {
	year: 2022,
	week: 25,
	habits: [],
}
export default class HabitTracker extends Plugin {

	settings: WeekData

	getDateOfISOWeek(w: number, y: number) {
	    var simple = new Date(y, 0, 1 + (w - 1) * 7);
	    var dow = simple.getDay();
	    var ISOweekStart = simple;
	    if (dow <= 4)
	        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	    else
	        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	    return ISOweekStart;
	}

	async onload() {

		await this.loadSettings()

		//@ts-ignore
		window.renderHabitTracker = (el: HTMLElement, weekData: WeekData): void => {

			const mon = this.getDateOfISOWeek(weekData.week, weekData.year)
			const tue = add(mon, {days: 1})
			const wed = add(tue, {days: 1})
			const thu = add(wed, {days: 1})
			const fri = add(thu, {days: 1})
			const sat = add(fri, {days: 1})
			const sun = add(sat, {days: 1})

			const week = [
				format(mon, 'yyyy-MM-dd'),
				format(tue, 'yyyy-MM-dd'),
				format(wed, 'yyyy-MM-dd'),
				format(thu, 'yyyy-MM-dd'),
				format(fri, 'yyyy-MM-dd'),
				format(sat, 'yyyy-MM-dd'),
				format(sun, 'yyyy-MM-dd')
			]

			interface Box {
				backgroundColor?: string;
				date?: string;
				content?: string;
				classNames?: string
			}

			const boxes: Array<Box> = []

			const heatmapCalendarGraphDiv = createDiv({
				cls: "heatmap-calendar-graph",
				parent: el,
			})

			createDiv({
				cls: "heatmap-calendar-year",
				parent: heatmapCalendarGraphDiv,
			})

			const heatmapCalendarMonthsUl = createEl("ul", {
				cls: "heatmap-calendar-weekdays",
				parent: heatmapCalendarGraphDiv,
			})

			createEl("li", { text: "Mon", parent: heatmapCalendarMonthsUl, })
			createEl("li", { text: "Tue", parent: heatmapCalendarMonthsUl, })
			createEl("li", { text: "Wed", parent: heatmapCalendarMonthsUl, })
			createEl("li", { text: "Thu", parent: heatmapCalendarMonthsUl, })
			createEl("li", { text: "Fri", parent: heatmapCalendarMonthsUl, })
			createEl("li", { text: "Sat", parent: heatmapCalendarMonthsUl, })
			createEl("li", { text: "Sun", parent: heatmapCalendarMonthsUl, })

			// Put the Habits here

			const heatmapCalendarDaysUl = createEl("ul", {
				cls: "heatmap-calendar-habits",
				parent: heatmapCalendarGraphDiv,
			})

			for (let habit of weekData.habits) {
				createEl("li", { text: habit.name, parent: heatmapCalendarDaysUl, })

				// Check Colors
				const colors = habit.colors
				const numberOfColors = colors.length
				if (numberOfColors == 0) {
					throw new Error("Missing Colors for " + habit.name)
				}

				// Check whether we have values
				const values = habit.entries.filter(entry => entry.value != null).map(entry => entry.value!)
				const min = Math.min.apply(null, values)
				const max = Math.max.apply(null, values)

				let colorsWithThreshold: { [key: number]: string} = {}

				if (values.length <= 1) {
					colorsWithThreshold[0] = colors[0]
				} else {
					const steps = (max - min) / numberOfColors
					let multiplier = 1
					for (let color of colors) {
						colorsWithThreshold[(min+ steps) * multiplier] = color
						multiplier ++
					}
				}

				// Create Boxes
				for (let day of week) {
					const box: Box = {}

					let filteredEntries = habit.entries.filter(entry => entry.date == day)

					if (filteredEntries.length > 0) {
						const entry = filteredEntries[0]
						box.date = entry.date

						const value = entry.value ?? 0

						let color = ""
						let closestValue = Infinity

						for (let threshold in colorsWithThreshold) {
							if (value <= threshold && threshold < closestValue) {
								closestValue = threshold
								color = colorsWithThreshold[threshold]
							}
						}

						box.backgroundColor = color
					}

					boxes.push(box)
				}

			}


			const heatmapCalendarBoxesUl = createEl("ul", {
				cls: "heatmap-calendar-boxes",
				parent: heatmapCalendarGraphDiv,
			})

			boxes.forEach(e => {
				createEl("li", {
					text: e.content,
					attr: {
						...e.backgroundColor && { style: `background-color: ${e.backgroundColor};`, },
					},
					cls: e.classNames,
					parent: heatmapCalendarBoxesUl,
				})
			})

		}
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}



