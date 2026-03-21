import { Router } from 'express';
import { getSubjectProgress, getVideoProgress, updateVideoProgress } from './progress.controller';
import { requireAuth } from '../../middleware/authMiddleware';

const router = Router();

router.get('/subjects/:subjectId', requireAuth, getSubjectProgress);
router.get('/videos/:videoId', requireAuth, getVideoProgress);
router.post('/videos/:videoId', requireAuth, updateVideoProgress);

export default router;
