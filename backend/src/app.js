"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const security_1 = require("./config/security");
const errorHandler_1 = require("./middleware/errorHandler");
const requestLogger_1 = require("./middleware/requestLogger");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const health_routes_1 = __importDefault(require("./modules/health/health.routes"));
const subject_routes_1 = __importDefault(require("./modules/subjects/subject.routes"));
const video_routes_1 = __importDefault(require("./modules/videos/video.routes"));
const progress_routes_1 = __importDefault(require("./modules/progress/progress.routes"));
const subject_controller_1 = require("./modules/subjects/subject.controller"); // Ensure it doesn't need auth
const app = (0, express_1.default)();
app.use((0, cors_1.default)(security_1.securityConfig.cors));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(requestLogger_1.requestLogger);
app.use('/api/health', health_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/subjects', subject_routes_1.default);
app.use('/api/videos', video_routes_1.default);
app.use('/api/progress', progress_routes_1.default);
// BigInt JSON serialization fix
BigInt.prototype.toJSON = function () {
    return this.toString();
};
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map