import * as core from '@actions/core';
import * as github from '@actions/github';
import App from './app';
import { NotionAdapter } from './notion';
import { getIssue } from './model';


const token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;
const notionApiKey = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const notionDatabase = process.env.NOTION_DATABASE || core.getInput('NOTION_DATABASE');

async function run() {
    if (!token) throw new Error("Github TOken not found");
    if (!notionApiKey) throw new Error("Notion api key not found");
    if (!notionDatabase) throw new Error("Notion database id missing");
    const action = github.context.payload.action;
    const eventName = github.context.eventName;

    const app = new App(new NotionAdapter(notionApiKey, notionDatabase));
    if (!eventName || !action) throw new Error('Event name or action missing');
    app.run(`${eventName}.${action}`, getIssue(github.context.payload.issue));
}


run()
    .then()
    .catch(e => {
        console.error("ERROR: ", e);
        core.setFailed(e.message);
    });