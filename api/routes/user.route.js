import { Router } from "express";
import {
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = Router();

router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);

export default router;
