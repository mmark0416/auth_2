import { Router } from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = Router();

router.get("/", test);
router.post("/update/:id", verifyUser, updateUser);

export default router;
