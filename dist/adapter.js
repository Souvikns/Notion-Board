"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionAdapter = void 0;
const client_1 = require("@notionhq/client");
class NotionClient {
    client;
    constructor(apiKey) {
        this.client = new client_1.Client({ auth: apiKey });
    }
}
class NotionAdapter extends NotionClient {
    databaseId;
    ICON_URL = 'https://github.com/Souvikns/Notion-Board/blob/main/screenshots/iterative.png?raw=true';
    constructor(apiKey, databaseId) {
        super(apiKey);
        this.databaseId = databaseId;
    }
    async createPage(input) {
        try {
            await this.client.pages.create({
                parent: {
                    database_id: this.databaseId
                },
                icon: {
                    external: {
                        url: this.ICON_URL
                    }
                },
                properties: {
                    Name: {
                        title: [
                            { text: { content: input.title }, type: 'text' }
                        ]
                    },
                    URL: {
                        url: input.url
                    },
                    ID: {
                        number: input.id
                    },
                    State: {
                        select: { name: input.state }
                    }
                },
                children: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        paragraph: {
                            text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: input.body
                                    }
                                },
                            ]
                        }
                    }
                ]
            });
            return {};
        }
        catch (error) {
            return { error };
        }
    }
    async updatePage(id, title, body) {
        try {
            const pages = await this.client.databases.query({
                database_id: this.databaseId,
                filter: {
                    property: 'ID',
                    number: {
                        equals: id
                    }
                }
            });
            const pageId = pages.results[0].id;
            await this.client.pages.update({
                page_id: pageId,
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: title,
                                },
                                type: 'text'
                            }
                        ]
                    }
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async setup() {
        try {
            await this.client.databases.update({
                database_id: this.databaseId,
                properties: {
                    URL: {
                        url: {}
                    },
                    ID: {
                        number: {}
                    },
                    State: {
                        select: {
                            options: [
                                { name: 'open', color: 'green' },
                                { name: 'closed', color: 'red' }
                            ]
                        }
                    },
                    Label: {
                        multi_select: {}
                    }
                }
            });
            return {};
        }
        catch (error) {
            return { error };
        }
    }
    async updateState(state, id) {
        try {
            const pages = await this.client.databases.query({
                database_id: this.databaseId,
                filter: {
                    property: 'ID',
                    number: {
                        equals: id
                    }
                }
            });
            const pageId = pages.results[0].id;
            await this.client.pages.update({
                page_id: pageId,
                properties: {
                    State: {
                        select: {
                            name: state
                        }
                    }
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateLabel(id, labels) {
        try {
            const labelList = labels.map((el) => ({ name: el.name }));
            const pages = await this.client.databases.query({
                database_id: this.databaseId,
                filter: {
                    property: 'ID',
                    number: {
                        equals: id
                    }
                }
            });
            const pageId = pages.results[0].id;
            await this.client.pages.update({
                page_id: pageId,
                properties: {
                    Label: {
                        multi_select: labelList
                    }
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.NotionAdapter = NotionAdapter;
//# sourceMappingURL=adapter.js.map