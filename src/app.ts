import { NotionAdapter } from './notion';
import {EventType, Issue, IssueState} from './model';

interface ActionEvents {
    [name: string]: Function
}

class ActionHandler {

    private actionEvents: ActionEvents = {};

    protected register(eventType: EventType, cb: Function) {
        this.actionEvents[eventType] = cb
    }

    async run(eventType: string, issue: Issue) {
        const cb = this.actionEvents[eventType];
        if (cb) {
            await cb(issue);
        }
    }
}


export default class App extends ActionHandler {
    private readonly notion: NotionAdapter;
    constructor(notion: NotionAdapter) {
        super();
        this.notion = notion;
        this.init();
    }

    private init(){
        super.register('issues.opened', async (issue: Issue) => {
            await this.notion.createPage({
                title: issue.title,
                id: issue.id,
                state: issue.state,
                url: issue.html_url,
                body: issue.body
            })

            await this.notion.updateLabel(issue.id, issue.labels);

            console.log('Issue successfully Synced');
        });

        super.register('issues.closed', async (issue: Issue) => {
            await this.notion.updateState(issue.id, issue.state);
            console.log("Issue State successfully Synced");
        });

        super.register('issues.labeled', async (issue: Issue) => {
          await this.notion.updateLabel(issue.id, issue.labels);
          console.log('label synced');  
        })

        super.register('issues.unlabeled', async (issues: Issue) => {
            await this.notion.updateLabel(issues.id, issues.labels);
            console.log('label synced');
        })

        super.register('issues.reopened', async (issue: Issue) => {
            await this.notion.updateState(issue.id, issue.state);
            console.log("state synced");
        })

        super.register('issues.edited', async (issue: Issue) => {
            await this.notion.updatePage(issue.id, issue.title);
            console.log('issue synced');
        })

    }

}