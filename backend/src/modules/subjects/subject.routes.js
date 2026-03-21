"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = require("./subject.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', subject_controller_1.getSubjects);
router.get('/:subjectId', subject_controller_1.getSubject);
router.get('/:subjectId/tree', authMiddleware_1.requireAuth, subject_controller_1.getSubjectTree);
router.get('/:subjectId/first-video', authMiddleware_1.requireAuth, subject_controller_1.getFirstVideo);
exports.default = router;
//# sourceMappingURL=subject.routes.js.map