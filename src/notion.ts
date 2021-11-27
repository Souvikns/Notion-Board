import { Client } from '@notionhq/client';
import { IPageInput, IssueState } from './model';

class NotionCLient {
    protected client: Client;
    constructor(apiKey: string) {
        this.client = new Client({ auth: apiKey });
    }
}

export class NotionAdapter extends NotionCLient {
    constructor(apiKey: string, private databaseId: string) {
        super(apiKey);
    }

    async createPage(input: IPageInput) {
        await this.client.pages.create({
            parent: {
                database_id: this.databaseId
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
            }
        })
    }

    async updatePage(id: number, title: string) {
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
                        { text: { content: title }, type: 'text' }
                    ]
                }
            }
        });
    }

    async updateState(id: number, state: IssueState) {
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
                state: {
                    select: {
                        name: state
                    }
                }
            }
        });
    }

    async updateLabel(id: number, labels: any) {
        const labelList = labels.map((el: any) => ({ name: el.name }));
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
}