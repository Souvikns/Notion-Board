
export const Issues = () => {
	const event = "issues"
	return {
		opened: () => `${event}.opened`,
		edited: () => `${event}.edited`,
		deleted: () => `${event}.deleted`,
		closed: () => `${event}.closed`,
		reopened: () => `${event}.reopened`
	}
}

export interface Issue {
	id: number,
	state: string,
	title: string,
	body: string,
	html_url: string,
	comments_url: string,
	labels: any
}