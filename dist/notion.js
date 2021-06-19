"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notion = void 0;
const client_1 = require("@notionhq/client");
const Notion = (api_key, database_id, issue) => {
    const notion = new client_1.Client({ auth: api_key });
    return {
        issueCreated: async () => {
            //TODO: Create a page in notion 
            const response = await notion.pages.create({
                parent: {
                    database_id: database_id
                },
                properties: {
                    Name: {
                        title: [
                            //@ts-ignore
                            {
                                text: {
                                    content: issue.title
                                },
                            }
                        ]
                    },
                    //@ts-ignore
                    'URL': {
                        url: issue.html_url
                    }
                }
            });
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