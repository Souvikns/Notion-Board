"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const util_1 = require("./util");
const models_1 = require("./models");
const notion_1 = require("./notion");
const token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;
const eventName = process.env.GITHUB_EVENT_NAME;
const notionApiKey = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const notionDatabase = process.env.NOTION_DATABASE || core.getInput('NOTION_DATABASE');
const run = async () => {
    if (!token)
        throw new Error("Github token not found");
    if (!notionApiKey)
        throw new Error("Notion API Key missing");
    if (!notionDatabase)
        throw new Error("Notion Database ID missing");
    const action = github.context.payload.action;
    if (!eventName || !action)
        throw new Error("Event Name or action missing");
    await main((0, util_1.eventType)(eventName, action), (0, util_1.getIssue)(github.context.payload.issue));
};
exports.run = run;
const main = async (eventType, issue) => {
    let notion = await (0, notion_1.Notion)(notionApiKey, notionDatabase, issue);
    if (eventType.split('.')[0] === 'issues') {
        switch (eventType) {
            case (0, models_1.Issues)().opened():
                return await notion.issueCreated();
            case (0, models_1.Issues)().closed():
                return await notion.issueClosed();
            case (0, models_1.Issues)().edited():
                return await notion.issueEdited();
            case (0, models_1.Issues)().deleted():
                return await notion.issueDeleted();
            case (0, models_1.Issues)().reopened():
                return await notion.issueReopened();
            case (0, models_1.Issues)().labeled():
                return await notion.issueLabeled();
            case (0, models_1.Issues)().unlabeled():
                return await notion.issueUnlabeled();
            default:
                console.log("Something happend that I am not accountable for");
        }
    }
};
(0, exports.run)()
    .then(() => { })
    .catch((err) => {
    console.log("ERROR", err);
    core.setFailed(err.message);
});
//# sourceMappingURL=index.js.map