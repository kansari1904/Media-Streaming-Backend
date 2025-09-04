import express from "express"
import {handlelogin,handleRegister,} from "../controllers/authControllers.js"

const router = express.Router();

router.post("/signup", handleRegister);
router.post("/login", handlelogin);




export default router;