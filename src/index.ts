import * as core from '@actions/core';
import * as github from '@actions/github';
import { eventType } from './util';

const token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;
const eventName = process.env.GITHUB_EVENT_NAME;

export const run = async () => {
	if (!token) throw new Error("Github token not found");
	const action = github.context.payload.action;
	console.log("EVENT NAME", process.env.GITHUB_EVENT_NAME);
	console.log("ACTION", action);
	if (!eventName || !action) throw new Error("Event Name missing");
	console.log(eventType(eventName, action));
}

run()
	.then(() => { })
	.catch((err) => {
		console.log("ERROR", err);
		core.setFailed(err.message);
	})