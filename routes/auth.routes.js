
import { Router } from "express";
import {token,signinHandler,} from "../controllers/auth.controller.js";
import {checkExistingRole,checkExistingUser,} from "../middlewares/verifySignup.js";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/api/signup", [checkExistingUser, checkExistingRole], signinHandler);

router.post("/api/signin", token);

export default router;