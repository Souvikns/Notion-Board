export interface Label {
    color: string;
    default: boolean;
    description: string;
    name: string;
    node_id: string;
    url: string;
}
export declare class Issue {
    private _title;
    private _body;
    private _url;
    private _id;
    private _labels;
    constructor(id: number, title: string, body: string, url: string, labels: Array<Label>);
    get title(): string;
    get body(): string;
    get url(): string;
    get id(): number;
    get labels(): Array<Label>;
}
