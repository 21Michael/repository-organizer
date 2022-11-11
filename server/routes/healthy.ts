import createRouter, {Response} from "express";
import {RequestInterface} from "../types/routes/notes";

const router = createRouter.Router();

const healthCheck = async (req: RequestInterface, res: Response) => {
  try {
    res.status(200).send('Service is healthy!');
  } catch (err) {
    res.status(500).send(err.message);
  }
}

router.get("/", healthCheck);

export default router;
