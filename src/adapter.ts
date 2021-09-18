import { Client } from '@notionhq/client';
import { IPageInput, IssueState } from './models';

class NotionClient {
  protected client: Client;
  constructor(apiKey: string) {
    this.client = new Client({ auth: apiKey });
  }
}

export class NotionAdapter extends NotionClient {
  private ICON_URL = 'https://github.com/Souvikns/Notion-Board/blob/main/screenshots/iterative.png?raw=true';
  constructor(apiKey: string, private databaseId: string) {
    super(apiKey);
  }

  async createPage(input: IPageInput): Promise<{ error?: Error | unknown; }> {
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
      } as any);
      return {}
    } catch (error) {
      return { error };
    }
  }

  async updatePage(id: number, title: string, body: string) {
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
      } as any);
    } catch (error) {
     throw error; 
    }
  }

  async setup(): Promise<{ error?: Error | unknown }> {
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
      })
      return {}
    } catch (error) {
      return { error }
    }
  }

  async updateState(state: IssueState, id: number) {

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
      } as any);
    } catch (error) {
      throw error;
    }
  }

  async updateLabel(id: number, labels: any) {
    try {
      const labelList = labels.map((el: any) => ({name: el.name}));
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
      } as any)
    } catch (error) {
      throw error
    }
  }
}
