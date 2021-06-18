import * as core from '@actions/core';
import * as github from '@actions/github';
import { eventType } from './util';
import { Issues } from './models';

const token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;
const eventName = process.env.GITHUB_EVENT_NAME;
const notionApiKey = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const notionDatabase = process.env.NOTION_DATABASE || core.getInput('NOTION_DATABASE');

export const run = async () => {
	if (!token) throw new Error("Github token not found");
	const action = github.context.payload.action;
	console.log("EVENT NAME", process.env.GITHUB_EVENT_NAME);
	console.log("ACTION", action);
	if (!eventName || !action) throw new Error("Event Name or action missing");
	await main(eventType(eventName, action));
	console.log(typeof notionApiKey);
	console.log(typeof notionDatabase);
}

const main = async (eventType: string) => {
	switch (eventType) {
		case Issues().opened():
			console.log("New Issue Opened and new page added in notion");
	}
}

run()
	.then(() => { })
	.catch((err) => {
		console.log("ERROR", err);
		core.setFailed(err.message);
	})