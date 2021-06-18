import { Issue } from './models';
export declare const Notion: (api_key: string, database_id: string, issue: Issue) => {
    issueCreated: () => Promise<void>;
    issueEdited: () => Promise<void>;
    issueClosed: () => Promise<void>;
    issueDeleted: () => Promise<void>;
    issueRepoened: () => Promise<void>;
};
