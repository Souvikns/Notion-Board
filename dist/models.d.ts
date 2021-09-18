export declare const Issues: () => {
    opened: () => string;
    edited: () => string;
    deleted: () => string;
    closed: () => string;
    reopened: () => string;
    labeled: () => string;
    unlabeled: () => string;
};
export declare type IssueState = 'open' | 'closed';
export interface Issue {
    id: number;
    state: IssueState;
    title: string;
    body: string;
    html_url: string;
    comments_url: string;
    labels: any;
}
export interface IPageInput {
    title: string;
    url: string;
    id: number;
    state: IssueState;
    body: string;
}
