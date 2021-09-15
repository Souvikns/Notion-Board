import { Issue } from './models';
export declare const Notion: (api_key: string, database_id: string, issue: Issue) => Promise<{
    issueCreated: () => Promise<void>;
    issueEdited: () => Promise<void>;
    issueClosed: () => Promise<void>;
    issueDeleted: () => Promise<void>;
    issueReopened: () => Promise<void>;
    issueLabeled: () => Promise<void>;
    issueUnlabeled: () => Promise<void>;
}>;
