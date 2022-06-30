# Habit Tracker plugin for Obsidian

Visualise your Habits based on DataViewJS in [Obsidian](https://obsidian.md/)

## Use:

1. Annotate the data you want to track in your daily notes (see [Dataview annotation documentation](https://blacksmithgu.github.io/obsidian-dataview/data-annotation/)) 
2. Create a [DataviewJS block](https://blacksmithgu.github.io/obsidian-dataview/api/intro/) wherever you want the Habit Tracker to display.  
3. Collect the data you want to display using [DataviewJS](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)
4. Pass the data into Heatmap Calendar using  **renderHabitTracker()** 

![Habit Tracker Example](https://github.com/Narsail/habit-tracker-obsidian/blob/master/github-images/trackerExample.png)
![Habit Tracker Example with Values](https://github.com/Narsail/habit-tracker-obsidian/blob/master/github-images/trackerExampleWithValues.png)


## Full Example Code:

~~~javascript
\```dataviewjs
const weekData = {
	year: 2022,
	week: 25,
	habits: [
		{
			colors: ["#c6e48b", "#49af5d"],
			name: "iRacing",
			entries: [
				{
					date: "2022-06-26",
					value: 30
				},
				{
					date: "2022-06-21",
					value: 45
				}
			]
		},
		{
			colors: ["#49af5d", "#c6e48b"],
			name: "Language",
			entries: [
				{
					date: "2022-06-23",
					value: 30
				}
			]
		}
	]
}

renderHabitTracker(this.container, weekData)

```
~~~

---
### Known Limitations
- It currently only supports up to 7 habits.

---
### Attribution
This Plugin has been created on the foundation of [the Heatmap Calendar](https://github.com/Richardsl/heatmap-calendar-obsidian) by [Richard Slettevoll](https://github.com/Richardsl)

---

### Changelog:

#### [0.2.0] - 2022-06-30
- Added the concept of intensities. 
- Provide a value to the entity
- Provide multiple colors to map the values equidistant to the colors based on the min and max value

#### [0.1.0] - 2022-06-26
- initial release
