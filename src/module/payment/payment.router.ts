import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router()

router.post(
    "/create",
    auth(Role.CUSTOMER),
    paymentController.createPayment
);


router.post(
    "/confirm",
    auth(Role.CUSTOMER),
    paymentController.confirmPayment
);

router.get("/", auth(Role.CUSTOMER), paymentController.userPaymentHistory)
router.get("/:id", auth(Role.CUSTOMER), paymentController.paymentDetails)

export const paymentRouter = router;