
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