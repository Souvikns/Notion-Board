"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issues = void 0;
const Issues = () => {
    const event = "issues";
    return {
        opened: () => `${event}.opened`,
        edited: () => `${event}.edited`,
        deleted: () => `${event}.deleted`,
        closed: () => `${event}.closed`,
        reopened: () => `${event}.reopened`,
        labeled: () => `${event}.labeled`,
        unlabeled: () => `${event}.unlabeled`
    };
};
exports.Issues = Issues;
//# sourceMappingURL=models.js.map