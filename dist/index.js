"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const util_1 = require("./util");
const models_1 = require("./models");
const notion_1 = require("./notion");
const token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;
const eventName = process.env.GITHUB_EVENT_NAME;
const notionApiKey = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const notionDatabase = process.env.NOTION_DATABASE || core.getInput('NOTION_DATABASE');
exports.run = async () => {
    if (!token)
        throw new Error("Github token not found");
    if (!notionApiKey)
        throw new Error("Notion API Key missing");
    if (!notionDatabase)
        throw new Error("Notion Database ID missing");
    const action = github.context.payload.action;
    if (!eventName || !action)
        throw new Error("Event Name or action missing");
    await main(util_1.eventType(eventName, action), util_1.getIssue(github.context.payload.issue));
};
const main = async (eventType, issue) => {
    let notion = await notion_1.Notion(notionApiKey, notionDatabase, issue);
    if (eventType.split('.')[0] === 'issues') {
        switch (eventType) {
            case models_1.Issues().opened():
                return await notion.issueCreated();
            case models_1.Issues().closed():
                return await notion.issueClosed();
            case models_1.Issues().edited():
                return await notion.issueEdited();
            case models_1.Issues().deleted():
                return await notion.issueDeleted();
            case models_1.Issues().reopened():
                return await notion.issueRepoened();
            case models_1.Issues().labeled():
                return await notion.issueLabeled();
            case models_1.Issues().unlabeled():
                return await notion.issueUnlabeled();
            default:
                console.log("Something happend that I am not accountable for");
        }
    }
};
exports.run()
    .then(() => { })
    .catch((err) => {
    console.log("ERROR", err);
    core.setFailed(err.message);
});
//# sourceMappingURL=index.js.map