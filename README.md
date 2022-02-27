# Heatmap Calendar plugin for Obsidian

This Obsidian plugin creates a full year heatmap calendar similar to github activity calendar.  
It's intended to be used with DataviewJS (another obsidian plugin) – but could possibly be used standalone or with other plugins  

![heatmap calendar examples](https://github.com/richardsl/heatmap-calendar-obsidian/github-images/master/heatmap-calendar-examples.jpg?raw=true)

### How it works:

You first annotate your data in daily notes, see [dateview annotation documentation](https://blacksmithgu.github.io/obsidian-dataview/data-annotation/).  
You then create a [DataviewJS block](https://blacksmithgu.github.io/obsidian-dataview/api/intro/) where you iterate over your data and pass it into this plugin using *window.renderHeatmapCalendar()* or just *renderHeatmapCalendar()*.

![heatmap calendar how to example 1](https://github.com/richardsl/heatmap-calendar-obsidian/github-images/master/heatmap-calendar-howto1.png?raw=true)
![heatmap calendar how to example 2](https://github.com/richardsl/heatmap-calendar-obsidian/github-images/master/heatmap-calendar-howto2.png?raw=true)

### Use:

This plugin attaches a single function to the window object in obsidian – **renderHeatmapCalendar(this.container, calendarData)**  

    ```dataviewjs

    const calendarData = { 
        year: 2022, // optional, defaults to current year
        colors: {   // optional, defaults to green
          blue:        ["#8cb9ff","#69a3ff","#428bff","#1872ff","#0058e2"], // this first entry is considered default
          green:       ["#c6e48b","#7bc96f","#49af5d","#2e8840","#196127"],
          red:         ["#ff9e82","#ff7b55","#ff4d1a","#e73400","#bd2a00"],
          orange:      ["#ffa244","#fd7f00","#dd6f00","#bf6000","#9b4e00"],
          pink:        ["#ff96cb","#ff70b8","#ff3a9d","#ee0077","#c30062"],
          orangeToRed: ["#ffdf04","#ffbe04","#ff9a03","#ff6d02","#ff2c01"]
        },
        entries: [] // populated in the DataviewJS loop below
    }

    for(let page of dv.pages('"daily notes"').where(p=>p.exercise).sort(p=>p.file.name)){ //DataviewJS stuff
    
        calendarData.entries.push({
            date: page.file.name, // needs to be in format YYYY-MM-DD
            intensity: page.exercise // optional, what color to use for entry, will autoscale. default 5(darkest)
            content: "🏋️" // optional, adds text to the date cell (use at own risk)
            color: "orange" // optional, reference from your colors array. if no color is supplied; colors[0] is used
        })
          
    }

    /**
    * param1  HTMLElement   this gives the plugin a reference to render the calendar at
    * param2  CalendarData  your calendar object, with settings/data for the calendar
    */
    renderHeatmapCalendar(this.container, calendarData)


    ```

Open the EXAMPLE VAULT

### Notes:

- Still in beta
- Not tested on Mobile/small screens
- Doesn't adapt to darkmode yet
- Intended to be used with DataviewJS, but could possibly be used standalone or with other plugins as its just a global function
- Week starts on Monday, not configurable yet
- Date format (name of daily note) is currently YYYY-MM-DD, not configurable yet
- I used [leonardocolor.io](https://leonardocolor.io) to create the example color gradients