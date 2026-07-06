import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/register', authController.createUser)
router.post('/login', authController.logIn)

export const authRouter = router;