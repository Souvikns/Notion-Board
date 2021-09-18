import dotenv from 'dotenv';
import {NotionAdapter} from '../adapter';
dotenv.config();

const api_key = process.env.API_KEY || '';
const database_id = process.env.DATABASE_ID || '';

const notion = new NotionAdapter(api_key, database_id);

describe('checking', () => {
  test('', async () => {
    await notion.setup();
  }, 10000)
})