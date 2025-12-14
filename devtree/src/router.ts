import { Router } from "express";
import { createAccount } from "./handlers";

const router = Router();

/** Auth and registration */
router.post('/auth/register', createAccount);

export default router;