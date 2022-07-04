import { Plugin, } from 'obsidian';
import { add, format } from 'date-fns';
import { colorForValue, colorsWithThresholdFor } from 'common';
import { WeekData, Habit, Entry, Box } from 'models';

export default class HabitTracker extends Plugin {

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

		//@ts-ignore
		window.renderHabitTracker = (el: HTMLElement, weekData: WeekData): void => {

			const mon = this.getDateOfISOWeek(weekData.week, weekData.year);
			const tue = add(mon, {days: 1});
			const wed = add(tue, {days: 1});
			const thu = add(wed, {days: 1});
			const fri = add(thu, {days: 1});
			const sat = add(fri, {days: 1});
			const sun = add(sat, {days: 1});

			const week = [
				format(mon, 'yyyy-MM-dd'),
				format(tue, 'yyyy-MM-dd'),
				format(wed, 'yyyy-MM-dd'),
				format(thu, 'yyyy-MM-dd'),
				format(fri, 'yyyy-MM-dd'),
				format(sat, 'yyyy-MM-dd'),
				format(sun, 'yyyy-MM-dd')
			];

			const boxes: Array<Box> = [];

			const habitTrackerViewDiv = createDiv({
				cls: "habit-tracker-view",
				parent: el,
			});

			createDiv({
				cls: "habit-tracker-year",
				parent: habitTrackerViewDiv,
			});

			const habitTrackerWeekDaysUL = createEl("ul", {
				cls: "habit-tracker-weekdays",
				parent: habitTrackerViewDiv,
			});

			habitTrackerWeekDaysUL.createEl("li", { text: "Mon", });
			habitTrackerWeekDaysUL.createEl("li", { text: "Tue", });
			habitTrackerWeekDaysUL.createEl("li", { text: "Wed", });
			habitTrackerWeekDaysUL.createEl("li", { text: "Fri", });
			habitTrackerWeekDaysUL.createEl("li", { text: "Sat", });
			habitTrackerWeekDaysUL.createEl("li", { text: "Thu", });
			habitTrackerWeekDaysUL.createEl("li", { text: "Sun", });

			// Put the Habits here

			const habitTrackerHabitsUl = createEl("ul", {
				cls: "habit-tracker-habits",
				parent: habitTrackerViewDiv,
			});

			for (let habit of weekData.habits) {
				habitTrackerHabitsUl.createEl("li", { text: habit.name, });

				// Check Colors
				const colors = habit.colors;
				const numberOfColors = colors.length;
				if (numberOfColors == 0) {
					throw new Error("Missing Colors for " + habit.name);
				};

				// Check whether we have values
				const colorsWithThreshold: { [key: number]: string} = colorsWithThresholdFor(habit.entries, colors);

				// Create Boxes
				for (let day of week) {
					const box: Box = {};

					let filteredEntries = habit.entries.filter(entry => entry.date == day);

					if (filteredEntries.length > 0) {
						const entry = filteredEntries[0];
						box.date = entry.date;

						const value: number = entry.value ?? 0;

						box.backgroundColor = colorForValue(value, colorsWithThreshold);
					}

					boxes.push(box);
				};

			};


			const habitTrackerBoxesUl = createEl("ul", {
				cls: "habit-tracker-boxes",
				parent: habitTrackerViewDiv,
			});

			boxes.forEach(e => {
				habitTrackerBoxesUl.createEl("li", {
					text: e.content,
					attr: {
						...e.backgroundColor && { style: `background-color: ${e.backgroundColor};`, },
					},
					cls: e.classNames,
				});
			});

		};
	};
};