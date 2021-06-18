"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssue = exports.eventType = void 0;
const eventType = (event, action) => `${event}.${action}`;
exports.eventType = eventType;
const getIssue = (issue) => {
    return {
        id: issue.id,
        state: issue.state,
        title: issue.title,
        body: issue.body,
        html_url: issue.html_url,
        comments_url: issue.comments_url,
        labels: issue.labels
    };
};
exports.getIssue = getIssue;
//# sourceMappingURL=util.js.map