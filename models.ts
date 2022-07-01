export interface WeekData {
	week: number
	year: number
	habits: Habit[]
}

export interface Habit {
	colors: string[] 
	name: string
	entries: Entry[]
}

export interface Entry {
	date: string
	value?: number
}