import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalOrderController } from "./rentelOrder.controller";

const router = Router()

router.post("/", auth(Role.CUSTOMER), rentalOrderController.createRental)

export const rentelOrderROuter = router;