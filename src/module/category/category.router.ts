import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryCotroller } from "./category.controller";

const router = Router()

router.post("/", auth(Role.ADMIN), categoryCotroller.createCategory)
router.get("/", categoryCotroller.getAllCategories)
router.get("/:id", categoryCotroller.getSingleCategory)
router.patch("/:id", auth(Role.ADMIN), categoryCotroller.updateCategory)
router.delete("/:id", auth(Role.ADMIN), categoryCotroller.deleteCategory)

export const categoryRouter = router;