import { NotionAdapter } from './adapter';
import { Issue, Issues } from './models'

export class App {
  constructor(
    private notion: NotionAdapter
  ) { }

  async initialize(githubIssues: Array<Issue>): Promise<{ response?: string, error?: Error | unknown }> {
    const { error } = await this.notion.setup();

    for (const ghIssue of githubIssues) {
      const page = await this.notion.isPageAvailable(ghIssue.id);
      console.log(ghIssue);
      if(!page) {
        const {error} = await this.notion.createPage({
          body: ghIssue.body,
          id: ghIssue.id,
          state: ghIssue.state,
          title: ghIssue.title,
          url: ghIssue.html_url,
          lables: ghIssue.labels
        });
        console.log(error);
      }else {
        const {error} = await this.notion.updateCompletePage(ghIssue, page.id);
        console.log(error);
      }
    }

    return {
      response: '✅ Setup Complete!!',
      error: error
    }
  }

  async IssueActionHandler(eventType: string, issue: Issue) {
    if (eventType.split('.')[0] === 'issues') {
      switch (eventType) {
        case Issues().opened():
          return await this.issueOpened(issue);
        case Issues().closed():
          return await this.issueClosed(issue);
        case Issues().edited():
          return await this.issueEdited(issue);
        case Issues().reopened():
          return await this.issueClosed(issue);
        case Issues().labeled():
          return await this.issueLabelUpdated(issue);
        case Issues().unlabeled():
          return this.issueLabelUpdated(issue);
        default:
          return console.log('🚩 Something happend that I am not accountable for.')
      }
    }
  }

  private async issueOpened(issue: Issue) {
    console.log(issue);
    await this.notion.createPage({
      title: issue.title,
      id: issue.id,
      state: issue.state,
      url: issue.html_url,
      body: issue.body || ''
    })
    await this.notion.updateLabel(issue.id, issue.labels);
    console.log('✅ Issue successfully Synced');
  }

  private async issueClosed(issue: Issue) {
    await this.notion.updateState(issue.state, issue.id);
    console.log('✅ Issue state successfully updated');
  }

  private async issueEdited(issue: Issue) {
    await this.notion.updatePage(issue.id, issue.title, issue.body);
    console.log('✅ Issue successfully synced');
  }

  private async issueLabelUpdated(issue: Issue) {
    await this.notion.updateLabel(issue.id, issue.labels);
    console.log('✅ Labels synced');
  }
}