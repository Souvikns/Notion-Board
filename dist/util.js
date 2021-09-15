"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventType = (event, action) => `${event}.${action}`;
exports.getIssue = (issue) => {
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
//# sourceMappingURL=util.js.map