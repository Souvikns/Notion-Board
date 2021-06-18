import { Client } from '@notionhq/client';
import { Issue } from './models';

export const Notion = (api_key: string, database_id: string, issue: Issue) => {
	const notion = new Client({ auth: api_key });
	return {
		issueCreated: async () => {
			console.log(issue);
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