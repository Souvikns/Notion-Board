import * as core from '@actions/core';
import { GithubAdapter } from './adapters/github_adapter';
import { NotionAdapter } from './adapters/notion_adapter';
import { App } from './app';

const Token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;
const EventName = process.env.GITHUB_EVENT_NAME;
const NotionApiKey = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const NotionDatabaseId = process.env.NOTION_DATABASE || core.getInput('NOTION_DATABASE');

export const run = async () => {
    if (!Token) throw new Error("Missing GitHub token");
    if (!NotionApiKey) throw new Error('Missing Notion Api Key');
    if (!NotionDatabaseId) throw new Error('Missing Notion Database ID');
    const app = new App(
        new NotionAdapter(
            NotionApiKey,
            NotionDatabaseId
        ),
        new GithubAdapter(),
        EventName as string,
        Token
    );

    if (EventName === 'workflow_dispatch') {
        await app.workflowDispatchHandler(core.getBooleanInput('setup'), core.getBooleanInput('syncIssues'))
    }
    app.run();
}

run()
    .then(() => { })
    .catch(err => {
        console.log("ERROR", err);
        core.setFailed(err.message);
    })