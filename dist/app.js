"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
class App {
    notion;
    constructor(notion) {
        this.notion = notion;
    }
    async initialize() {
        const { error } = await this.notion.setup();
        return {
            response: '✅ Setup Complete!!',
            error: error
        };
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map