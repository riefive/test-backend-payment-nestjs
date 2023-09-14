/**
 * based on https://stackoverflow.com/questions/41948/how-do-i-get-the-difference-between-two-dates-in-javascript
 * @param date1, @param date2, @param type
 * @returns a number
 */
export const differenceOfTwoDate = (date1: any, date2: any, type = 'hour') => {
	const msMinutes = 60 * 1000
	const msHours = 60 * 60 * 1000
	const msDays = 60 * 60 * 24 * 1000

	const newDate1 = new Date(date1)
	const newDate2 = new Date(date2)
	const diff = newDate2.getTime() - newDate1.getTime()

	let result = 0
	switch (type) {
		case 'minute':
			result = diff / msMinutes
			break
		case 'hour':
			result = diff / msHours
			break
		case 'day':
			result = diff / msDays
			break
	}

	return Math.floor(result)
}

export const sleep = async (ms = 15) => {
	return await new Promise((resolve) => setTimeout(resolve, ms))
}
