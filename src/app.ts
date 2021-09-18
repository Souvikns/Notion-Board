import { NotionAdapter } from './adapter';

export class App {
  constructor(
    private notion: NotionAdapter
  ) {}

  async initialize(): Promise<{response?: string, error?: Error | unknown}>{
    const {error} = await this.notion.setup();
    return {
      response: '✅ Setup Complete!!',
      error: error
    }
  }
}