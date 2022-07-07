# Habit Tracker plugin for Obsidian

Visualise your Habits based on DataViewJS in [Obsidian](https://obsidian.md/)

## Use:

1. Annotate the data you want to track in your daily notes (see [Dataview annotation documentation](https://blacksmithgu.github.io/obsidian-dataview/data-annotation/)) 
2. Create a [DataviewJS block](https://blacksmithgu.github.io/obsidian-dataview/api/intro/) wherever you want the Habit Tracker to display.  
3. Collect the data you want to display using [DataviewJS](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)
4. Pass the data into Habit Tracker using  **renderHabitTracker()** 

![Habit Tracker Example](https://raw.githubusercontent.com/Narsail/habit-tracker-obsidian/master/github-images/trackerExample.png)
![Habit Tracker Example with Values](https://raw.githubusercontent.com/Narsail/habit-tracker-obsidian/master/github-images/trackerExampleWithValues.png)


## Full Example Code:

~~~javascript
```dataviewjs
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

#### [0.3.3] - 2022-07-07
- Further clean up as per [Request](https://github.com/obsidianmd/obsidian-releases/pull/1027/#issuecomment-1177006856)

#### [0.3.2] - 2022-07-04
- Removed settings references
- Make the EL and UL creation cleaner

#### [0.3.1] - 2022-07-04
- Remove conflict with Heatmap calendar due to same named css classses

#### [0.3.0] - 2022-07-01
- Fixed a bug where a value wasn't assigned to the right color
- Added tests for two core logic functions
- Added rollup for better file management

#### [0.2.0] - 2022-06-30
- Added the concept of intensities. 
- Provide a value to the entity
- Provide multiple colors to map the values equidistant to the colors based on the min and max value

#### [0.1.0] - 2022-06-26
- initial release
