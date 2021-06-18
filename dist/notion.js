"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notion = void 0;
const client_1 = require("@notionhq/client");
const Notion = (api_key, database_id, issue) => {
    const notion = new client_1.Client({ auth: api_key });
    return {
        issueCreated: async () => {
            console.log(issue);
        },
        issueEdited: async () => {
        },
        issueClosed: async () => {
        },
        issueDeleted: async () => {
        },
        issueRepoened: async () => {
        }
    };
};
exports.Notion = Notion;
//# sourceMappingURL=notion.js.map