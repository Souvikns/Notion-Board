export interface IssueInterface {
    id(): number;
    state(): string;
    title(): string;
    body(): string;
    html_url(): string;
    comments_url(): string;
    labels(): any;
}

export class Issue implements IssueInterface {
    constructor(
        private readonly _issue: Record<string, any>
    ){}
    id(): number {
        return this._issue.id;
    }
    state(): string {
        return this._issue.state;
    }
    title(): string {
        return this._issue.title;
    }
    body(): string {
        return this._issue.body;
    }
    html_url(): string {
        return this._issue.html_url;
    }
    comments_url(): string {
        return this._issue.comments_url;
    }
    labels() {
        return this._issue.labels;
    }

    getLabelList() {
        return this._issue.labels.map((el: any) => ({name: el.name}))
    }
    
}

