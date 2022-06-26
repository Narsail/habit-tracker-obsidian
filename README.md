# Habit Tracker plugin for Obsidian

Visualise your Habits based on DataViewJS in [Obsidian](https://obsidian.md/)

## Use:

1. Annotate the data you want to track in your daily notes (see [Dataview annotation documentation](https://blacksmithgu.github.io/obsidian-dataview/data-annotation/)) 
2. Create a [DataviewJS block](https://blacksmithgu.github.io/obsidian-dataview/api/intro/) wherever you want the Habit Tracker to display.  
3. Collect the data you want to display using [DataviewJS](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)
4. Pass the data into Heatmap Calendar using  **renderHabitTracker()** 

![Habit Tracker Example](https://github.com/Narsail/habit-tracker-obsidian/blob/master/github-images/trackerExample.png)


## Full Example Code:

~~~javascript
\```dataviewjs
const weekData = {
	year: 2022,
	week: 25,
	habits: [
		{
			color: "#c6e48b",
			name: "iRacing",
			entries: [
				{
					date: "2022-06-26"
				},
				{
					date: "2022-06-21"
				}
			]
		},
		{
			color: "#49af5d",
			name: "Language",
			entries: [
				{
					date: "2022-06-23"
				}
			]
		}
	]
}

renderHabitTracker(this.container, weekData)

```
~~~

  

---

### Changelog:



#### [0.1.0] - 2022-02-23
- initial release
