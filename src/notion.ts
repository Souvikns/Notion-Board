import { Client } from '@notionhq/client';
import { Issue } from './models';

export const Notion = (api_key: string, database_id: string, issue: Issue) => {
	const notion = new Client({ auth: api_key });
	return {
		issueCreated: async () => {
			//TODO: Create a page in notion 
			const response = await notion.pages.create({
				parent: {
					database_id: database_id
				},
				properties: {
					Name: {
						title: [
							//@ts-ignore
							{
								text: {
									content: issue.title
								},
							}
						]
					},
					//@ts-ignore
					'Issue URL': {
						url: issue.html_url
					}
				}
			})
		},
		issueEdited: async () => {

		},
		issueClosed: async () => {

		},
		issueDeleted: async () => {

		},
		issueRepoened: async () => {

		}
	}
}