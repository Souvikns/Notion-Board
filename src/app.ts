import { GithubAdapter } from "./adapters/github_adapter";
import { NotionAdapter } from "./adapters/notion_adapter";
import { logger } from "./logger";
import { Issue } from "./models/issue";

export class App {

    constructor(
        private readonly notionAdapter: NotionAdapter,
        private readonly githubAdapter: GithubAdapter,
        private readonly EventName: string,
        private readonly GitHubToken: string
    ) { }

    async run() {
        if (this.EventName === 'issues') {
            await this.IssueEventHandler(this.githubAdapter.action(), this.githubAdapter.getIssue());
        }
    }

    async workflowDispatchHandler(setup?: boolean, syncIssues?: boolean) {
        if (setup) {
            await this.setupNotionDatabase();
        }

        if (syncIssues) {
            await this.syncIssues();
        }
    }

    private async IssueEventHandler(action: string, issue: Issue) {
        if (action === 'opened') {
            this.notionAdapter.createPage(issue)
        } else {
            this.notionAdapter.updatePage(issue.id(), issue);
        }
    }

    private async setupNotionDatabase() {
        logger.info('Setting up Notion Database');
        await this.notionAdapter.setup();
    }

    private async syncIssues() {
        logger.info('Fetching all Issuess');
        const issues = await this.githubAdapter.fetchAllIssues(this.GitHubToken);

        for (const issue of issues) {
            console.log(issue.id());
            let pageId;
            try {
                pageId = await this.notionAdapter.findPage(issue.id());
            } catch (error) {
                console.log(error);
            }
            if (pageId) {
                this.notionAdapter.updatePage(issue.id(), issue);
            } else {
                this.notionAdapter.createPage(issue);
            }
        }
    }

}