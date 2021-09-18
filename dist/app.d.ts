import { NotionAdapter } from './adapter';
export declare class App {
    private notion;
    constructor(notion: NotionAdapter);
    initialize(): Promise<{
        response?: string;
        error?: Error | unknown;
    }>;
}
