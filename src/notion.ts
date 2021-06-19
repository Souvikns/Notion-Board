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
					'URL': {
						url: issue.html_url
					},
					//@ts-ignore
					id: {
						number: issue.id
					}
				}
			});
			if(response){
				console.log("✔ Page created");
			}
		},
		issueEdited: async () => {

		},
		issueClosed: async () => {

		},
		issueDeleted: async () => {

		},
		issueRepoened: async () => {

		},
		issueLabeled: async () => {
			const response = await notion.databases.query({
				database_id: database_id,
				filter: {
					property: 'id',
					number: {
						equals: issue.id
					}
				}
			});
			let pageID = response.results[0].id;
			notion.pages.update({
				page_id: pageID,
				properties: {
					//@ts-ignore
					lables: {
						multi_select: [
							{
								id: 'sd',
								name: 'label',
								color: 'orange'
							}
						]
					}
				}
			})
		}
	}
}