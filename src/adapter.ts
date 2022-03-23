import { Client } from '@notionhq/client';
import { IPageInput, Issue, IssueState } from './models';

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

  async isPageAvailable(ghId: number) {
    const pages = await this.client.databases.query({
      database_id: this.databaseId,
      filter: {
        property: 'ID',
        number: {
          equals: ghId
        }
      }
    });

    const notionPage = pages.results[0];
    if (notionPage) return notionPage;

    return undefined;
  }

  async updateCompletePage(issue: Issue, page_id: string) {
    try {
      let LabelList = issue.labels.map((el: any) => ({ name: el.name }));
      await this.client.pages.update({
        page_id: page_id,
        properties: {
          Name: {
            title: [
              { text: { content: issue.title }, type: 'text' }
            ]
          },
          URL: {
            url: issue.html_url
          },
          State: {
            select: { name: issue.state }
          },
          ID: {
            number: issue.id
          },
          Label: {
            multi_select: LabelList
          }
        }
      })
      return {}
    } catch (error) {
      return {error};
    }
  }

  async createPage(input: IPageInput): Promise<{ error?: Error | unknown; }> {
    const ghLabels = input.lables.map((l: any) => ({name: l.name}))
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
          },
          Label: {
            multi_select: ghLabels
          }
        }
      });
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
      } as any)
    } catch (error) {
      throw error
    }
  }
}
