import { Client } from '@notionhq/client';
import { Issue } from './models';

const notionApi = async (apiKey: string, database_id: string) => {
	let notion = await new Client({ auth: apiKey });
	return {
		create: async (name: string, url: string, id: number, state: string) => {
			try {
				let response = await notion.pages.create({
					parent: {
						database_id: database_id
					},
					properties: {
						//@ts-ignore
						Name: {
							title: [
								{ text: { content: name }, type: 'text' }
							]
						},
						//@ts-ignore
						'URL': {
							url: url
						},
						// @ts-ignore
						id: {
							number: id
						},
						state: {
							//@ts-ignore
							select: {
								name: state,
								color: (state === 'open')? 'green':'red'
							}
						}
					}
				})

				if (response) return "✔ page created";
			} catch (error) {
				throw error;
			}
		},
		updateLabel: async (labels: any, id: number) => {
			console.log(labels, id);
			try {
				let LabelList = labels.map((el: any) => ({ name: el.name }));
				const response = await notion.databases.query({
					database_id: database_id,
					filter: {
						property: 'id',
						number: {
							equals: id
						}
					}
				});
				let pageID = response.results[0].id;
				let res = await notion.pages.update({
					page_id: pageID,
					properties: {
						//@ts-ignore
						labels: {
							multi_select: LabelList
						}
					}
				});
				if (res) return "✔ labels updated"
			} catch (error) {
				throw error;
			}

		},
		updateName: async (name: string, id: number) => {
			const response = await notion.databases.query({
				database_id: database_id,
				filter: {
					property: 'id',
					number: {
						equals: id
					}
				}
			});
			let pageID = response.results[0].id;

			let res = await notion.pages.update({
				page_id: pageID,
				properties: {
					//@ts-ignore
					Name: {
						title: [
							{ text: { content: name }, type: 'text' }
						]
					}
				}
			});
			if (res) return "✔ labels updated"
		},
		updateState: async (state: string, id: number) => {
			try {
				const response = await notion.databases.query({
					database_id: database_id,
					filter: {
						property: 'id',
						number: {
							equals: id
						}
					}
				});
				let pageID = response.results[0].id;

				let res = await notion.pages.update({
					page_id: pageID,
					properties: {
						//@ts-ignore
						state: {
							//@ts-ignore
							select: {
								name: state,
								color: (state === 'open')? 'green':'red'
							}
						}
					}
				});
				if (res) return "✔ state updated"
			} catch (error) {
				throw error
			}
		}
	}
}

export const Notion = async (api_key: string, database_id: string, issue: Issue) => {
	const notion = await notionApi(api_key, database_id);
	return {
		issueCreated: async () => {
			//TODO: Create a page in notion 
			try {
				let res = await notion.create(issue.title, issue.html_url, issue.id, issue.state);
				console.log(res);
			} catch (error) {
				throw error
			}
		},
		issueEdited: async () => {
			try {
				let res = notion.updateName(issue.title, issue.id);
				console.log(res);
			} catch (error) {
				throw error;
			}
		},
		issueClosed: async () => {
			try {
				let res = await notion.updateState(issue.state, issue.id);
				console.log(res);
			} catch (error) {
				throw error
			}
		},
		issueDeleted: async () => {

		},
		issueRepoened: async () => {
			let res = await notion.updateState(issue.state, issue.id);
			console.log(res);
		},
		issueLabeled: async () => {
			try {
				let res = await notion.updateLabel(issue.labels, issue.id);
				console.log(res);
			} catch (error) {
				throw error;
			}
		},
		issueUnlabeled: async () => {
			try {
				let res = await notion.updateLabel(issue.labels, issue.id);
				console.log(res);
			} catch (error) {
				throw error;
			}
		}
	}
}