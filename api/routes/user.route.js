import { Router } from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = Router();

router.get("/", test);
router.get("/update/:id", verifyUser, updateUser);

export default router;
