import { Issue } from './models';

export const eventType = (event: string, action: string) => `${event}.${action}`;

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