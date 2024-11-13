import { Router } from "express";
import {
  createUser,
  getAllUsers,
  logIn,
  readSingleAccount,
} from "../controller/userController";

const router: any = Router();

router.route("/create-user").post(createUser);
router.route("/get-one-user/:userID").get(readSingleAccount);
router.route("/get-all-users").get(getAllUsers);

router.route("/login").post(logIn);

export default router;
