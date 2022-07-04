## Tracker - Calendar Week 26
```dataviewjs

const weekData = {
	year: 2022,
	week: 26,
	habits: []
}

// iRacing
const iRacingHabit = {
	colors: ["#ffdf04","#ffbe04","#ff9a03","#ff6d02","#ff2c01"],
	name: "🏎  iRacing",
	entries: []
}

for(let page of dv.pages('"data"').where(p=>p.iRacing)){

	const myArray = String(page.file.name).split("_");  
	let date = myArray[0];

    iRacingHabit.entries.push({
        date: date,
        value: page.iRacing
    })      
}

weekData.habits.push(iRacingHabit)

// Reading
const readingHabit = {
	colors: ["#c6e48b","#7bc96f","#49af5d","#2e8840","#196127"],
	name: "📚  Reading",
	entries: []
}

for(let page of dv.pages('"data"').where(p=>p.Reading)){

	const myArray = String(page.file.name).split("_");  
	let date = myArray[0];

    readingHabit.entries.push({
        date: date,
        value: page.Reading
    })      
}

weekData.habits.push(readingHabit)

// Exercise
const exerciseHabit = {
	colors: ["#ff96cb","#ff70b8","#ff3a9d","#ee0077","#c30062"],
	name: "🏄‍♂️  Exercise",
	entries: []
}

for(let page of dv.pages('"data"').where(p=>p.Exercise)){

	const myArray = String(page.file.name).split("_");  
	let date = myArray[0];

    exerciseHabit.entries.push({
        date: date,
        value: page.Exercise
    })      
}

weekData.habits.push(exerciseHabit)

renderHabitTracker(this.container, weekData)

```