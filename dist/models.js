"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issues = () => {
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
//# sourceMappingURL=models.js.map