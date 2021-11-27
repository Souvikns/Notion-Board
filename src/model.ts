export type EventType = 'issues.opened' |
    'issues.closed' |
    'issues.edited' |
    'issues.deleted' |
    'issues.reopened' |
    'issues.labeled' |
    'issues.unlabeled';

export interface IPageInput {
	title: string,
	url: string,
	id: number,
	state: IssueState,
	body: string
}

export type IssueState = 'open' | 'closed'

export interface Issue {
	id: number,
	state: IssueState,
	title: string,
	body: string,
	html_url: string,
	comments_url: string,
	labels: any
}

export const getIssue = (issue: any): Issue => {
	return {
		id: issue.id,
		state: issue.state,
		title: issue.title,
		body: issue.body,
		html_url: issue.html_url,
		comments_url: issue.comments_url,
		labels: issue.labels
	}
}