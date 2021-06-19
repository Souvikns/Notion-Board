"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notion = void 0;
const client_1 = require("@notionhq/client");
const notionApi = async (apiKey, database_id) => {
    let notion = await new client_1.Client({ auth: apiKey });
    return {
        create: async (name, url, id, state) => {
            let stateColor = 'green';
            if (state === 'closed')
                stateColor = 'red';
            try {
                let response = await notion.pages.create({
                    parent: {
                        database_id: database_id
                    },
                    properties: {
                        //@ts-ignore
                        Name: {
                            title: [
                                { text: { content: name }, type: 'text' }
                            ]
                        },
                        //@ts-ignore
                        'URL': {
                            url: url
                        },
                        // @ts-ignore
                        id: {
                            number: id
                        },
                        state: {
                            select: {
                                name: state,
                                //@ts-ignore
                                color: stateColor
                            }
                        }
                    }
                });
                if (response)
                    return "✔ page created";
            }
            catch (error) {
                throw error;
            }
        },
        updateLabel: async (labels, id) => {
            try {
                let LabelList = labels.map((el) => ({ name: el.name }));
                const response = await notion.databases.query({
                    database_id: database_id,
                    filter: {
                        property: 'id',
                        number: {
                            equals: id
                        }
                    }
                });
                let pageID = response.results[0].id;
                let res = await notion.pages.update({
                    page_id: pageID,
                    properties: {
                        //@ts-ignore
                        labels: {
                            multi_select: LabelList
                        }
                    }
                });
                if (res)
                    return "✔ labels updated";
            }
            catch (error) {
                throw error;
            }
        }
    };
};
const Notion = async (api_key, database_id, issue) => {
    const notion = await notionApi(api_key, database_id);
    return {
        issueCreated: async () => {
            //TODO: Create a page in notion 
            try {
                let res = await notion.create(issue.title, issue.html_url, issue.id, issue.state);
                console.log(res);
            }
            catch (error) {
                throw error;
            }
        },
        issueEdited: async () => {
        },
        issueClosed: async () => {
        },
        issueDeleted: async () => {
        },
        issueRepoened: async () => {
        },
        issueLabeled: async () => {
            try {
                let res = await notion.updateLabel(issue.labels, issue.id);
                console.log(res);
            }
            catch (error) {
                throw error;
            }
        },
        issueUnlabeled: async () => {
        }
    };
};
exports.Notion = Notion;
//# sourceMappingURL=notion.js.map