import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalOrderController } from "./rentelOrder.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { rentalValidation } from "./rentelOrder.validation";

const router = Router()

router.post("/", auth(Role.CUSTOMER),validateRequest(rentalValidation.createRentalValidationSchema), rentalOrderController.createRental)
router.get("/", auth(Role.CUSTOMER, Role.ADMIN), rentalOrderController.getMyRental)
router.get("/:id", auth(Role.CUSTOMER, Role.PROVIDER, Role.ADMIN), rentalOrderController.getSingleRental)
router.patch("/status/:id", auth(Role.PROVIDER),validateRequest(rentalValidation.updateRentalStatusValidationSchema), rentalOrderController.updateRentalStatus)

export const rentelOrderROuter = router;