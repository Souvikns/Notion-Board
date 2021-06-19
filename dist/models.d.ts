export declare const Issues: () => {
    opened: () => string;
    edited: () => string;
    deleted: () => string;
    closed: () => string;
    reopened: () => string;
    labeled: () => string;
    unlabeled: () => string;
};
export interface Issue {
    id: number;
    state: string;
    title: string;
    body: string;
    html_url: string;
    comments_url: string;
    labels: any;
}
