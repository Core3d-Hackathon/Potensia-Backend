import { Router } from "express";
import {
  getCapaianByFaseAndSubjectHandler,
  getFaseByJenjang,
  getFaseList,
  getJenjangList,
  getSubjectsByFaseHandler,
} from "../controllers/curriculum.controller";

const curriculumRouter = Router();

curriculumRouter.get("/jenjang", getJenjangList);
curriculumRouter.get("/fase", getFaseList);
curriculumRouter.get("/jenjang/:jenjangKey/fase", getFaseByJenjang);
curriculumRouter.get("/fase/:faseCode/subjects", getSubjectsByFaseHandler);
curriculumRouter.get(
  "/fase/:faseCode/subjects/:subjectName/capaian",
  getCapaianByFaseAndSubjectHandler,
);

export default curriculumRouter;
