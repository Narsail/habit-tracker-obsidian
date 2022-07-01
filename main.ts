import { Plugin, } from 'obsidian'
import { add, format } from 'date-fns'
import { colorForValue, colorsWithThresholdFor } from 'common'
import { WeekData, Habit, Entry } from 'models'

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
				const colorsWithThreshold: { [key: number]: string} = colorsWithThresholdFor(habit.entries, colors)

				// Create Boxes
				for (let day of week) {
					const box: Box = {}

					let filteredEntries = habit.entries.filter(entry => entry.date == day)

					if (filteredEntries.length > 0) {
						const entry = filteredEntries[0]
						box.date = entry.date

						const value: number = entry.value ?? 0

						box.backgroundColor = colorForValue(value, colorsWithThreshold)
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