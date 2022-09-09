import { RepositoryModel as RepositoryModelPostgres } from './../types/databases/models/postgres/repository';
import { RepositoryModel as RepositoryModelMongo } from './../types/databases/models/mongo/repository';
import createRouter, { Request, Response } from "express"
import sanitize from "../middlewares/sanitize";
import authentication from '../middlewares/authentication'
import db from "../services/index";

const router = createRouter.Router();
const Repository = db.Repository;

const getAllRepositories = async (req: Request, res: Response) => {
  try {
    const repositories: RepositoryModelPostgres[] | RepositoryModelMongo[] = await Repository.findAll();
    console.log(repositories)
    if (repositories) {
      res.json(repositories);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const addRepository = async (req: Request, res: Response) => {
  try {
    const { name, description, stars, creatorName, createdAt } = req.body;
    const newRepository: RepositoryModelPostgres | RepositoryModelMongo = await Repository.createRepository({
      name,
      description,
      stars,
      creatorName,
      createdAt
    });
    const newRepositoryId: string = newRepository.id;
    res.setHeader("Location", `${req.baseUrl}/${newRepositoryId}`);
    res.status(201).send("Repository added!");
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteRepository = async (req: Request, res: Response) => {
  try {
    await Repository.deleteOne({ id: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(404).send(err);
  }
};

const editRepository = async (req: Request, res: Response) => {
  try {
    const { name, description, stars, creatorName, createdAt } = req.body;
    await Repository.updateOne({
      id: req.params.id,
      name,
      description,
      stars,
      creatorName,
      createdAt
    });

    res.status(204).send();
  } catch (err) {
    res.status(404).send(err);
  }
};

router.get("/", getAllRepositories);
router.post("/", authentication, sanitize, addRepository);
router.delete("/:id", authentication, deleteRepository);
router.put("/:id", authentication, sanitize, editRepository);

export default router;
