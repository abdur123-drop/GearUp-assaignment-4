import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalOrderController } from "./rentelOrder.controller";

const router = Router()

router.post("/", auth(Role.CUSTOMER), rentalOrderController.createRental)
router.get("/", auth(Role.CUSTOMER, Role.ADMIN), rentalOrderController.getMyRental)
router.get("/:id", auth(Role.CUSTOMER, Role.PROVIDER, Role.ADMIN), rentalOrderController.getSingleRental)
router.patch("/status/:id", auth(Role.PROVIDER), rentalOrderController.updateRentalStatus)

export const rentelOrderROuter = router;