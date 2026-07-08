import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearController } from "./gear.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createGearValidationSchema } from "./gear.validatio";

const router = Router()

router.post("/", auth(Role.PROVIDER),validateRequest(createGearValidationSchema), gearController.createGear)
router.get("/", gearController.getAllGear)
router.get("/:id", gearController.getSingleGear)
router.patch("/:id", auth(Role.PROVIDER), gearController.updateGear)
router.delete("/:id", auth(Role.PROVIDER), gearController.deleteGear)

export const gearRouter = router;