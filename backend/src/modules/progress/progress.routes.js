"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const progress_controller_1 = require("./progress.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/subjects/:subjectId', authMiddleware_1.requireAuth, progress_controller_1.getSubjectProgress);
router.get('/videos/:videoId', authMiddleware_1.requireAuth, progress_controller_1.getVideoProgress);
router.post('/videos/:videoId', authMiddleware_1.requireAuth, progress_controller_1.updateVideoProgress);
exports.default = router;
//# sourceMappingURL=progress.routes.js.map