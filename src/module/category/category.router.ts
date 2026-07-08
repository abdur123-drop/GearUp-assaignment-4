import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryCotroller } from "./category.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { categoryValidation } from "./category.validation";

const router = Router()

router.post("/", auth(Role.ADMIN),validateRequest(categoryValidation.createCategoryValidationSchema), categoryCotroller.createCategory)
router.get("/", categoryCotroller.getAllCategories)
router.get("/:id", categoryCotroller.getSingleCategory)
router.patch("/:id", auth(Role.ADMIN),validateRequest(categoryValidation.updateCategoryValidationSchema), categoryCotroller.updateCategory)
router.delete("/:id", auth(Role.ADMIN), categoryCotroller.deleteCategory)

export const categoryRouter = router;