import createRouter from "express";
import repositoriesRouter from "./repositories";
import notesRouter from "./notes";
import authRouter from "./auth";
import healthyRouter from "./healthy";

const router = createRouter.Router();

router.use("/repositories", repositoriesRouter);
router.use("/notes", notesRouter);
router.use("/auth", authRouter);
router.use("/healthy", healthyRouter);

export default router;
