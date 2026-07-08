import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import { catchAsync } from "../../utils/catchAsync";
import { jwtUtils } from "../../utils/token";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";

const router = Router();

router.post('/register',validateRequest(authValidation.registerValidationSchema), authController.createUser)
router.post('/login',validateRequest(authValidation.loginValidationSchema), authController.logIn)
router.get('/me', auth(Role.CUSTOMER, Role.ADMIN, Role.PROVIDER), authController.currentUser)

export const authRouter = router;