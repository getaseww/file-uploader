import { Router } from "express";
import fileRouter from "./fileRoutes";

const router= Router();

router.use('/v1',fileRouter)

export default router;