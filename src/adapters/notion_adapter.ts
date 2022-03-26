import { Client } from '@notionhq/client';
import { logger } from '../logger';
import { Issue } from '../models/issue';

class NotionClient {
    protected _client: Client;
    constructor(api_key: string) {
        this._client = new Client({ auth: api_key });
    }
}

export class NotionAdapter extends NotionClient {
    constructor(
        private readonly api_key: string,
        private readonly database_id: string
    ) {
        super(api_key);
    }

    async createPage(issue: Issue) {
        logger.info('Commensing new Page creation')
        await this._client.pages.create({
            parent: {
                database_id: this.database_id
            },
            properties: this.prepareNotionProperty(issue)
        })
        await this.sleep();
    }

    async updatePage(id: number, issue: Issue) {
        logger.info(`Finding page with id: ${id}`);
        const pageId = await this.findPage(id);
        await this.sleep();

        if (!pageId) {
            return logger.warn(`could not find page with id: ${id}`)
        }
        logger.info('Found page, contacting notion to update the page');

        // Updating the Notion Page according to the new Issue details. 
        await this._client.pages.update({
            page_id: pageId,
            properties: this.prepareNotionProperty(issue)
        });
        logger.info(`Notion Page with ID: ${pageId} updated successfully`);
        await this.sleep();
    }

    async findPage(id: number) {
        const pages = await this._client.databases.query({
            database_id: this.database_id,
            filter: {
                property: 'ID',
                number: {
                    equals: id
                }
            }
        });
        const page = pages.results[0].id;
        return page ? page : false;
    }

    sleep(ms: number = 1000) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    private prepareNotionProperty(issue: Issue) {
        return {
            Name: {
                title: [
                    { text: { content: issue.title() }, type: 'text' }
                ]
            },
            URL: {
                url: issue.html_url()
            },
            State: {
                select: { name: issue.state() }
            },
            ID: {
                number: issue.id()
            },
            label: {
                multi_select: issue.getLabelList()
            }
        } as any
    }

    async setup(){
        await this._client.databases.update({
            database_id: this.database_id,
            properties: {
                ID: {
                    number : {}
                },
                State: {
                    select: {
                        options: [
                            {name: 'open', color: 'green'},
                            {name: 'close', color: 'red'}
                        ]
                    }
                },
                URL: {
                    url: {}
                },
                Label: {
                    multi_select: {}
                }
            }
        })
    }
}