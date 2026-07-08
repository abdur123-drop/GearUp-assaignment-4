import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { reviewValidation } from "./review.validation";

const router = Router()

router.post("/", auth(Role.CUSTOMER),validateRequest(reviewValidation.createReviewValidationSchema), reviewController.createReview)

export const reviewRouter = router;