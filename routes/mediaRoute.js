import express from 'express'
import { addMedia, getStreamUrl  } from '../controllers/mediaControllers.js';
import auth from '../middlewares/userAuth.js'

const router = express.Router();

router.post("/", auth, addMedia);
router.get("/:id/stream-url", getStreamUrl);

export default router;
