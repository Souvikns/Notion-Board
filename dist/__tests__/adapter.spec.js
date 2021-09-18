"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const adapter_1 = require("../adapter");
dotenv_1.default.config();
const api_key = process.env.API_KEY || '';
const database_id = process.env.DATABASE_ID || '';
const notion = new adapter_1.NotionAdapter(api_key, database_id);
describe('checking', () => {
    test('', async () => {
        await notion.setup();
    }, 10000);
});
//# sourceMappingURL=adapter.spec.js.map