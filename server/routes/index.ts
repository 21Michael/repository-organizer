import createRouter from "express";
import repositoriesRouter from "./repositories";
import notesRouter from "./notes";
import authRouter from "./auth";

const router = createRouter.Router();

router.use("/repositories", repositoriesRouter);
router.use("/notes", notesRouter);
router.use("/auth", authRouter);

export default router;