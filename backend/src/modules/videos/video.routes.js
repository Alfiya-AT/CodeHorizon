"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_controller_1 = require("./video.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/:videoId', authMiddleware_1.requireAuth, video_controller_1.getVideo);
exports.default = router;
//# sourceMappingURL=video.routes.js.map