import { Client } from '@notionhq/client';
import { IPageInput, IssueState } from './models';
declare class NotionClient {
    protected client: Client;
    constructor(apiKey: string);
}
export declare class NotionAdapter extends NotionClient {
    private databaseId;
    private ICON_URL;
    constructor(apiKey: string, databaseId: string);
    createPage(input: IPageInput): Promise<{
        error?: Error | unknown;
    }>;
    updatePage(id: number, title: string, body: string): Promise<void>;
    setup(): Promise<{
        error?: Error | unknown;
    }>;
    updateState(state: IssueState, id: number): Promise<void>;
    updateLabel(id: number, labels: any): Promise<void>;
}
export {};
