import express from 'express'
import { addMedia, getStreamUrl, logView, getAnalytics } from '../controllers/mediaControllers.js';
import auth from '../middlewares/userAuth.js'

const router = express.Router();

router.post("/", auth, addMedia);
router.get("/:id/stream-url", getStreamUrl);

router.post("/:id/view", auth, logView);
router.get("/:id/analytics", auth, getAnalytics);


export default router;
