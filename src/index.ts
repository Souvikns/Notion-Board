import * as core from '@actions/core';
import * as github from '@actions/github';
import { eventType, getIssue } from './util';
import { Issue, Issues } from './models';
import { Notion } from './notion';

const token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;
const eventName = process.env.GITHUB_EVENT_NAME;
const notionApiKey = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const notionDatabase = process.env.NOTION_DATABASE || core.getInput('NOTION_DATABASE');

export const run = async () => {
	if (!token) throw new Error("Github token not found");
	if (!notionApiKey) throw new Error("Notion API Key missing");
	if (!notionDatabase) throw new Error("Notion Database ID missing");
	const action = github.context.payload.action;
	if (!eventName || !action) throw new Error("Event Name or action missing");
	await main(eventType(eventName, action), getIssue(github.context.payload.issue));
}

const main = async (eventType: string, issue: Issue) => {
	let notion = await Notion(notionApiKey, notionDatabase, issue);
	if (eventType.split('.')[0] === 'issues') {
		switch (eventType) {
			case Issues().opened():
				return await notion.issueCreated();
			case Issues().closed():
				return await notion.issueClosed();
			case Issues().edited():
				return await notion.issueEdited();
			case Issues().deleted():
				return await notion.issueDeleted();
			case Issues().reopened():
				return await notion.issueReopened();
			case Issues().labeled():
				return await notion.issueLabeled();
			case Issues().unlabeled():
				return await notion.issueUnlabeled();
			default:
				console.log("Something happend that I am not accountable for");
		}
	}
}

run()
	.then(() => { })
	.catch((err) => {
		console.log("ERROR", err);
		core.setFailed(err.message);
	})
