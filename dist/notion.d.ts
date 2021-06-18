export declare const Notion: (api_key: string, database_id: string, issue: any) => {
    issueCreated: () => Promise<void>;
    issueEdited: () => Promise<void>;
    issueClosed: () => Promise<void>;
    issueDeleted: () => Promise<void>;
    issueRepoened: () => Promise<void>;
};
