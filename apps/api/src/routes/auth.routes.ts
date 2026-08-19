import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";


const router: Router = Router();

router.post("/register", register)
router.post("/login", login)

router.get("/me", verifyToken, me)

export default router;